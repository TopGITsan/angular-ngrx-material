import { Routes } from '@angular/router';
import { editGuard } from './guards/edit.guard';
import { listGuard } from './guards/list.guard';
import { ShellComponent } from './layout/shell/shell.component';


export const routes: Routes = [
  {
    path: '', component: ShellComponent, children: [
      {
        path: 'create',
        loadComponent: () => import('./layout/containers/create-bookmarks/create-bookmarks.component').then(m => m.CreateBookmarksComponent)
      },
      {
        path: 'list',
        loadComponent: () => import('./layout/containers/list-bookmarks/list-bookmarks.component').then(m => m.ListBookmarksComponent),
        canActivate: [listGuard],
      },
      {
        path: 'edit/:bookmarkId',
        loadComponent: () => import('./layout/containers/edit-bookmark/edit-bookmark.component').then(m => m.EditBookmarkComponent),
        canActivate: [editGuard]
      },
      { path: '', redirectTo: '/list', pathMatch: 'full' }
    ]
  }
];
