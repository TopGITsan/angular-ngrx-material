import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from "@angular/material/list";
import { FuzzyPipe } from '../../../shared/pipes/fuzzy.pipe';
import { Bookmark, BookmarkService } from '../../../shared/services/bookmark/bookmark.service';
import { isToday, isYesterday } from '../../../shared/util';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-list-bookmarks',
  standalone: true,
  imports: [FuzzyPipe, MatListModule, MatIconModule, FormsModule, NgFor, NgIf, RouterModule],
  templateUrl: './list-bookmarks.component.html',
  styleUrl: './list-bookmarks.component.scss'
})
export class ListBookmarksComponent implements OnInit {
  allBookmarks: Bookmark[] = [];
  todaysBookmarks: Bookmark[] = [];
  yesterdaysBookmarks: Bookmark[] = [];
  olderBookmarks: Bookmark[] = [];

  constructor(public readonly bookmarkService: BookmarkService) { }
  ngOnInit(): void {
    this.allBookmarks = this.bookmarkService.allBookmarks;
    this.todaysBookmarks = this.allBookmarks.filter(b => isToday(b.created));
    this.yesterdaysBookmarks = this.allBookmarks.filter(b => isYesterday(b.created));
    this.olderBookmarks = this.allBookmarks.filter(bookmark => !this.todaysBookmarks.find(b => b.id === bookmark.id) && !this.yesterdaysBookmarks.find(b => b.id === bookmark.id));
  }


}
