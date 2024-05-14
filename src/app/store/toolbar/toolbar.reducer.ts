import { Action, createReducer, on } from '@ngrx/store';
import { ToolbarActions } from '../../shared/actions/toolbar.actions';

export const toolbarFeatureKey = 'toolbar';

export interface FilterState {
  filterText: string;
}

export const initialState: FilterState = {
  filterText: ''

};

const toolbalReducer = createReducer(
  initialState,
  on(ToolbarActions.filterBookmarks, (_, { filterText }) => ({ filterText })),
  on(ToolbarActions.clearFilter, (_) => ({ filterText: '' }))
  // tap into NgRx actions to mutate the state
);

export function reducer(state: FilterState | undefined, action: Action) {
  return toolbalReducer(state, action)
}
