import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, from } from 'rxjs';
import {
  REDIRECT_TO_HOME,
  REDIRECT_TO_LIST_ROUTE,
  REDIRECT_TO_PROVIDED_ROUTE,
} from './router.actions';

export const navigateToListRoute$ = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(REDIRECT_TO_LIST_ROUTE),
      exhaustMap((action) => from(router.navigate(['/list']))),
    );
  },
  { dispatch: false, functional: true },
);

export const navigateToHome$ = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(REDIRECT_TO_HOME),
      exhaustMap((action) => from(router.navigate(['/']))),
    );
  },
  { dispatch: false, functional: true },
);

export const navigateToProvidedRoute$ = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(REDIRECT_TO_PROVIDED_ROUTE),
      exhaustMap((action) => from(router.navigate([`${action.redirectTo}`]))),
    );
  },
  { dispatch: false, functional: true },
);
