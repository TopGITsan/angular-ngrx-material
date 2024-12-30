import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { inject, ProviderToken } from '@angular/core';
import { Observable } from 'rxjs';
/**
 * We need to make sure that the connection has a subscription
 * Read more
 * https://dev.to/mfp22/introducing-the-auto-signal-pattern-1a5h
 * @param token
 * @returns service
 */
export function injectAutoConnect<
  T,
  Service extends { connection$: Observable<T> },
>(token: ProviderToken<Service>): Service {
  const service = inject(token);
  service.connection$.pipe(takeUntilDestroyed()).subscribe();
  return service;
}
