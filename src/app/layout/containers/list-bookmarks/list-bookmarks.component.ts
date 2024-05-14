import { AsyncPipe, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from "@angular/material/list";
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { FuzzyPipe } from '../../../shared/pipes/fuzzy.pipe';
import { Bookmark, BookmarkService } from '../../../shared/services/bookmark/bookmark.service';
import { isToday, isYesterday } from '../../../shared/util';
import { GlobalStoreFacadeService } from '../../../store/global.store.facade';

@Component({
  selector: 'app-list-bookmarks',
  standalone: true,
  imports: [FuzzyPipe, MatListModule, MatIconModule, MatDividerModule, FormsModule, RouterModule, DatePipe, AsyncPipe],
  templateUrl: './list-bookmarks.component.html',
  styleUrl: './list-bookmarks.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListBookmarksComponent implements OnInit {
  allBookmarks: Bookmark[] = [];
  todaysBookmarks: Bookmark[] = [];
  yesterdaysBookmarks: Bookmark[] = [];
  olderBookmarks: Bookmark[] = [];
  filterText$: Observable<string> | undefined;


  constructor(public readonly bookmarkService: BookmarkService, private readonly store: GlobalStoreFacadeService) { }
  ngOnInit(): void {
    this.allBookmarks = this.bookmarkService.allBookmarks;
    this.todaysBookmarks = this.allBookmarks.filter(b => isToday(b.created));
    this.yesterdaysBookmarks = this.allBookmarks.filter(b => isYesterday(b.created));
    this.olderBookmarks = this.allBookmarks.filter(bookmark => !this.todaysBookmarks.find(b => b.id === bookmark.id) && !this.yesterdaysBookmarks.find(b => b.id === bookmark.id));
    this.filterText$ = this.store.getFilterText$();
  }

}
