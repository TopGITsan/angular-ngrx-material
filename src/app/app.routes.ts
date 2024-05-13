import { Routes } from '@angular/router';
import { ShellComponent } from './layout/shell/shell.component';
import { CreateBookmarksComponent } from './layout/containers/create-bookmarks/create-bookmarks.component';
import { ListBookmarksComponent } from './layout/containers/list-bookmarks/list-bookmarks.component';

export const routes: Routes = [
  {
    path: '', component: ShellComponent, children: [
      { path: 'create', component: CreateBookmarksComponent },
      { path: 'list', component: ListBookmarksComponent }
    ]
  }
];
