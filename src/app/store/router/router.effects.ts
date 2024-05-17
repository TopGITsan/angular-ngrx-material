import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, from } from 'rxjs';
import { REDIRECT_TO_LIST_ROUTE } from './router.actions';

export const navigateToListRoute$ = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(REDIRECT_TO_LIST_ROUTE),
      exhaustMap((action) => from(router.navigate(['/list']))),
    );
  },
  { dispatch: false, functional: true },
);
