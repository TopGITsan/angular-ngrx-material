import {
  routerCancelAction,
  routerErrorAction,
  routerNavigatedAction,
  routerNavigationAction,
  routerRequestAction,
} from '@ngrx/router-store';
import { Action, createReducer, on } from '@ngrx/store';

export const routerFeatureKey = 'router';

export interface LoaderState {
  loading: boolean;
}

export const initialState: LoaderState = {
  loading: false,
};

export const pageNavigationStartReducer = createReducer(
  initialState,
  on(routerRequestAction, () => ({ loading: true })),
  on(routerNavigationAction, () => ({ loading: true })),
  on(routerNavigatedAction, () => ({ loading: false })),
  on(routerCancelAction, () => ({ loading: false })),
  on(routerErrorAction, () => ({ loading: false })),
);

export function reducer(
  state: LoaderState | undefined,
  action: Action,
): LoaderState {
  return pageNavigationStartReducer(state, action);
}
