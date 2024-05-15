import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { ErrorDialogComponent } from '../../shared/components/error-dialog/error-dialog.component';
import { BookmarkService } from '../../shared/services/bookmark/bookmark.service';
import { SAVE_BOOKMARK, SAVE_BOOKMARK_FAILURE, SAVE_BOOKMARK_SUCCESS } from './bookmarks.actions';

@Injectable()
export class BookmarksEffects {


  constructor(private actions$: Actions,
    private readonly bookmarkHttp: BookmarkService,
    private readonly router: Router,
    private readonly dialog: MatDialog) { }

  public saveBookmark$ = createEffect(() => this.actions$.pipe(
    ofType(SAVE_BOOKMARK),
    exhaustMap((action) => this.bookmarkHttp.save({ ...action.bookmark }).pipe(
      map((bookmark) => SAVE_BOOKMARK_SUCCESS({ bookmark })),
      catchError(() => of(SAVE_BOOKMARK_FAILURE({ error: 'Sorry, unable to create bookmark' })))
    ))
  ), { useEffectsErrorHandler: false })

  public saveBookmarkSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(SAVE_BOOKMARK_SUCCESS),
    tap(() => this.router.navigate(['/list']))
  ), { dispatch: false })

  public saveBookmarkFailure$ = createEffect(() => this.actions$.pipe(
    ofType(SAVE_BOOKMARK_FAILURE),
    tap((error) => this.dialog.open(ErrorDialogComponent, { width: '400px', data: { errorMessage: 'Sorry, unable to create bookmark' } }))
  ), { dispatch: false })
}
