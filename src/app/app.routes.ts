import { Routes } from '@angular/router';
import { ShellComponent } from './layout/shell/shell.component';
import { CreateBookmarksComponent } from './layout/containers/create-bookmarks/create-bookmarks.component';

export const routes: Routes = [
  {
    path: '', component: ShellComponent, children: [
      { path: 'create', component: CreateBookmarksComponent }
    ]
  }
];
