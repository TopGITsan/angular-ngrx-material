import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay, throwError } from 'rxjs';

export interface Bookmark {
  id: number;
  name: string;
  url: string;
  created: Date;
}

@Injectable({
  providedIn: 'root',
})
export class BookmarkService {
  allBookmarks: Bookmark[] = [];
  editBookmark: Bookmark | undefined;
  filterText: string = '';

  constructor(private readonly http: HttpClient) {}

  public getAll(): Observable<Bookmark[]> {
    return this.http.get<Bookmark[]>('api/bookmarks');
  }

  public getById(bookmarkId: number): Observable<Bookmark> {
    return this.http.get<Bookmark>(`api/bookmarks/${bookmarkId}`);
  }

  public save(bookmark: Bookmark): Observable<Bookmark> {
    return this.http.post<Bookmark>(`api/bookmarks`, bookmark);
  }

  public update(bookmark: Bookmark): Observable<Bookmark> {
    return this.http.put<Bookmark>(`api/bookmarks`, bookmark);
  }
}
