import { createAction, createActionGroup, emptyProps, props } from '@ngrx/store';
import { Bookmark } from '../../shared/services/bookmark/bookmark.service';

export const LOAD_ALL_BOOKMARKS = createAction('[Bookmarks] Load All Bookmarks', props<{ bookmarks: Bookmark[] }>());

export const EDIT_BOOKMARK = createAction('[Bookmarks] Edit Bookmark', props<{ bookmark: Bookmark }>());
