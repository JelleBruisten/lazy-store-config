import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppComponent } from './app.component';
import { HelloComponent } from './hello/hello.component';
const routes: Routes = [
  {
    path: 'hello',
    component: HelloComponent,
  },
  {
    path: 'feature',
    loadChildren: () =>
      import('@lazy-store-config/my-feature').then((m) =>
        m.FeatureModule.withConfig('counter')
      ),
  },
  {
    path: 'feature2',
    loadChildren: () =>
      import('@lazy-store-config/my-feature').then((m) =>
        m.FeatureModule.withConfig('counter2')
      ),
  },
  {
    path: '**',
    redirectTo: 'hello',
  },
];

@NgModule({
  declarations: [AppComponent, HelloComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    StoreModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
