import { createFeature } from '@ngrx/store';
import {
  adapter,
  bookmarkEntitiesFeatureKey,
  reducer,
} from './bookmark-entity.reducer';

export const bookmarkEntitiesFeature = createFeature({
  name: bookmarkEntitiesFeatureKey,
  reducer,
  extraSelectors: ({ selectBookmarkEntitiesState }) => ({
    ...adapter.getSelectors(selectBookmarkEntitiesState),
  }),
});

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
  selectLoaded,
} = bookmarkEntitiesFeature;
