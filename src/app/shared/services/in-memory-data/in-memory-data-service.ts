import dayjs from 'dayjs';
import { Bookmark } from '../bookmark/bookmark.service';
import { getRandomInt, removeHttp } from '../../util';
const urls = [
  'https://angular.dev',
  'https://ngrx.io',
  'https://www.typescript.org',
  'https://rxjs.dev',
];
export class InMemoryDataService implements InMemoryDataService {
  createDb() {
    return {
      bookmarks: createBookmarkBatch(),
    };
  }
}

function createBookmark(): Bookmark {
  const randomInt = getRandomInt(urls.length - 1);
  return {
    id: getRandomInt(999999999),
    name: removeHttp(urls[randomInt]),
    url: urls[randomInt],
    created: dayjs().subtract(getRandomInt(30), 'day').toDate(),
  };
}

function createBookmarkBatch(): Bookmark[] {
  return Array.from({ length: 1000 }, (v, i) => createBookmark());
}
