import { Component, ViewChild, OnInit, inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ISRService } from '../../API/isr.service';
import { GridComponent, GridDataResult, DataStateChangeEvent} from '@progress/kendo-angular-grid';
import { Observable } from 'rxjs';
import { Router } from "@angular/router";
import { IWORKORDER, IWORKACTIVITY,ISR,ISRWORK, ICWISRSTATUSBYWO } from '../../API/isr';
import { of } from 'rxjs';
@Component({
  selector:'isr-information',
  templateUrl: './isrs.component.html',
  styleUrls: ['./isrs.component.css']
})
export class ISRSComponent implements OnInit {
  pageTitle = 'ISRs for Week Ending - ';
  errorMessage = '';
  isrs: ISR[] = [];
  observableisrs: Observable<ISR[]>
  profileForm = new FormGroup({
    workorder:  new FormControl(0)

  });

  @ViewChild(GridComponent, { static: true })
  public grid: GridComponent;
  public isNew: boolean;
  public editDataItemID: number = -1;
  public curdate: Date = new Date();
  observableWorkorders: Observable<IWORKORDER[]>
  obscurweekisrs:Observable<ICWISRSTATUSBYWO[]>
  curweekisrs: ICWISRSTATUSBYWO[] = []
  public placeHolderwo: IWORKORDER = { WorkOrder: 'Select Workorder...', id: null };
  constructor(private wsrservice:ISRService, private router: Router) {}

  ngOnInit(): void {
    this.observableWorkorders = this.wsrservice.getworkorders();
    let curdaynum :number =  this.curdate.getDay();
    if (curdaynum === 0)
        curdaynum = 7
    const tempDate = this.curdate.setDate(this.curdate.getDate()-curdaynum);
    const lastsun = new Date(tempDate).toLocaleDateString();
    this.pageTitle += lastsun;
    this.router.url;
    this.observableisrs = this.wsrservice.getISRbyDate(lastsun);
      this.observableisrs.subscribe(isrsdata => {
        this.isrs = isrsdata;
      })
  }

  public CWISRStatusByWO(e){
    this.obscurweekisrs = this.wsrservice.getCWISRStatusByWO(e);
    this.obscurweekisrs.subscribe(cwisrsdata => {
      this.curweekisrs = cwisrsdata;
    })
  }

   public addHandler(e) {
    this.editDataItemID = this.profileForm.controls['workorder'].value;
    this.isNew = true;
  }
  public ViewISRs(){
    this.editDataItemID = this.profileForm.controls['workorder'].value;
    this.isNew = false;
  }
  public editHandler() {

  }
  public cancelHandler() {
      this.editDataItemID = -1;
  }
  public saveHandler(rwsh: ISR) {
    if(this.isNew)
      this.wsrservice.postisr(rwsh).subscribe();
    else
      this.wsrservice.putisr(rwsh.id, rwsh).subscribe();
      this.editDataItemID = -1;
      this.observableisrs = this.wsrservice.getISRs();
      this.observableisrs.subscribe(isrsdata => {
        this.isrs = isrsdata;
      })
      /* this.isrs = of([
        {
          id: 1,
          ISRUID:1,
          UserPIN:'Siva P. Gaddipati',
          WeekendDate: '02/12/2023',
          status:'Submitted',
          ISRWORKS:[
            {
              id:1,
              ISRUID:1,
              workorderid:1,
              WorkOrder: '',
              WorkActivity:'10',
              WorkType:'',
              Work:''
            },
            {
              id:2,
              ISRUID:1,
              workorderid:1,
              WorkOrder: '',
              WorkActivity:'20',
              WorkType:'',
              Work:''
            }

          ]
        },
        {
          id: 2,
          ISRUID:2,
          UserPIN:'Siva P. Gaddipati',
          WeekendDate: '02/19/2023',
          status:'Submitted',
          ISRWORKS:[
            {
              id:3,
              ISRUID:2,
              workorderid:1,
              WorkOrder: '',
              WorkActivity:'',
              WorkType:'',
              Work:''
            },
            {
              id:4,
              ISRUID:2,
              workorderid:1,
              WorkOrder: '',
              WorkActivity:'',
              WorkType:'',
              Work:''
            }

          ]
        },
        {
          id: 3,
          ISRUID:3,
          UserPIN:'Siva P. Gaddipati',
          WeekendDate: '02/26/2023' ,
          status:'Processed',
          ISRWORKS:[
            {
              id:5,
              ISRUID:3,
              workorderid:1,
              WorkOrder: '',
              WorkActivity:'',
              WorkType:'',
              Work:''
            },
            {
              id:6,
              ISRUID:3,
              workorderid:1,
              WorkOrder: '',
              WorkActivity:'',
              WorkType:'',
              Work:''
            }

          ]
        },
        {
          id: 4,
          ISRUID:4,
          UserPIN:'Siva P. Gaddipati',
          WeekendDate:'3/5/2023',
          status:'Submitted',
          ISRWORKS:[
            {
              id:7,
              ISRUID:4,
              workorderid:8,
              WorkOrder: '7.51-204',
              WorkActivity:'10',
              WorkType:'Meeting',
              Work:'<ul><li><p><strong>Performed no activities during this reporting period.</strong></p></li><li><p><span style=\"font-size:11.0pt;mso-bidi-font-size:10.0pt;\nline-height:120%;font-family:&quot;Times New Roman&quot;,serif;mso-ascii-theme-font:minor-latin;\nmso-fareast-font-family:SimSun;mso-hansi-theme-font:minor-latin;mso-ansi-language:\nEN-US;mso-fareast-language:EN-US;mso-bidi-language:AR-SA\">Analyzed the modified functional requirements document for Universal Text Identifier (UTI) PAY092 provided by the analyst to fix the incorrect date fill-in 5.</span></p></li></ul>'
            },
            {
              id:8,
              ISRUID:4,
              workorderid:8,
              WorkOrder: '7.51-204',
              WorkActivity:'20',
              WorkType:'Development',
              Work:'<ul><li><p>Supported the Data Element Cluster (DEC) copybooks to M2-Master Beneficiary Record (MBR) copybook conversion:</p><ul><li><p class=\"Bullet2\" style=\"mso-list:l1 level2 lfo2\">Analyzed D2DV-MB-HITP group items in Copybook NOBENDEC and identified corresponding field names in copybook M2-MBR.</p></li></ul></li></ul>'
            },
            {
              id:7,
              ISRUID:4,
              workorderid:10,
              WorkOrder: '7.51-205',
              WorkActivity:'10',
              WorkType:'Meeting',
              Work:'<ul><li><p><strong>Performed no activities during this reporting period.</strong></p></li><li><p><span style=\"font-size:11.0pt;mso-bidi-font-size:10.0pt;\nline-height:120%;font-family:&quot;Times New Roman&quot;,serif;mso-ascii-theme-font:minor-latin;\nmso-fareast-font-family:SimSun;mso-hansi-theme-font:minor-latin;mso-ansi-language:\nEN-US;mso-fareast-language:EN-US;mso-bidi-language:AR-SA\">Analyzed the modified functional requirements document for Universal Text Identifier (UTI) PAY092 provided by the analyst to fix the incorrect date fill-in 5.</span></p></li></ul>'
            },
            {
              id:8,
              ISRUID:4,
              workorderid:10,
              WorkOrder: '7.51-205',
              WorkActivity:'20',
              WorkType:'Development',
              Work:'<ul><li><p>Supported the Data Element Cluster (DEC) copybooks to M2-Master Beneficiary Record (MBR) copybook conversion:</p><ul><li><p class=\"Bullet2\" style=\"mso-list:l1 level2 lfo2\">Analyzed D2DV-MB-HITP group items in Copybook NOBENDEC and identified corresponding field names in copybook M2-MBR.</p></li></ul></li></ul>'
            }

          ]
        },
        {
          id: 5,
          ISRUID:5,
          UserPIN:'Elias Geisendorfer',
          WeekendDate: '3/5/2023',
          status:'Working',
          ISRWORKS:[
            {
              id:9,
              ISRUID:5,
              workorderid:8,
              WorkOrder: '7.51-204',
              WorkActivity:'10',
              WorkType:'Meeting',
              Work:'<ul><li><p>Executed the following:</p><ul><li><p class=\"Bullet3\" style=\"mso-list:l1 level3 lfo2\">Automation script to verify Combined Exchange Record (CER) file requirements and record data exchanged with the Center for Medicare and Medicaid Services (CMS) generated by the Daily Update Data Exchange (DUDEX) program in the RD02 batch run</p></li><li><p class=\"Bullet3\" style=\"mso-list:l1 level3 lfo2\">Data generation utility to generate data tables for the missing cases in RD01</p></li></ul></li></ul>'
            },
            {
              id:9,
              ISRUID:5,
              workorderid:8,
              WorkOrder: '7.51-204',
              WorkActivity:'20',
              WorkType:'Meeting',
              Work:'<ul><li><p>Executed the following:</p><ul><li><p class=\"Bullet3\" style=\"mso-list:l1 level3 lfo2\">Automation script to verify Combined Exchange Record (CER) file requirements and record data exchanged with the Center for Medicare and Medicaid Services (CMS) generated by the Daily Update Data Exchange (DUDEX) program in the RD02 batch run</p></li><li><p class=\"Bullet3\" style=\"mso-list:l1 level3 lfo2\">Data generation utility to generate data tables for the missing cases in RD01</p></li></ul></li></ul>'
            },
            {
              id:10,
              ISRUID:5,
              workorderid:10,
              WorkOrder: '7.51-205',
              WorkActivity:'20',
              WorkType:'Development',
              Work:'<ul><li><p>Supported the Data Element Cluster (DEC) copybooks to M2-Master Beneficiary Record (MBR) copybook conversion:</p><ul><li><p class=\"Bullet2\" style=\"mso-list:l1 level2 lfo2\">Analyzed D2DV-MB-HITP group items in Copybook NOBENDEC and identified corresponding field names in copybook M2-MBR.</p></li></ul></li></ul>'
            }

          ]
        }
      ]) */
  }
}
