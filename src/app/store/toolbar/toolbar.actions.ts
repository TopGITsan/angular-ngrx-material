import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const ToolbarActions = createActionGroup({
  source: 'Toolbar',
  events: {
    'Filter Bookmarks': props<{ filterText: string }>(),
    'Clear filter': emptyProps(),
  }
});

// generated action creators
export const {filterBookmarks, clearFilter} = ToolbarActions;
