import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromCounter from './state/counter.reducer';
// import { CounterFacade } from './state/counter.facade';
import { counterSelectors, getSelectors } from './state/counter.selectors';

@NgModule({
  imports: [
    CommonModule,
    StoreModule
  ]
})
export class DomainModule {

  static forFeature(stateKey: string): ModuleWithProviders<DomainModule> {
    return {
      ngModule: DomainModule,
      providers: [
        ...StoreModule.forFeature(stateKey, fromCounter.reducer).providers,
        {
          provide: counterSelectors,
          useValue: getSelectors(stateKey),
        },
      ],
    };
  }
}
