import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { GlobalStoreFacadeService } from './store/global.store.facade';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatProgressSpinnerModule, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  isPageLoading$: Observable<boolean> | undefined;
  constructor(private readonly store: GlobalStoreFacadeService) {}
  ngOnInit(): void {
    this.isPageLoading$ = this.store.getIsPageLoading$();
  }
}
