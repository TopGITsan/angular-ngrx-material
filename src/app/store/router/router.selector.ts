import * as fromRouterStore from '@ngrx/router-store';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RouterState } from './custom-router-state.serializer';
import { LoaderState } from './router.reducer';

// router state
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

// loader state
const getLoaderState = createFeatureSelector<LoaderState>('loader');

export const isPageLoading = createSelector(
  getLoaderState,
  (loader) => !!loader.loading,
);
