import { NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';
import { WSRComponent } from './wsr.component';
import { WSRWORKComponent} from './WSRWork/wsrwork.component'
import { SharedModule } from '../shared/shared.module';
import { GridModule, PDFModule } from '@progress/kendo-angular-grid';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { EditorModule } from '@progress/kendo-angular-editor';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
const routes: Routes = [
  { path: '', component: WSRComponent }
];

@NgModule({
  imports: [
    GridModule,
    DialogModule,
    InputsModule,
    EditorModule,
    DropDownsModule,
    PDFModule,
    RouterModule.forChild(
      routes
    ),
    SharedModule,
    ReactiveFormsModule
  ],
  declarations: [
    WSRComponent,
    WSRWORKComponent,
    //ISRSWORKComponent,
  ]
})
export class WSRModule { }
