/* import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './home/welcome.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { SelectiveStrategy } from './selective-strategy.service';
const routes: Routes = [
  { data: { Title:"Welcome" }, path: 'welcome', component: WelcomeComponent },
  {
    path: 'mlb',
    loadChildren: () =>
      import('./mlb/mlb.module').then(m => m.MlbModule)
  },
  {
    path: 'nfl',
    data: { preload: false,title:"NFL" },
    loadChildren: () =>
      import('./nfl/nfl.module').then(m => m.NflModule)
  },
  {
    path: 'isr',
    data: { preload: false,title:"ISR" },
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
 */
