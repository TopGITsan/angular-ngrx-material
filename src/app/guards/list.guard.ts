import { inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CanActivateFn } from '@angular/router';
import { catchError, first, map, of, switchMap } from 'rxjs';
import { ErrorDialogComponent } from '../shared/components/error-dialog/error-dialog.component';
import { BookmarkService } from '../shared/services/bookmark/bookmark.service';

export const listGuard: CanActivateFn = (route, state) => {
  const bookmarksService = inject(BookmarkService)
  const dialog = inject(MatDialog)
  return bookmarksService.getAll().pipe(
    first(),
    map(bookmarks => bookmarksService.allBookmarks = bookmarks),
    switchMap((_) => activateRoute()),
    catchError((_) => {
      dialog.open(ErrorDialogComponent, {
        width: '400px',
        data: { errorMessage: 'Sorry, unable to fetch bookmarks', redirectTo: '/' }
      })
      return of(false)
    }
    )
  )

};
function activateRoute() {
  return of(true);
}
