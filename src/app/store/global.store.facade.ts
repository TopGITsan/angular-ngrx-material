
export * from './global.reducer';
export * from './global.state';

import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filterBookmarks } from '../shared/actions/toolbar.actions';
import { getFilterText } from './global.selectors';
import { AppState } from './global.state';

@Injectable({ providedIn: 'root' })
export class GlobalStoreFacadeService {
  constructor(private readonly store: Store<AppState>) { }

  onFilterChange(filterText: string): void {
    this.store.dispatch(filterBookmarks({ filterText }))
  }

  getFilterText$(): Observable<string> {
    return this.store.select(getFilterText)
  }

}
