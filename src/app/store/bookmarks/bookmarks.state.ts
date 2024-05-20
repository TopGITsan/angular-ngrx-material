import { Bookmark } from "../../shared/services/bookmark/bookmark.service";

export interface BookmarksState {
  edit: Bookmark | null;
}
