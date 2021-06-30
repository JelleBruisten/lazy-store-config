import { createReducer, on, Action } from '@ngrx/store';
import * as CounterActions from './counter.actions';

export interface CounterState {
  count: number
}

export const initialState: CounterState = {
  count: 0
}

const counterReducer = createReducer(
  initialState,

  on(CounterActions.reset, (state) => ({
    ...state,
    count: 0,
  })),

  on(CounterActions.increase, (state) => ({
    ...state,
    count: state.count + 1,
  })),

  on(CounterActions.decrease, (state) => ({
    ...state,
    count: state.count -1,
  }))
);

export function reducer(state: CounterState | undefined, action: Action) {
  return counterReducer(state, action);
}
