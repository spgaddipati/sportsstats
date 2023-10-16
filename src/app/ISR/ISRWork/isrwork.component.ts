import { Component, Input,Output, OnInit,EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { FormBuilder,FormGroup, FormArray, FormControl, Validators } from "@angular/forms";
import { ISRService } from '../../API/isr.service';
import { IWORKORDER, IWORKACTIVITY,ISR,ISRWORK, RESOURCE } from '../../API/isr';


@Component({
  selector: 'app-add-isr',
  templateUrl: './isrwork.component.html',
  styleUrls: ['./isrwork.component.css'],
})
export class ISRWORKComponent {
  public active = false;
  errorMessage:  string;
  result:object;
  public fontData = [
    { text: "24px", size: "24px" },
    { text: "2rem", size: "2rem" },
    { text: "1em", size: "1em" },
    { text: "150%", size: "150%" },
  ];

  observableisrs: Observable<ISR[]>
  EditISRs: ISR[] = [];
  EditISRWORKs: ISRWORK[] = [];
  observableWorkorders: Observable<IWORKORDER[]>
  observableWorkactivities: Observable<IWORKACTIVITY[]>
  observableisrworks: Observable<ISR[]>
  observableresinfo:Observable<RESOURCE[]>
  resinfo:RESOURCE[] = []
  constructor(
    private isrService: ISRService,
    private isrfb:FormBuilder,
    ) {};

  @Input() public isNew = false;
  @Input() public set isrid(id:any) {
    if(id !== undefined){

      this.getActiveWorkorders();
    }
    if(id > 0){
      this.isrForm.reset()
      this.ISRWork.clear();

      this.isrForm.get('ISRUID').setValue(id);
      this.isrForm.get('ISRCreatedByPIN').setValue(134);
      this.isrForm.get('ISRCreated').setValue(new Date());

      this.observableisrworks = this.isrService.getISRWorks(id);
      this.observableisrworks.subscribe(
        isrwork => {
          this.EditISRs = isrwork;
          this.EditISRs.forEach((Obj)=> {
            this.EditISRWORKs = Obj.ISRWORKS;
            this.EditISRWORKs.forEach((Obj, index)=> {
            this.ISRWork.push(this.buildisrwork(id));
            this.ISRWork.controls[index].get('ISRUID').setValue(id)
            this.ISRWork.controls[index].get('WorkOrder').setValue(Obj.WorkOrder)
            this.ISRWork.controls[index].get('WorkActivity').setValue(Obj.WorkActivity)
            this.ISRWork.controls[index].get('WorkType').setValue(Obj.WorkType)
            this.ISRWork.controls[index].get('Work').setValue(Obj.Work)
          })
        }),
        error => this.errorMessage = <any>error
        });
    }
    else if(id === 0){
      this.isrForm.reset();
      this.ISRWork.clear();
      this.isrForm.get('ISRUID').setValue(0);
      this.isrForm.get('ISRCreatedByPIN').setValue('802139');
      this.isrForm.get('ISRCreated').setValue(new Date());
      this.observableresinfo.subscribe(data=>{
        this.resinfo = data
        this.addwork();
        this.ISRWork.controls[0].get('WorkOrder').setValue(this.resinfo[0].WORKORDER)
        this.ISRWork.controls[0].get('WorkActivity').setValue(this.resinfo[0].WORKACTIVITY)
      }
      )


    }
    this.active = id !== -1;
  }
  @Output() cancel: EventEmitter<any> = new EventEmitter();
  @Output() save: EventEmitter<any> = new EventEmitter();

  public onSave(e): void {
    e.preventDefault();
    this.save.emit(this.isrForm.value);
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

    isrForm: FormGroup = this.isrfb.group({
      ISRUID:[0],
      ISRCreatedByPIN:['802139'],
      ISRCreated:[new Date()],
      ISRWORKS:this.isrfb.array([this.buildisrwork(0)],[Validators.required]),
    });
  ngOnDestroy(): void {}
  buildisrwork(isruid): FormGroup {
    const wos = this.isrfb.group({
      ISRUID:isruid,
      ISRWORKUID:[0],
      WorkOrder:['',[Validators.required]],
      WorkActivity:['',[Validators.required]],
      WorkType:['',[Validators.required]],
      Work:['',[Validators.required]],
    });
    return wos;
  }
  get ISRWork():FormArray{
    return <FormArray>this.isrForm.get('ISRWORKS');
  }
  addwork(): void {
    this.ISRWork.push(this.buildisrwork(this.isrForm.controls.ISRUID.value));
  }
  removework(i: number) {
    const control = <FormArray>this.isrForm.controls['ISRWORKS'];
    control.removeAt(i);
  }

  getActiveWorkorders(){
    this.observableresinfo = this.isrService.getResourceInfo('802139')
    this.observableWorkorders = this.isrService.getworkorders();
    this.observableWorkactivities = this.isrService.getworkactivities();

  }
}
