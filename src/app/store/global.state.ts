import * as fromToolbar from './toolbar/toolbar.reducer';
import * as fromRouterStore from '@ngrx/router-store';
import * as fromRouter from './router/router.reducer';
import * as fromBookmarkEntity from './bookmark-entity/bookmark-entity.reducer';

export interface AppState {
  filter: fromToolbar.FilterState;
  router: fromRouterStore.RouterReducerState;
  loader: fromRouter.LoaderState;
  [fromBookmarkEntity.bookmarkEntitiesFeatureKey]: fromBookmarkEntity.State;
}
