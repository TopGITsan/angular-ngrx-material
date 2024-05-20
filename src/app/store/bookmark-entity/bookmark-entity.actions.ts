import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Bookmark } from '../../shared/services/bookmark/bookmark.service';

export const BookmarkEntityActions = createActionGroup({
  source: 'BookmarkEntity/API',
  events: {
    'Load BookmarkEntitys': props<{ bookmarkEntitys: Bookmark[] }>(),
    'Add BookmarkEntity': props<{ bookmarkEntity: Bookmark }>(),
    'Upsert BookmarkEntity': props<{ bookmarkEntity: Bookmark }>(),
    'Add BookmarkEntitys': props<{ bookmarkEntitys: Bookmark[] }>(),
    'Upsert BookmarkEntitys': props<{ bookmarkEntitys: Bookmark[] }>(),
    'Update BookmarkEntity': props<{ bookmarkEntity: Update<Bookmark> }>(),
    'Update BookmarkEntitys': props<{ bookmarkEntitys: Update<Bookmark>[] }>(),
    'Delete BookmarkEntity': props<{ id: string }>(),
    'Delete BookmarkEntitys': props<{ ids: string[] }>(),
    'Clear BookmarkEntitys': emptyProps(),
  },
});

// or can be extracted
// export const { loadBookmarkEntitys, addBookmarkEntity, updateBookmarkEntity } =
//   BookmarkEntityActions;
