import { ActionReducerMap, MetaReducer } from "@ngrx/store";
import { isDevMode } from "@angular/core";
import { AppState } from "./global.state";
import * as fromToolbar from "./toolbar/toolbar.reducer";

export const reducers: ActionReducerMap<AppState> = {
  filter: fromToolbar.reducer
};

// intercept each action before dispatching the associated reducer

export const metaReducers: MetaReducer<AppState>[] = isDevMode() ? [] : [];
