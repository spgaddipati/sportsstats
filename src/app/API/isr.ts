export interface IWORKORDER {
  id: number;
  WorkOrder:string;
}
export interface IWORKACTIVITY {
  id: number;
  WorkActivity:string;
}

export interface RESOURCE {
  id:number;
  PIN: string;
  NAME:string;
  WORKORDER:string;
  WORKACTIVITY:string;
  EMPLOYER:string;
  LEADER:string;
}

export class ICWISRSTATUSBYWO {
  ISRUID: number;
  WOID:number
  WeekendDate: string;
  Resource: string;
  Status: string;
  WorkOrder: string;
}

export class ISR {
  id: number = 0;
  ISRUID: number = 0;
  UserPIN: string
  WeekendDate: string;
  status: string;  
  ISRWORKS:ISRWORK[]
} 

export class ISRWORK{
  id:number =0;
  ISRUID: number;
  workorderid:number;
  WorkOrder: string;
  WorkActivity:string;
  WorkType:string;
  Work:string;
}
export class WSR {
  WSRUID: number = 0;
  WeekendDate: string;
  workorderid:number;
  WorkOrder: string;
  status: string;  
  WSRWORKS:WSRWORK[]
}
export class WSRWORK{
  id:number =0;
  WSRUID: number;
  WorkActivity:string;
  WorkType:string;
  Work:string;
}
export class WSRSTATUS{
  WSRUID:number;
  WEEKENDDATE:string;
  WORKORDER:string;
  WSRSTATUS:string
}