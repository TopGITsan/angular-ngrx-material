import * as fromRouterStore from '@ngrx/router-store';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RouterState } from './custom-router-state.serializer';

const getRouterState =
  createFeatureSelector<fromRouterStore.RouterReducerState<RouterState>>(
    'router',
  );
// from library
// export const { selectRouteParams } = fromRouterStore.getRouterSelectors();

export const getBookmarkId = createSelector(
  getRouterState,
  (state) => state.state.params['bookmarkId'],
);
