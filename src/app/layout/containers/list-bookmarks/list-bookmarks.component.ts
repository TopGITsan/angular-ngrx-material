import { AsyncPipe, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { Observable, map } from 'rxjs';
import { FuzzyPipe } from '../../../shared/pipes/fuzzy.pipe';
import {
  Bookmark,
  BookmarkService,
} from '../../../shared/services/bookmark/bookmark.service';
import { isToday, isYesterday } from '../../../shared/util';
import { BookmarkStoreFacadeService } from '../../../store/bookmarks/bookmarks.facade';
import { GlobalStoreFacadeService } from '../../../store/global.store.facade';
import { ExternalLinkDirective } from '../../../shared/directives/external-link/external-link.directive';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FuzzyPipe,
    MatListModule,
    MatIconModule,
    MatDividerModule,
    FormsModule,
    RouterModule,
    DatePipe,
    AsyncPipe,
    ExternalLinkDirective,
  ],
  selector: 'app-list-bookmarks',
  standalone: true,
  styleUrl: './list-bookmarks.component.scss',
  templateUrl: './list-bookmarks.component.html',
})
export class ListBookmarksComponent implements OnInit {
  allBookmarks$: Observable<Bookmark[]> | undefined;
  todaysBookmarks$: Observable<Bookmark[]> | undefined;
  yesterdaysBookmarks$: Observable<Bookmark[]> | undefined;
  olderBookmarks$: Observable<Bookmark[]> | undefined;
  filterText$: Observable<string> | undefined;

  constructor(
    public readonly bookmarkService: BookmarkService,
    private readonly store: GlobalStoreFacadeService,
    private readonly bookmarksStore: BookmarkStoreFacadeService,
  ) {}
  ngOnInit(): void {
    this.allBookmarks$ = this.bookmarksStore.getAllBookMarkEntities();
    this.todaysBookmarks$ = this.allBookmarks$?.pipe(
      map((bookmarks) => bookmarks.filter((b: Bookmark) => isToday(b.created))),
    );
    this.yesterdaysBookmarks$ = this.allBookmarks$?.pipe(
      map((bookmarks) =>
        bookmarks.filter((b: Bookmark) => isYesterday(b.created)),
      ),
    );
    this.olderBookmarks$ = this.allBookmarks$?.pipe(
      map((bookmarks) =>
        bookmarks.filter(
          (bookmark) =>
            !isToday(bookmark.created) && !isYesterday(bookmark.created),
        ),
      ),
    );

    this.filterText$ = this.store.getFilterText$();
  }
}
