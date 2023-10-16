import { Component, ViewChild, OnInit, inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ISRService } from '../API/isr.service';
import { GridComponent} from '@progress/kendo-angular-grid';
import { Observable } from 'rxjs';
import { Router } from "@angular/router";
import { IWORKORDER, WSRSTATUS } from '../API/isr';
@Component({
  selector:'isr-information',
  templateUrl: './wsr.component.html',
  styleUrls: ['./wsr.component.css']
})
export class WSRComponent implements OnInit {
  pageTitle = 'WSRs for Week Ending - ';
  errorMessage = '';
  profileForm = new FormGroup({
    workorder:  new FormControl(0)
  });

  @ViewChild(GridComponent, { static: true })
  //public placeHolderwo: IWORKORDER = { WorkOrder: 'Select Workorder...', id: 0 };
  public placeHolderwo: { text: string, value: number } = { text: "Select item...", value: null };
  public grid: GridComponent;
  public isNew: boolean;
  public viewwsrs:boolean = false;
  public viewisrs:boolean = false;
  public editDataItemID: number = -1;
  public curdate: Date = new Date();
  observableWorkorders: Observable<IWORKORDER[]>
  observableWSRStatus: Observable<WSRSTATUS[]>
  constructor(private wsrservice:ISRService, private router: Router) {}

  ngOnInit(): void {
    this.observableWorkorders = this.wsrservice.getworkorders();
    this.observableWSRStatus = this.wsrservice.getWSRStatuss()
    let curdaynum :number =  this.curdate.getDay();
    if (curdaynum === 0)
        curdaynum = 7
    const tempDate = this.curdate.setDate(this.curdate.getDate()-curdaynum);
    const lastsun = new Date(tempDate).toLocaleDateString();
    this.pageTitle += lastsun;
  }

   public addHandler(e) {
    this.editDataItemID = this.profileForm.controls['workorder'].value;
    this.isNew = true;
  }
  public ViewWSRs(){
    this.viewwsrs=true;
    this.viewisrs = false;
    this.editDataItemID = this.profileForm.controls['workorder'].value;
    this.isNew = false;

  }
  public ViewISRs(){
    this.viewwsrs=false;
    this.viewisrs = true;
    this.editDataItemID = this.profileForm.controls['workorder'].value;
    this.isNew = false;

  }
  public editHandler({dataItem}) {
    this.viewwsrs=true;
    this.viewisrs = false;
    this.editDataItemID = dataItem.WSRUID
    this.isNew = false;
  }
  public cancelHandler() {
      this.editDataItemID = -1;
  }
  public saveHandler(rwsh: any) {
    if(this.isNew)
      this.wsrservice.postisr(rwsh).subscribe();
    else
      this.wsrservice.putisr(rwsh.id, rwsh).subscribe();
      this.editDataItemID = -1;
      //this.isrs = this.wsrservice.getISRs();
  }
}
