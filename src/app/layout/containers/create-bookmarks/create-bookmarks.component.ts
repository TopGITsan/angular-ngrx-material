import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import dayjs from 'dayjs';
import { Subscription } from 'rxjs';
import { ErrorDialogComponent } from '../../../shared/components/error-dialog/error-dialog.component';
import { LoaderDirective } from '../../../shared/directives/loader.directive';
import { BookmarkStoreFacadeService } from '../../../store/bookmarks/bookmarks.facade';

@Component({
  selector: 'app-create-bookmarks',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    LoaderDirective,
  ],
  templateUrl: './create-bookmarks.component.html',
  styleUrl: './create-bookmarks.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateBookmarksComponent implements OnDestroy {
  bookmarkCreateSub: Subscription | undefined;
  bookmarkForm: FormGroup<{
    name: FormControl<string | null>;
    url: FormControl<string | null>;
  }>;

  constructor(
    private readonly fb: FormBuilder,
    private readonly dialog: MatDialog,
    private readonly store: BookmarkStoreFacadeService,
  ) {
    this.bookmarkForm = this.fb.group({
      name: this.fb.control('', Validators.required),
      url: this.fb.control('', Validators.required),
    });
  }
  ngOnDestroy(): void {
    if (this.bookmarkCreateSub) {
      this.bookmarkCreateSub.unsubscribe();
    }
  }

  onSubmit() {
    const { name, url } = this.bookmarkForm.value;
    if (!name || !url) {
      this.dialog.open(ErrorDialogComponent, {
        width: '400px',
        data: {
          errorMessage:
            'Sorry, unable to create bookmark, provide a name and url',
        },
      });
      return;
    }
    this.store.onCreateBookmark({
      name,
      url,
      created: dayjs().toDate(),
      id: Math.floor(Math.random() * 999901) + 100,
    });
  }
}
