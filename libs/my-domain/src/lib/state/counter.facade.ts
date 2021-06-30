import { Inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as actions from './counter.actions'
import { counterSelectors, getSelectors } from './counter.selectors';

@Injectable({
  providedIn: 'any'
})
export class CounterFacade {
  readonly count$ = this.store.select(this.selectors.selectCount);

  constructor(
    private store: Store,
    @Inject(counterSelectors)
    private selectors: ReturnType<typeof getSelectors>
  ) {}

  increase() {
    this.store.dispatch(actions.increase());
  }

  decrease() {
    this.store.dispatch(actions.decrease());
  }

  reset() {
    this.store.dispatch(actions.reset());
  }
}
