import { DatePipe, NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterLinkWithHref } from '@angular/router';
import { BookmarksSignalStoreService } from '../../../store/bookmarks-signal/bookmarks-signal-store.service';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { tap } from 'rxjs';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-signal-list',
  standalone: true,
  imports: [
    DatePipe,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatProgressBarModule,
    ReactiveFormsModule,
    RouterLinkWithHref,
  ],
  templateUrl: './signal-list.component.html',
  styleUrl: './signal-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignalListComponent {
  readonly store = inject(BookmarksSignalStoreService);
  private readonly cdRef = inject(ChangeDetectorRef);

  private readonly storeConnectionSub = this.store.connection$
    .pipe(
      takeUntilDestroyed(),
      tap(() => this.cdRef.markForCheck()),
    )
    .subscribe();
}
