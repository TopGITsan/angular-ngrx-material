export * from './bookmarks.key';
export * from './bookmarks.reducer';

import { Injectable } from '@angular/core';
import {
  Store
} from '@ngrx/store';
import { Observable } from 'rxjs';
import { Bookmark } from '../../shared/services/bookmark/bookmark.service';
import { EDIT_BOOKMARK, LOAD_ALL_BOOKMARKS, SAVE_BOOKMARK, UPDATE_BOOKMARK } from './bookmarks.actions';
import { getAllBookmarks, getEditBookmark } from './bookmarks.selector';
import { BookmarksState } from './bookmarks.state';
import { getBookmarkId } from '../router/router.selector';

@Injectable({
  providedIn: 'root'
})
export class BookmarkStoreFacadeService {
  constructor(private readonly store: Store<BookmarksState>) { }

  onLoadAllBookmarks(bookmarks: Bookmark[]): void {
    this.store.dispatch(LOAD_ALL_BOOKMARKS({ bookmarks }))
  }

  onEditBookmark(bookmark: Bookmark): void {
    this.store.dispatch(EDIT_BOOKMARK({ bookmark }))
  }

  onCreateBookmark(bookmark: Bookmark): void {
    this.store.dispatch(SAVE_BOOKMARK({ bookmark }))
  }

  onUpdateBookmark(bookmark: Bookmark): void {
    this.store.dispatch(UPDATE_BOOKMARK({ bookmark }))
  }

  getBookmarks(): Observable<Bookmark[]> {
    return this.store.select(getAllBookmarks)
  }

  getEditBookmark(): Observable<Bookmark | null> {
    return this.store.select(getEditBookmark)
  }

  getRouterBookmarkId(): Observable<string> {
    return this.store.select(getBookmarkId)
  }

}
