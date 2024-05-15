import { Bookmark } from "../../shared/services/bookmark/bookmark.service";

export interface BookmarksState {
  all: Bookmark[];
  edit: Bookmark | null;
}
