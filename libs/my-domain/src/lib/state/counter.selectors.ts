import { InjectionToken } from '@angular/core';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  CounterState,
} from './counter.reducer';

// Lookup the 'Counter' feature state managed by NgRx

export const counterSelectors = new InjectionToken('[Counter] Selectors');


export function getSelectors(stateKey: string) {

  const getState = createFeatureSelector<CounterState>(stateKey);

  const selectCount = createSelector(
    getState,
    (state: CounterState) => state.count
  );

   return {
     getState,
     selectCount
   };
}
