import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BookmarkService } from '../../../shared/services/bookmark/bookmark.service';
import { Router, RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import dayjs from 'dayjs';
import { ErrorDialogComponent } from '../../../shared/components/error-dialog/error-dialog.component';

@Component({
  selector: 'app-edit-bookmark',
  standalone: true,
  imports: [MatFormFieldModule, MatExpansionModule, MatIconModule, MatInputModule, MatButtonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './edit-bookmark.component.html',
  styleUrl: './edit-bookmark.component.scss'
})
export class EditBookmarkComponent implements OnDestroy {
  bookmarkFormGroup: FormGroup<{
    name: FormControl<string | null | undefined>;
    url: FormControl<string | null | undefined>;
  }>;
  bookmarkUpdateSub: Subscription | undefined;

  constructor(private readonly fb: FormBuilder, private readonly bookmarkService: BookmarkService, private readonly router: Router, private readonly dialog: MatDialog) {
    this.bookmarkFormGroup = this.fb.group({
      name: this.fb.control(this.bookmarkService.editBookmark?.name, Validators.required),
      url: this.fb.control(this.bookmarkService.editBookmark?.url, Validators.required)
    })
  }
  ngOnDestroy(): void {
    if (this.bookmarkUpdateSub) {
      this.bookmarkUpdateSub.unsubscribe()
    }
  }

  onSubmit() {
    const { name, url } = this.bookmarkFormGroup.value;
    if (!name || !url || !this.bookmarkService.editBookmark) {
      this.dialog.open(ErrorDialogComponent, { width: '400px', data: { errorMessage: 'Sorry, unable to create bookmark, provide a name and url' } })
      return;
    }
    this.bookmarkUpdateSub = this.bookmarkService.update({
      id: this.bookmarkService.editBookmark?.id,
      name,
      url,
      created: dayjs().toDate()
    }).subscribe({
      next: () => this.router.navigate(['list']),
      error: () => this.dialog.open(ErrorDialogComponent, { width: '400px', data: { errorMessage: 'Sorry, unable to create bookmark, backend error' } })
    })
  }

}
