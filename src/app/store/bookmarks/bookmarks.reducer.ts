import { isDevMode } from '@angular/core';
import {
  Action,
  ActionReducerMap,
  MetaReducer,
  createReducer,
  on,
} from '@ngrx/store';
import { Bookmark } from '../../shared/services/bookmark/bookmark.service';
import { EDIT_BOOKMARK } from './bookmarks.actions';
import { BookmarksState } from './bookmarks.state';

// Edit
const initialEditBookmarkState: Bookmark | null = null;
const editBookmarkReducer = createReducer(
  initialEditBookmarkState,
  // @ts-ignore
  on(EDIT_BOOKMARK, (_, { bookmark }) => bookmark),
  // tap into NgRx actions to mutate the state
);

// exports
export const reducers: ActionReducerMap<BookmarksState> = {
  edit: (state: Bookmark | null | undefined, action: Action) =>
  // @ts-ignore
    editBookmarkReducer(state, action),
};

export const metaReducers: MetaReducer<BookmarksState>[] = isDevMode()
  ? []
  : [];
