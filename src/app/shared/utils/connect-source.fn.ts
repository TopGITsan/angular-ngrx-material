import { WritableSignal } from '@angular/core';
import { finalize, merge, NEVER, Observable, share, tap } from 'rxjs';

/**
 * derived state with signals
 *
 * create a connection between the observable and the signal
 *
 * - automatic cleanup (Observables can automatically clean up the connections or listeners when the user goes to other pages and all subscribers have unsubscribed.)
 * - reset and re-fetch (Observables can automatically reset state when the user goes to other pages and all subscribers have unsubscribed, and automatically re-fetch data when the user returns to a page that needs it)
 * - automatic cancel (Observables can automatically cancel requests when the user goes to other pages and all subscribers have unsubscribed)
 * - automatic defer (Observables can represent data sources but wait for subscribers instead of prematurely consuming them)
 * read more
 * https://dev.to/mfp22/introducing-the-auto-signal-pattern-1a5h
 */
export function connectSource<T>(
  source$: Observable<T>,
  state: WritableSignal<T>,
) {
  const initialState = state();
  // merge the source observable with a NEVER observable because the source can sometimes self complete and that will trigger finalize to run
  return merge(source$, NEVER).pipe(
    // set the signal state to the state that came from the observable
    tap((s) => state.set(s)),
    // when all the subscribers are done set it back to the initial state
    // sometimes the source can self complete and that will trigger finalize to run
    // we want finalize to happen when all the subscribers unsubscribe (trick: merge the source observable with a NEVER observable)
    finalize(() => state.set(initialState)),
    // it should only do this once no matter how many subscribers has
    share(),
  );
}
