import { createFeatureSelector, createSelector } from "@ngrx/store";
import { BookmarksState } from "./bookmarks.state";
import { bookmarksFeatureKey } from "./bookmarks.key";

const getBookmarksState = createFeatureSelector<BookmarksState>(bookmarksFeatureKey);

export const getAllBookmarks = createSelector(
  getBookmarksState,
  (state) => state.all
)

export const getEditBookmark = createSelector(
  getBookmarksState,
  (state) => state.edit
)
