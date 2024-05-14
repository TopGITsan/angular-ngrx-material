import { inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CanActivateFn } from '@angular/router';
import { first, map, switchMap, catchError, of } from 'rxjs';
import { ErrorDialogComponent } from '../shared/components/error-dialog/error-dialog.component';
import { BookmarkService } from '../shared/services/bookmark/bookmark.service';

export const editGuard: CanActivateFn = (route, state) => {
  const bookmarksService = inject(BookmarkService)
  const dialog = inject(MatDialog)
  return bookmarksService.getById(route.params['bookmarkId']).pipe(
    first(),
    map(bookmark => bookmarksService.editBookmark = bookmark),
    switchMap((_) => activateRoute()),
    catchError((_) => {
      dialog.open(ErrorDialogComponent, {
        width: '400px',
        data: { errorMessage: `Sorry, unable to fetch bookmark ${route.params['bookmarkId']}`, redirectTo: '/list' }
      })
      return of(false)
    }
    )
  )
};

function activateRoute() {
  return of(true);
}
