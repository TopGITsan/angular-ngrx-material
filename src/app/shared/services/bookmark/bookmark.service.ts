import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';

export interface Bookmark {
  id: number;
  name: string;
  url: string;
  created: Date;
}

export interface BookmarkApiResponse {
  searchTerm: string;
  page: number;
  pages: number;
  perPage: number;
  total: number;
  bookmarks: Bookmark[];
  status: string;
}

@Injectable({
  providedIn: 'root',
})
export class BookmarkService {
  private readonly http = inject(HttpClient);
  private readonly url = 'api/bookmarks';

  public getAll(): Observable<Bookmark[]> {
    return this.http.get<Bookmark[]>(this.url);
  }

  public searchBookmark(
    searchTerm: string,
    page: number,
  ): Observable<BookmarkApiResponse | { error: string }> {
    const perPage = 20;
    return this.getAll().pipe(
      map((bookmarks: Bookmark[]) => {
        if (!searchTerm) {
          return {
            page,
            pages: bookmarks.length / perPage,
            perPage,
            total: bookmarks.length,
            bookmarks: bookmarks.slice(perPage * page, perPage),
            status: '200',
            searchTerm,
          };
        }
        const searchedBookmarks = bookmarks.filter(
          (b: Bookmark) =>
            !!b.name.toLowerCase().includes(searchTerm.toLowerCase()),
        );
        return {
          page,
          pages: searchedBookmarks.length / perPage,
          perPage,
          total: searchedBookmarks.length,
          bookmarks: searchedBookmarks.slice(perPage * page, perPage),
          status: '200',
          searchTerm,
        };
      }),
      catchError((error) => of({ error })),
    );
  }

  public getById(bookmarkId: number): Observable<Bookmark> {
    return this.http.get<Bookmark>(`${this.url}/${bookmarkId}`);
  }

  public save(bookmark: Bookmark): Observable<Bookmark> {
    return this.http.post<Bookmark>(`${this.url}`, bookmark);
  }

  public update(bookmark: Bookmark): Observable<Bookmark> {
    return this.http.put<Bookmark>(`${this.url}`, bookmark);
  }
}
