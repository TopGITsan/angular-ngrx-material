import * as fromToolbar from './toolbar/toolbar.reducer';
import * as fromRouterStore from '@ngrx/router-store';

export interface AppState {
  filter: fromToolbar.FilterState;
  router: fromRouterStore.RouterReducerState;
}
