import { computed, inject, Injectable, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { FormControl } from '@angular/forms';
import {
  catchError,
  debounceTime,
  defer,
  distinctUntilChanged,
  filter,
  map,
  merge,
  of,
  Subject,
  switchMap,
  tap,
} from 'rxjs';
import {
  Bookmark,
  BookmarkApiResponse,
  BookmarkService,
} from '../../shared/services/bookmark/bookmark.service';
import { connectSource } from '../../shared/utils/connect-source.fn';

export interface BookmarksState {
  bookmarks: Bookmark[];
  error: unknown;
  loading: boolean;
  page: number;
  pages: number;
  search: string;
}

const defaultState: BookmarksState = {
  bookmarks: [],
  error: '',
  loading: false,
  page: 1,
  pages: 1,
  search: '',
};

const bookmarks_state_key = 'bookmarks';

const getSavedState = (): BookmarksState => {
  const savedJsonState = localStorage.getItem(bookmarks_state_key);
  const parsedState = savedJsonState && JSON.parse(savedJsonState);

  return parsedState
    ? { ...defaultState, search: parsedState.search, page: parsedState.page }
    : defaultState;
};

@Injectable({
  providedIn: 'root',
})
export class BookmarksSignalStoreService {
  private readonly bookmarksService = inject(BookmarkService);

  // signals
  readonly state = signal(getSavedState());
  readonly bookmarks = computed(() => this.state().bookmarks);
  readonly search = computed(() => this.state().search);
  readonly page = computed(() => this.state().page);
  readonly pages = computed(() => this.state().pages);
  readonly error = computed(() => this.state().error);
  readonly loading = computed(() => this.state().loading);
  readonly endOfPages = computed(() => this.page() === this.pages());

  // Sources
  readonly searchControl = new FormControl({
    value: getSavedState().search,
    disabled: false,
  });

  private readonly searchChange$ = this.searchControl.valueChanges.pipe(
    filter((text): text is string => text !== null && text !== undefined),
    debounceTime(300),
    distinctUntilChanged(),
    map((search) => ({ ...this.state(), search, page: 1, loading: true })),
  );

  readonly searchPayload = computed(
    () => [this.search(), this.page()] as const,
  );

  private readonly searchResultsChange$ = toObservable(this.searchPayload).pipe(
    switchMap(([search, page]) =>
      this.bookmarksService.searchBookmark(search, page).pipe(
        tap((result) => {
          console.log('>>>>>>>>>> searched', { search, page, result });
          localStorage.setItem(
            bookmarks_state_key,
            JSON.stringify({ search, page }),
          );
        }),
        catchError((error: unknown) => of({ error })),
      ),
    ),
    map((result: { error: unknown } | BookmarkApiResponse) => {
      const state = this.state();
      if ('error' in result) {
        return {
          ...state,
          error: JSON.stringify(result.error),
          loading: false,
        };
      }
      return {
        ...state,
        bookmarks: result.bookmarks,
        pages: result.pages,
        error: '',
        loading: false,
      };
    }),
  );

  readonly nextPage$ = new Subject<void>();
  readonly previousPage$ = new Subject<void>();
  private readonly pageChange$ = merge(
    this.nextPage$.pipe(map(() => 1)),
    this.previousPage$.pipe(map(() => -1)),
  ).pipe(
    map((change) => ({
      ...this.state(),
      page: this.page() + change,
      loading: true,
    })),
  );

  private readonly newState$ = merge(
    defer(() => of(getSavedState())),
    this.searchChange$,
    this.searchResultsChange$,
    this.pageChange$,
  );

  connection$ = connectSource(this.newState$, this.state);
}
