import { createAction, props } from '@ngrx/store';

export const REDIRECT_TO_LIST_ROUTE = createAction(
  '[Router] Redirect to /list route',
);

export const REDIRECT_TO_HOME = createAction('[Router] Redirect to home');

export const REDIRECT_TO_PROVIDED_ROUTE = createAction(
  '[Router] Redirect to provided route',
  props<{ redirectTo: string }>(),
);
