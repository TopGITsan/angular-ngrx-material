import { Routes } from '@angular/router';
import { editGuard } from './guards/edit.guard';
import { listGuard } from './guards/list.guard';
import { CreateBookmarksComponent } from './layout/containers/create-bookmarks/create-bookmarks.component';
import { EditBookmarkComponent } from './layout/containers/edit-bookmark/edit-bookmark.component';
import { ListBookmarksComponent } from './layout/containers/list-bookmarks/list-bookmarks.component';
import { ShellComponent } from './layout/shell/shell.component';

export const routes: Routes = [
  {
    path: '', component: ShellComponent, children: [
      { path: 'create', component: CreateBookmarksComponent },
      { path: 'list', component: ListBookmarksComponent, canActivate: [listGuard] },
      { path: 'edit/:bookmarkId', component: EditBookmarkComponent, canActivate: [editGuard] }
    ]
  }
];
