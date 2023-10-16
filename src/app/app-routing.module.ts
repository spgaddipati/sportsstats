import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './home/welcome.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { SelectiveStrategy } from './selective-strategy.service';
const routes: Routes = [
  { path: 'welcome', component: WelcomeComponent },
  {
    path: 'isr',
    data: { preload: false },
    loadChildren: () =>
      import('./ISR/isr.module').then(m => m.ISRModule)
  },
  {
    path: 'wsr',
    data: { preload: false },
    loadChildren: () =>
      import('./WSR/wsr.module').then(m => m.WSRModule)
  },

  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { enableTracing: false, preloadingStrategy: SelectiveStrategy })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
