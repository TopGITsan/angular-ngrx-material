import { createAction, props } from '@ngrx/store';
import { Bookmark } from '../../shared/services/bookmark/bookmark.service';

export const EDIT_BOOKMARK = createAction(
  '[Bookmarks] Edit Bookmark',
  props<{ bookmark: Bookmark }>(),
);

export const SAVE_BOOKMARK = createAction(
  '[Bookmark] Save bookmark',
  props<{ bookmark: Bookmark }>(),
);

export const SAVE_BOOKMARK_SUCCESS = createAction(
  '[Bookmark] Save bookmark success',
  props<{ bookmark: Bookmark }>(),
);
export const SAVE_BOOKMARK_FAILURE = createAction(
  '[Bookmark] Save bookmark failure',
  props<{ error: string }>(),
);

export const UPDATE_BOOKMARK = createAction(
  '[Bookmark] Update bookmark',
  props<{ bookmark: Bookmark }>(),
);

export const UPDATE_BOOKMARK_SUCCESS = createAction(
  '[Bookmark] Update bookmark success',
);

export const UPDATE_BOOKMARK_FAILURE = createAction(
  '[Bookmark] Update bookmark failure',
  props<{ error: string }>(),
);
