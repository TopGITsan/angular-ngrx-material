import * as fromToolbar from './toolbar/toolbar.reducer';
import * as fromRouterStore from '@ngrx/router-store';
import * as fromRouter from './router/router.reducer';

export interface AppState {
  filter: fromToolbar.FilterState;
  router: fromRouterStore.RouterReducerState;
  loader: fromRouter.LoaderState;
}
