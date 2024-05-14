import {
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import { AppState } from './global.state';
import { FilterState } from './toolbar/toolbar.reducer';



export const selectFilter = (state: AppState) => state.filter;

export const getFilterText = createSelector(selectFilter, (filterState: FilterState) => filterState.filterText)
