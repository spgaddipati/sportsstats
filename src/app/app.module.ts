import { NgModule } from '@angular/core';

import { Routes,RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ISRData } from './API/isr-data';
//import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './home/welcome.component';
import { PageNotFoundComponent } from './page-not-found.component';
/* Feature Modules */
import { GridModule } from '@progress/kendo-angular-grid';
import { EditorModule } from '@progress/kendo-angular-editor';
import { SharedModule } from './shared/shared.module';
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
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatAutocompleteModule,
    SharedModule,
    //RouterModule,
    RouterModule.forRoot(routes, { enableTracing: false }),
    //InMemoryWebApiModule.forRoot(ISRData, { delay: 1000 }),
    //AppRoutingModule,
    GridModule,
    EditorModule
  ],
  //exports: [RouterModule],
  declarations: [
    AppComponent,
    WelcomeComponent,
    PageNotFoundComponent,
    //ISRSWORKComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
