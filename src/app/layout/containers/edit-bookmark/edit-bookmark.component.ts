import { Component, DestroyRef, OnDestroy } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import dayjs from 'dayjs';
import { Subscription } from 'rxjs';
import { ErrorDialogComponent } from '../../../shared/components/error-dialog/error-dialog.component';
import { Bookmark } from '../../../shared/services/bookmark/bookmark.service';
import { BookmarkStoreFacadeService } from '../../../store/bookmarks/bookmarks.facade';

@Component({
  selector: 'app-edit-bookmark',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatExpansionModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './edit-bookmark.component.html',
  styleUrl: './edit-bookmark.component.scss',
})
export class EditBookmarkComponent implements OnDestroy {
  bookmarkFormGroup!: FormGroup<{
    name: FormControl<string | null | undefined>;
    url: FormControl<string | null | undefined>;
  }>;
  bookmarkUpdateSub: Subscription | undefined;
  editBookmark: Bookmark | null = null;

  constructor(
    private readonly fb: FormBuilder,
    private readonly dialog: MatDialog,
    private readonly store: BookmarkStoreFacadeService,
    private readonly destroyRef: DestroyRef,
  ) {
    this.store
      .getEditBookmark()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((editBookmark) => {
        this.editBookmark = editBookmark;
        this.bookmarkFormGroup = this.fb.group({
          name: this.fb.control(editBookmark?.name, Validators.required),
          url: this.fb.control(editBookmark?.url, Validators.required),
        });
      });
  }
  ngOnDestroy(): void {
    if (this.bookmarkUpdateSub) {
      this.bookmarkUpdateSub.unsubscribe();
    }
  }

  onSubmit() {
    const { name, url } = this.bookmarkFormGroup.value;
    if (!name || !url || !this.editBookmark?.id) {
      this.dialog.open(ErrorDialogComponent, {
        width: '400px',
        data: {
          errorMessage:
            'Sorry, unable to create bookmark, provide a name and url',
        },
      });
      return;
    }

    this.store.onUpdateBookmark({
      id: this.editBookmark?.id,
      name,
      url,
      created: dayjs().toDate(),
    });
  }
}
