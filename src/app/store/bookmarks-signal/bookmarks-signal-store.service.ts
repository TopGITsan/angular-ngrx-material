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
  Observable,
  of,
  share,
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

  private readonly searchPayload = computed(
    () => [this.search(), this.page()] as const,
  );

  private readonly searchResultsChange$ = toObservable(this.searchPayload).pipe(
    debounceTime(100),
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
    share(),
  );
  private readonly searchResultsChangeSuccess$ = this.searchResultsChange$.pipe(
    resultsSuccess<BookmarkApiResponse>,
    share(),
  );
  private readonly searchResultsChangeFailure$ = this.searchResultsChange$.pipe(
    resultsFailure,
    share(),
  );

  readonly nextPage$ = new Subject<void>();
  readonly previousPage$ = new Subject<void>();

  // State changes and events should be separate
  // read more https://dev.to/mfp22/10-tips-for-scaling-signals-1nap
  private readonly newState$ = merge(
    defer(() => of(getSavedState())),
    toObservable(this.searchPayload).pipe(
      debounceTime(100),
      map((_) => ({ ...this.state(), loading: true })),
    ),
    this.searchControl.valueChanges.pipe(
      filter(
        (text): text is string =>
          text !== null &&
          text !== undefined &&
          (text == '' || text.length >= 3),
      ),
      debounceTime(300),
      distinctUntilChanged(),
      map((search) => ({ ...this.state(), search, page: 1, loading: true })),
    ),
    this.searchResultsChangeSuccess$.pipe(
      map((result) => {
        const state = this.state();
        return {
          ...state,
          bookmarks: result.bookmarks,
          pages: result.pages,
          error: '',
          loading: false,
        };
      }),
    ),
    this.searchResultsChangeFailure$.pipe(
      map((result) => {
        const state = this.state();
        return {
          ...state,
          error: JSON.stringify(result.error),
          loading: false,
        };
      }),
    ),
    merge(
      this.nextPage$.pipe(map(() => 1)),
      this.previousPage$.pipe(map(() => -1)),
    ).pipe(
      map((change) => ({
        ...this.state(),
        page: this.page() + change,
        loading: true,
      })),
    ),
  );

  // If you want to share state change logic by extending a base auto-signal class,
  // TypeScript will infer the type of connection$ and prevent you from changing it in a child class.
  // We don't want this because it doesn't matter what kind of values connection$ emits.
  //  So, we should just type it as Observable<any>
  connection$ = connectSource(this.newState$, this.state) as Observable<any>;
}
// Some HTTP utilities are useful
// read more https://dev.to/mfp22/10-tips-for-scaling-signals-1nap
type RequestObservable<T> = Observable<T | { error: unknown }>;

function resultsSuccess<T>(source: RequestObservable<T>): Observable<T> {
  return source.pipe(
    filter(
      (result): result is T =>
        typeof result === 'object' && !('error' in (result as object)),
    ),
  );
}

function resultsFailure<T>(
  source: RequestObservable<T>,
): Observable<{ error: {} }> {
  return source.pipe(
    filter(
      (result): result is { error: {} } =>
        typeof result === 'object' && 'error' in (result as object),
    ),
  );
}
