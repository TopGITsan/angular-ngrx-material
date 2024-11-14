import { computed, Directive, input } from '@angular/core';
import { isUrlExternal } from './external-url';
import { Target } from './target.type';

@Directive({
  // :not() selector is a css selector supported by Angular Directive's API-s which allows the exclusion of some elements
  // Here we exclude all elements with noBlank attribute
  selector: 'a:not([targetRef]="_self")',
  standalone: true,
  host: {
    '[target]': 'target()',
    '[href]': 'href()',
  },
})
export class ExternalLinkDirective {
  targetRef = input<Target>('_self');
  href = input<string>('');
  target = computed<Target>(() =>
    isUrlExternal(this.href()) ? '_blank' : this.targetRef(),
  );
}
