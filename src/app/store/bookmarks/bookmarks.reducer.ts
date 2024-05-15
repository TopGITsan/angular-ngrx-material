import { Action, ActionReducerMap, MetaReducer, createReducer, on } from '@ngrx/store';
import { Bookmark } from '../../shared/services/bookmark/bookmark.service';
import { EDIT_BOOKMARK, LOAD_ALL_BOOKMARKS } from './bookmarks.actions';
import { isDevMode } from '@angular/core';
import { BookmarksState } from './bookmarks.state';

// All
const initialAllBookmarksState: Bookmark[] = []

const allBookmarksReducer = createReducer(
  initialAllBookmarksState,
  on(LOAD_ALL_BOOKMARKS, (_, { bookmarks }) => bookmarks)
  // tap into NgRx actions to mutate the state

);

// Edit
const initialEditBookmarkState: Bookmark | null = null;
const editBookmarkReducer = createReducer(
  initialEditBookmarkState,
  // @ts-ignore
  on(EDIT_BOOKMARK, (_, { bookmark }) => bookmark)
  // tap into NgRx actions to mutate the state
)



// exports
export const reducers: ActionReducerMap<BookmarksState> = {
  all: (state: Bookmark[] | undefined, action: Action) => allBookmarksReducer(state, action),
  // @ts-ignore
  edit: (state: Bookmark | null | undefined, action: Action) => editBookmarkReducer(state, action)

};


export const metaReducers: MetaReducer<BookmarksState>[] = isDevMode() ? [] : [];
