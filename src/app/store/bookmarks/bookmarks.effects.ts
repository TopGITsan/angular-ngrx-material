import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { ErrorDialogComponent } from '../../shared/components/error-dialog/error-dialog.component';
import {
  Bookmark,
  BookmarkService,
} from '../../shared/services/bookmark/bookmark.service';
import {
  SAVE_BOOKMARK,
  SAVE_BOOKMARK_FAILURE,
  SAVE_BOOKMARK_SUCCESS,
  UPDATE_BOOKMARK,
  UPDATE_BOOKMARK_FAILURE,
  UPDATE_BOOKMARK_SUCCESS,
} from './bookmarks.actions';
import { REDIRECT_TO_LIST_ROUTE } from '../router/router.actions';

@Injectable()
export class BookmarksEffects {
  constructor(
    private actions$: Actions,
    private readonly bookmarkHttp: BookmarkService,
    private readonly router: Router,
    private readonly dialog: MatDialog,
  ) {}

  public saveBookmark$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(SAVE_BOOKMARK),
        exhaustMap((action) =>
          this.bookmarkHttp.save({ ...action.bookmark }).pipe(
            map((bookmark) => SAVE_BOOKMARK_SUCCESS({ bookmark })),
            catchError(() =>
              of(
                SAVE_BOOKMARK_FAILURE({
                  error: 'Sorry, unable to create bookmark, backend error',
                }),
              ),
            ),
          ),
        ),
      ),
    { useEffectsErrorHandler: false },
  );

  public saveBookmarkSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SAVE_BOOKMARK_SUCCESS),
      map(() => REDIRECT_TO_LIST_ROUTE()),
    ),
  );

  public saveBookmarkFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(SAVE_BOOKMARK_FAILURE),
        tap((action) =>
          this.dialog.open(ErrorDialogComponent, {
            width: '400px',
            data: { errorMessage: action.error },
          }),
        ),
      ),
    { dispatch: false },
  );

  public updateBookmark$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UPDATE_BOOKMARK),
      exhaustMap((action) =>
        this.bookmarkHttp.update({ ...action.bookmark }).pipe(
          map((bookmark: Bookmark) => UPDATE_BOOKMARK_SUCCESS()),
          catchError((_) =>
            of(
              UPDATE_BOOKMARK_FAILURE({
                error: `Sorry, unable to update bookmark ${action.bookmark.name} , backend error`,
              }),
            ),
          ),
        ),
      ),
    ),
  );

  public updateBookmarkSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UPDATE_BOOKMARK_SUCCESS),
      map(() => REDIRECT_TO_LIST_ROUTE()),
    ),
  );

  public updateBookmarkFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UPDATE_BOOKMARK_FAILURE),
      tap((action) =>
        this.dialog.open(ErrorDialogComponent, {
          width: '400px',
          data: { errorMessage: action.error },
        }),
      ),
    ),
  );
}
