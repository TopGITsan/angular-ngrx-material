import { Pipe, PipeTransform } from '@angular/core';
import { Bookmark } from '../services/bookmark/bookmark.service';

@Pipe({
  name: 'fuzzy',
  standalone: true
})
export class FuzzyPipe implements PipeTransform {

  transform(bookmarks: Bookmark[], ...args: string[]): Bookmark[] {
    const filterTerm = args[0];
    return filterTerm ? bookmarks.filter((b: Bookmark) => !!b.name.toLowerCase().includes(filterTerm.toLowerCase())) : bookmarks;
  }

}
