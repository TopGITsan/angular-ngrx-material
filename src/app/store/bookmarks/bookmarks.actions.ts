import { createAction, createActionGroup, emptyProps, props } from '@ngrx/store';
import { Bookmark } from '../../shared/services/bookmark/bookmark.service';

export const LOAD_ALL_BOOKMARKS = createAction('[Bookmarks] Load All Bookmarks', props<{ bookmarks: Bookmark[] }>());

export const EDIT_BOOKMARK = createAction('[Bookmarks] Edit Bookmark', props<{ bookmark: Bookmark }>());

export const SAVE_BOOKMARK = createAction('[Bookmark] Save bookmark', props<{ bookmark: Bookmark }>())

export const SAVE_BOOKMARK_SUCCESS = createAction('[Bookmark] Save bookmark success', props<{ bookmark: Bookmark }>())
export const SAVE_BOOKMARK_FAILURE = createAction('[Bookmark] Save bookmark failure', props<{ error: string }>())
