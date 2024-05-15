import { Routes } from '@angular/router';
import { provideState } from '@ngrx/store';
import { editGuard } from './guards/edit.guard';
import { listGuard } from './guards/list.guard';
import { CreateBookmarksComponent } from './layout/containers/create-bookmarks/create-bookmarks.component';
import { EditBookmarkComponent } from './layout/containers/edit-bookmark/edit-bookmark.component';
import { ShellComponent } from './layout/shell/shell.component';
import * as bookmarksStore from './store/bookmarks/bookmarks.facade';


export const routes: Routes = [
  {
    path: '', component: ShellComponent, children: [
      { path: 'create', component: CreateBookmarksComponent },
      {
        path: 'list',
        loadComponent: () => import('./layout/containers/list-bookmarks/list-bookmarks.component').then(m => m.ListBookmarksComponent),
        canActivate: [listGuard],
        providers: [
          provideState(bookmarksStore.bookmarksFeatureKey, bookmarksStore.reducers, { metaReducers: bookmarksStore.metaReducers }),
        ],

      },
      { path: 'edit/:bookmarkId', component: EditBookmarkComponent, canActivate: [editGuard] },
      { path: '', redirectTo: '/list', pathMatch: 'full' }
    ]
  }
];
