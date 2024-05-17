import { isDevMode } from '@angular/core';
import * as fromRouterStore from '@ngrx/router-store';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { AppState } from './global.state';
import * as fromRouter from './router/router.reducer';
import * as fromToolbar from './toolbar/toolbar.reducer';

export const reducers: ActionReducerMap<AppState> = {
  filter: fromToolbar.reducer,
  router: fromRouterStore.routerReducer,
  loader: fromRouter.reducer,
};

// intercept each action before dispatching the associated reducer

export const metaReducers: MetaReducer<AppState>[] = isDevMode() ? [] : [];
