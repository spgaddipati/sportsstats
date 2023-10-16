import { Component, ViewChild, OnInit, inject } from '@angular/core';
import { ISR, RESOURCE } from '../API/isr';
import { ISRService } from '../API/isr.service';
import { GridComponent, GridDataResult, DataStateChangeEvent} from '@progress/kendo-angular-grid';
import { Observable } from 'rxjs';
import { Router } from "@angular/router";
import { of } from 'rxjs';
@Component({
  selector:'isr-information',
  templateUrl: './isr.component.html',
  styleUrls: ['./isr.component.css']
})
export class ISRComponent implements OnInit {

  errorMessage = '';
  observableisrs: Observable<ISR[]>
  isrs: ISR[] = [];
  obsresinfo:Observable<RESOURCE[]>
  resinfo:RESOURCE[] = []
  pageTitle = 'ISRs List';
  @ViewChild(GridComponent, { static: true })
  public grid: GridComponent;
  public isNew: boolean = false;
  public editDataItemID: number = -1;
  public curdate: Date = new Date();
  constructor(private isrservice:ISRService, private router: Router) {}

  ngOnInit(): void {
    this.obsresinfo = this.isrservice.getResourceInfo('802139')
    this.obsresinfo.subscribe(resinfodata => {
        this.resinfo = resinfodata;
    })
    this.observableisrs = this.isrservice.getISRs();
    this.observableisrs.subscribe(isrsdata => {
      this.isrs = isrsdata;
    })
  }

  public addHandler(e) {
    this.editDataItemID = 0;
    this.isNew = true;
  }

  public editHandler({dataItem}) {
    this.editDataItemID = dataItem.id;
    this.isNew = false;
  }
  public cancelHandler() {
      this.editDataItemID = -1;
  }
  public saveHandler(rwsh: ISR) {
    rwsh.status = "Working";
    let curdaynum :number =  this.curdate.getDay();
    if (curdaynum === 0)
        curdaynum = 7
    const tempDate = this.curdate.setDate(this.curdate.getDate()-curdaynum);
    const lastsun = new Date(tempDate).toLocaleDateString();
    rwsh.WeekendDate = lastsun;
    if(this.isNew)
      this.isrservice.postisr(rwsh).subscribe(isrsdata => {
        this.observableisrs = this.isrservice.getISRs();
        this.observableisrs.subscribe(isrsdata => {
          this.isrs = isrsdata;
        })
      });
    else
      this.isrservice.putisr(rwsh.id, rwsh);
    this.editDataItemID = -1;
    //this.observableisrs = this.isrservice.getISRs();
    this.observableisrs.subscribe(isrsdata => {
      this.isrs = isrsdata;
    });
  }
}
