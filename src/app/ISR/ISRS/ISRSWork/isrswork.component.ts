import { Component, Input,Output, OnInit,EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { FormBuilder,FormGroup, FormArray, FormControl, Validators } from "@angular/forms";
import { ISRService } from '../../../API/isr.service';
import { IWORKORDER, IWORKACTIVITY,ISR,ISRWORK } from '../../../API/isr';
import { of } from 'rxjs';

@Component({
  selector: 'app-view-isrs',
  templateUrl: './isrswork.component.html',
  styleUrls: ['./isrswork.component.css'],
})
export class ISRSWORKComponent {

  constructor(
    private wsrService: ISRService,
    private wsrfb:FormBuilder,
    ) {};

  public active = false;
  errorMessage:  string;
  result:object;

  public placeHolderwo: IWORKORDER = { WorkOrder: 'Select Workorder...', id: null };
  public placeHolderwa: IWORKACTIVITY = { WorkActivity: 'Select WorkActivity...', id: null };
  public worktypes: Array<{ text: string, value: number }> = [
    { text: "Analysis", value: 1 },
    { text: "Design", value: 2 },
    { text: "Development", value: 3 },
    { text: "Test", value: 4 },
    { text: "Implementation", value: 5 },
    { text: "Documentation", value: 6 },
    { text: "Meeting", value: 7 },
    { text: "Administration", value: 8 },
    { text: "Other", value: 9 }
  ]

  observableisrs: Observable<ISR[]>
  EditISRs: ISR[] = [];
  EditISRWORKs: ISRWORK[] = [];
  observableWorkorders: Observable<IWORKORDER[]>
  observableWorkactivities: Observable<IWORKACTIVITY[]>
  observableisrworks: Observable<ISR[]>


  @Input() public isNew = false;
  @Input() public set wsrid(workorderid:any) {
    if(workorderid !== undefined){

      this.getActiveWorkorders();
    }
    if(workorderid.length > 0){
      this.wsrForm.reset()
      this.WSRWork.clear();
      this.wsrForm.get('WSRUID').setValue(0);
      this.wsrForm.get('WSRCreatedByPIN').setValue(134);
      this.wsrForm.get('WSRCreated').setValue(new Date());
      const curdate = new Date();
      let curdaynum =  curdate.getDay();
      if (curdaynum === 0)
        curdaynum = 7
      const tempDate = curdate.setDate(curdate.getDate()-curdaynum);
      const lastsun = new Date(tempDate).toLocaleDateString();
      this.observableisrworks = this.wsrService.getISRbyDate(lastsun);
      this.observableisrworks.subscribe(
        data => {
            this.EditISRs = data
            let itemindex = 0;
            this.EditISRs.forEach((obj) =>{
              this.EditISRWORKs = obj.ISRWORKS.filter(woisr=> woisr.WorkOrder === workorderid);
              this.EditISRWORKs.forEach((Obj, index)=> {
                this.WSRWork.push(this.buildwsrwork(workorderid));
                this.WSRWork.controls[itemindex].get('WSRUID').setValue(workorderid)
                this.WSRWork.controls[itemindex].get('RESOURCENAME').setValue(obj.UserPIN)
                this.WSRWork.controls[itemindex].get('WorkActivity').setValue(Obj.WorkActivity)
                this.WSRWork.controls[itemindex].get('WorkType').setValue(Obj.WorkType)
                this.WSRWork.controls[itemindex].get('Work').setValue(Obj.Work)
                itemindex++;
              })
            }),
            error => this.errorMessage = <any>error
        });
    }
    else if(workorderid.length === 0){
      this.wsrForm.reset()
      this.WSRWork.clear();
      this.wsrForm.get('WSRUID').setValue(0);
      this.wsrForm.get('WSRCreatedByPIN').setValue('802139');
      this.wsrForm.get('WSRCreated').setValue(new Date());
    }
    this.active = workorderid !== -1;
  }
  @Output() cancel: EventEmitter<any> = new EventEmitter();
  @Output() save: EventEmitter<any> = new EventEmitter();

  public onSave(e): void {
    e.preventDefault();
    this.save.emit(this.wsrForm.value);
    this.active = false;
  }
  public onCancel(e): void {
    e.preventDefault();
    this.closeForm();
  }
  public closeForm(): void {
    this.active = false;
    this.cancel.emit();
  }

    wsrForm: FormGroup = this.wsrfb.group({
      WSRUID:[0],
      WSRCreatedByPIN:['802139'],
      WSRCreated:[new Date()],
      WSRWORKS:this.wsrfb.array([this.buildwsrwork(0)],[Validators.required]),
    });
  ngOnDestroy(): void {}
  buildwsrwork(wsruid): FormGroup {
    const wos = this.wsrfb.group({
      WSRUID:wsruid,
      WSRWORKUID:[0],
      RESOURCENAME:[''],
      WorkOrder:['',[Validators.required]],
      WorkActivity:['',[Validators.required]],
      WorkType:['',[Validators.required]],
      Work:['',[Validators.required]],
    });
    return wos;
  }

  get WSRWork():FormArray{
    return <FormArray>this.wsrForm.get('WSRWORKS');
  }

  addwork(): void {
    this.WSRWork.push(this.buildwsrwork(this.wsrForm.controls.WSRUID.value));
  }
  removework(i: number) {
    const control = <FormArray>this.wsrForm.controls['WSRWORKS'];
    control.removeAt(i);
  }
  moveup(i:number){
    const control = <FormArray>this.wsrForm.controls['WSRWORKS'];
    this.moverow(control.controls, i, i-1)
  }
  movedown(i:number){
    const control = <FormArray>this.wsrForm.controls['WSRWORKS'];
    this.moverow(control.controls, i, i+1)
  }
  moverow(arr, fromIndex, toIndex) {
    var element = arr[fromIndex];
    arr.splice(fromIndex, 1);
    arr.splice(toIndex, 0, element);
  }

  getActiveWorkorders(){
    this.observableWorkorders = this.wsrService.getworkorders();
    this.observableWorkactivities = this.wsrService.getworkactivities();
  }
}
