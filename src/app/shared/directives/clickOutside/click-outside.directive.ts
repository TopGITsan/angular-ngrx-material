import { DOCUMENT } from '@angular/common';
import {
  DestroyRef,
  Directive,
  ElementRef,
  inject,
  NgZone,
  OnInit,
  output,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter, fromEvent } from 'rxjs';

@Directive({
  selector: '[appClickOutside]',
  standalone: true,
})
export class ClickOutsideDirective implements OnInit {
  private readonly ngZone = inject(NgZone);
  private readonly document = inject(DOCUMENT);
  private readonly elementRef = inject(ElementRef);
  private readonly destroyRef = inject(DestroyRef);

  appClickOutside = output<Event>();
  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => {
      fromEvent(this.document, 'click')
        .pipe(
          takeUntilDestroyed(this.destroyRef),
          filter(
            (event: Event) =>
              !this.elementRef.nativeElement.contains(event.target),
          ),
        )
        .subscribe((event: Event) => {
          this.ngZone.run(() => this.appClickOutside.emit(event));
        });
    });
  }
}
