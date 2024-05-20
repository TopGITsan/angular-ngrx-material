import { createFeatureSelector, createSelector } from '@ngrx/store';
import { bookmarksFeatureKey } from './bookmarks.key';
import { BookmarksState } from './bookmarks.state';

const getBookmarksState =
  createFeatureSelector<BookmarksState>(bookmarksFeatureKey);

export const getEditBookmark = createSelector(
  getBookmarksState,
  (state) => state.edit,
);
