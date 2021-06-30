import { createAction } from '@ngrx/store';
export const reset = createAction('[Counter] reset');

export const increase = createAction('[Counter] increase');

export const decrease = createAction('[Counter] decrease');
