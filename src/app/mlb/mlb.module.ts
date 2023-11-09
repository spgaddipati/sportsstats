import { NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MlbComponent } from './mlb.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LeadersComponent } from './leaders/leaders.component';
 const routes: Routes = [
  { path: 'home', component: MlbComponent},
  { path: 'leaders', component: LeadersComponent}
];

@NgModule({
  declarations: [
    MlbComponent,
    LeadersComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatAutocompleteModule,
    RouterModule.forChild(routes),
  ]
})
export class MlbModule { }
