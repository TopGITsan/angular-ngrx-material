import { createFeature, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { BookmarkEntityActions } from './bookmark-entity.actions';
import { Bookmark } from '../../shared/services/bookmark/bookmark.service';

export const bookmarkEntitiesFeatureKey = 'bookmarkEntities';

export interface State extends EntityState<Bookmark> {
  // additional entities state properties
  /**
   * keeps track if the list of bookmarks was loaded
   */
  loaded: boolean;
}

export const adapter: EntityAdapter<Bookmark> = createEntityAdapter<Bookmark>({
  selectId: (entity) => entity.id, // optional, when there is an id property in the entity
  sortComparer: (a: Bookmark, b: Bookmark) => b.id - a.id,
});

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  loaded: false,
});

export const reducer = createReducer(
  initialState,
  on(BookmarkEntityActions.addBookmarkEntity, (state, action) =>
    adapter.addOne(action.bookmarkEntity, state),
  ),
  on(BookmarkEntityActions.upsertBookmarkEntity, (state, action) =>
    adapter.upsertOne(action.bookmarkEntity, state),
  ),
  on(BookmarkEntityActions.addBookmarkEntitys, (state, action) =>
    adapter.addMany(action.bookmarkEntitys, state),
  ),
  on(BookmarkEntityActions.upsertBookmarkEntitys, (state, action) =>
    adapter.upsertMany(action.bookmarkEntitys, state),
  ),
  on(BookmarkEntityActions.updateBookmarkEntity, (state, action) =>
    adapter.updateOne(action.bookmarkEntity, state),
  ),
  on(BookmarkEntityActions.updateBookmarkEntitys, (state, action) =>
    adapter.updateMany(action.bookmarkEntitys, state),
  ),
  on(BookmarkEntityActions.deleteBookmarkEntity, (state, action) =>
    adapter.removeOne(action.id, state),
  ),
  on(BookmarkEntityActions.deleteBookmarkEntitys, (state, action) =>
    adapter.removeMany(action.ids, state),
  ),
  on(BookmarkEntityActions.loadBookmarkEntitys, (state, action) =>
    adapter.setAll(action.bookmarkEntitys, { ...state, loaded: true }),
  ),
  on(BookmarkEntityActions.clearBookmarkEntitys, (state) =>
    adapter.removeAll(state),
  ),
);
