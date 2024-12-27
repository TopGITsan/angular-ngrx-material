import { DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterLinkWithHref } from '@angular/router';
import { tap } from 'rxjs';
import { BookmarksSignalStoreService } from '../../../store/bookmarks-signal/bookmarks-signal-store.service';

@Component({
  selector: 'app-signal-list',
  standalone: true,
  imports: [
    DatePipe,
    MatButtonModule,
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

  /**
   * Much like markForCheck, Signals in zone apps, do not trigger CD.
   * In zoneless apps, with a new change detection scheduler, you can expect signals to trigger CD but we're not there yet !
   * https://github.com/angular/angular/issues/53841
   */
  private readonly storeConnectionSub = this.store.connection$
    .pipe(
      takeUntilDestroyed(),
      tap(() => this.cdRef.markForCheck()),
    )
    .subscribe();
}
