export * from './global.reducer';
export * from './global.state';

import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getFilterText } from './global.selectors';
import { AppState } from './global.state';
import {
  REDIRECT_TO_HOME,
  REDIRECT_TO_LIST_ROUTE,
  REDIRECT_TO_PROVIDED_ROUTE,
} from './router/router.actions';
import { filterBookmarks } from './toolbar/toolbar.actions';

@Injectable({ providedIn: 'root' })
export class GlobalStoreFacadeService {
  constructor(private readonly store: Store<AppState>) {}

  onFilterChange(filterText: string): void {
    this.store.dispatch(filterBookmarks({ filterText }));
  }

  onRedirectToListRoute(): void {
    this.store.dispatch(REDIRECT_TO_LIST_ROUTE());
  }

  onRedirectToHome(): void {
    this.store.dispatch(REDIRECT_TO_HOME());
  }

  onRedirectToProvidedRoute(redirectTo: string): void {
    this.store.dispatch(REDIRECT_TO_PROVIDED_ROUTE({ redirectTo }));
  }

  getFilterText$(): Observable<string> {
    return this.store.select(getFilterText);
  }
}
