import { Pipe, PipeTransform } from '@angular/core';
import { Bookmark } from '../services/bookmark/bookmark.service';

@Pipe({
  name: 'fuzzy',
  standalone: true
})
export class FuzzyPipe implements PipeTransform {

  transform(bookmarks: Bookmark[] | null, ...args: string[]): Bookmark[] {
    const filterTerm = args[0];
    if (!bookmarks) {
      return []
    }
    return filterTerm ? bookmarks.filter((b: Bookmark) => !!b.name.toLowerCase().includes(filterTerm.toLowerCase())) : bookmarks;
  }

}
