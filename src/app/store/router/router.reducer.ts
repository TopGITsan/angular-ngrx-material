import {
  routerCancelAction,
  routerErrorAction,
  routerNavigatedAction,
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
  on(routerNavigatedAction, () => ({ loading: true })),
  on(routerNavigatedAction, () => ({ loading: false })),
  on(routerCancelAction, () => ({ loading: false })),
  on(routerErrorAction, () => ({ loading: false })),
);

export function reducer(state: LoaderState | undefined, action: Action): LoaderState {
  return pageNavigationStartReducer(state, action);
}
