import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { GlobalStoreFacadeService } from './store/global.store.facade';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe, LoaderComponent],
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
