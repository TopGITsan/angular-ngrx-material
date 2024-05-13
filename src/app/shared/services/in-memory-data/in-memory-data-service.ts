import dayjs from "dayjs";

export class InMemoryDataService implements InMemoryDataService {
  createDb() {
    return {
      bookmarks: [
        {
          id: 1,
          name: 'Angular',
          url: 'https://angular.dev',
          created: dayjs().toDate()
        },
        {
          id: 2,
          name: 'NgRx',
          url: 'https://ngrx.io',
          created: dayjs().subtract(1, 'day').toDate()
        },
        {
          id: 3,
          name: 'Typescript',
          url: 'https://www.typescript.org',
          created: dayjs().subtract(2, 'day').toDate()
        },
        {
          id: 4,
          name: 'RxJs',
          url: 'https://rxjs.dev',
          created: dayjs().subtract(3, 'day').toDate()
        },
      ]
    }
  }
}
