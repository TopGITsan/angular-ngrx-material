import { AfterViewInit, ChangeDetectionStrategy, Component, DestroyRef, ElementRef, Signal, viewChild } from '@angular/core';
// import { MatFormFieldModule } from "@angular/material/form-field";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { FormsModule } from '@angular/forms';
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTooltipModule } from "@angular/material/tooltip";
import { RouterModule } from '@angular/router';
import { debounceTime, distinctUntilChanged, fromEvent, map } from 'rxjs';
import { BookmarkService } from '../../shared/services/bookmark/bookmark.service';
import { GlobalStoreFacadeService } from '../../store/global.store.facade';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatTooltipModule, MatInputModule, RouterModule, FormsModule],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShellComponent implements AfterViewInit {

  searchFilterTextSignal: Signal<ElementRef | undefined> = viewChild.required<ElementRef<HTMLInputElement>>('inputFilterText');
  constructor(public readonly bookmarkService: BookmarkService, private readonly store: GlobalStoreFacadeService, private readonly destroyRef: DestroyRef) { }
  ngAfterViewInit(): void {
    const searchFilterTextElement: HTMLInputElement | undefined = this.searchFilterTextSignal()?.nativeElement;
    if (searchFilterTextElement) {
      fromEvent(searchFilterTextElement, 'input').pipe(
        takeUntilDestroyed(this.destroyRef),
        debounceTime(450),
        map((event) => ((event.target) as HTMLInputElement).value),
        distinctUntilChanged(),
      ).subscribe({
        next: (value) => this.onFilterChange(value),
        error: () => console.log(`[${ShellComponent.name}] something whent wrong`)
      })
    }
  }

  onFilterChange(filterText: string): void {
    this.store.onFilterChange(filterText ?? '');
  }

}
