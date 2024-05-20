export * from './bookmarks.key';
export * from './bookmarks.reducer';

import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Bookmark } from '../../shared/services/bookmark/bookmark.service';
import * as fromBookmarkEntityActions from '../bookmark-entity/bookmark-entity.actions';
import * as fromBookmarkEntitySelectors from '../bookmark-entity/bookmark-entity.selectors';
import { getBookmarkId } from '../router/router.selector';
import {
  EDIT_BOOKMARK,
  SAVE_BOOKMARK,
  UPDATE_BOOKMARK,
} from './bookmarks.actions';
import { getEditBookmark } from './bookmarks.selector';
import { BookmarksState } from './bookmarks.state';
@Injectable({
  providedIn: 'root',
})
export class BookmarkStoreFacadeService {
  constructor(private readonly store: Store<BookmarksState>) {}

  onEditBookmark(bookmark: Bookmark): void {
    this.store.dispatch(EDIT_BOOKMARK({ bookmark }));
  }

  onCreateBookmark(bookmark: Bookmark): void {
    this.store.dispatch(SAVE_BOOKMARK({ bookmark }));
  }

  onUpdateBookmark(bookmark: Bookmark): void {
    this.store.dispatch(UPDATE_BOOKMARK({ bookmark }));
  }

  onLoadBookmarksEntitys(bookmarkEntitys: Bookmark[]): void {
    this.store.dispatch(
      fromBookmarkEntityActions.BookmarkEntityActions.loadBookmarkEntitys({
        bookmarkEntitys,
      }),
    );
  }

  onAddBookmarkEntity(bookmarkEntity: Bookmark): void {
    this.store.dispatch(
      fromBookmarkEntityActions.BookmarkEntityActions.addBookmarkEntity({
        bookmarkEntity,
      }),
    );
  }

  onUpdateBookmarkEntity(bookmarkEntity: Bookmark): void {
    this.store.dispatch(
      fromBookmarkEntityActions.BookmarkEntityActions.updateBookmarkEntity({
        bookmarkEntity: { id: bookmarkEntity.id, changes: bookmarkEntity },
      }),
    );
  }

  getEditBookmark(): Observable<Bookmark | null> {
    return this.store.select(getEditBookmark);
  }

  getRouterBookmarkId(): Observable<string> {
    return this.store.select(getBookmarkId);
  }

  getAllBookMarkEntities(): Observable<Bookmark[]> {
    return this.store.select(fromBookmarkEntitySelectors.selectAll);
  }

  getLoadedFromBookmarkEntities(): Observable<boolean> {
    return this.store.select(fromBookmarkEntitySelectors.selectLoaded);
  }
}
