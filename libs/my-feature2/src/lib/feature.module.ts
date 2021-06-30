import { Compiler, Injector, ModuleWithProviders, NgModule, NgModuleFactory, NgModuleRef, Provider, StaticProvider, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DomainModule, reducer } from '@lazy-store-config/my-domain';
import { CounterComponent } from './counter/counter.component';
import { ReducerManager } from '@ngrx/store';

const routes: Routes = [
  {
    path: '',
    component: CounterComponent
  }
];

export class LazyModuleFactory<T> extends NgModuleFactory<T> {
  get moduleType(): Type<T> {
    return this.module;
  }

  constructor(
    private stateKey: string,
    private moduleWithProviders: ModuleWithProviders<T>,
    private module: Type<T>
  ) {
    super();
  }

  create(parentInjector: Injector | null): NgModuleRef<T> {
    const injector = Injector.create({
      providers: this.moduleWithProviders.providers as StaticProvider[],
      parent: parentInjector ?? undefined,
    });

    const compiler = injector.get(Compiler);
    const reducerManager = injector.get(ReducerManager);
    reducerManager.addReducer(this.stateKey, reducer);

    const factory = compiler.compileModuleSync(this.moduleType);
    return factory.create(injector);
  }
}


@NgModule({
  imports: [CommonModule, DomainModule, RouterModule.forChild(routes)],
  declarations: [CounterComponent],
})
export class FeatureModule {
  static withConfig(booking: string): NgModuleFactory<FeatureModule> {
    return new LazyModuleFactory(
      booking,
      FeatureModule.forFeature(booking),
      FeatureModule
    );
  }

  static forFeature(stateKey: string): ModuleWithProviders<FeatureModule> {
    return {
      ngModule: FeatureModule,
      providers: [...DomainModule.forFeature(stateKey).providers],
    };
  }
}
