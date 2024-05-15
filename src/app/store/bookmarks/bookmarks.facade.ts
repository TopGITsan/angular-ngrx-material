export * from './bookmarks.key';
export * from './bookmarks.reducer';

import { Injectable } from '@angular/core';
import {
  Store
} from '@ngrx/store';
import { Observable } from 'rxjs';
import { Bookmark } from '../../shared/services/bookmark/bookmark.service';
import { EDIT_BOOKMARK, LOAD_ALL_BOOKMARKS } from './bookmarks.actions';
import { getAllBookmarks, getEditBookmark } from './bookmarks.selector';
import { BookmarksState } from './bookmarks.state';

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

  getBookmarks(): Observable<Bookmark[]> {
    return this.store.select(getAllBookmarks)
  }

  getEditBookmark(): Observable<Bookmark | null> {
    return this.store.select(getEditBookmark)
  }

}
