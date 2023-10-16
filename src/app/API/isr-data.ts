import { InMemoryDbService } from 'angular-in-memory-web-api';
import { RESOURCE, ISR, IWORKORDER, IWORKACTIVITY, ICWISRSTATUSBYWO, WSR, WSRSTATUS } from './isr';

const workorders: IWORKORDER[] = [
  {
    id: 1,
    WorkOrder:'7.51-201'
  },
  {
    id: 2,
    WorkOrder:'7.51-202'
  },
  {
    id: 5,
    WorkOrder:'7.51-203'
  },
  {
    id: 8,
    WorkOrder:'7.51-204'
  },
  {
    id: 10,
    WorkOrder:'7.51-205'
  }
];
const workactivities: IWORKACTIVITY[] = [
  {
    id: 1,
    WorkActivity:'10'
  },
  {
    id: 2,
    WorkActivity:'20'
  },
  {
    id: 5,
    WorkActivity:'30'
  },
  {
    id: 8,
    WorkActivity:'40'
  },
  {
    id: 10,
    WorkActivity:'50'
  }
];
const isrs: ISR[] = [
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
    WeekendDate:'6/4/2023',
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
    WeekendDate: '6/4/2023',
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
];
const custstusbywo: ICWISRSTATUSBYWO[] = [
  {
    ISRUID: 1,
    WOID:8,
    WorkOrder: '7.51-204',
    WeekendDate: '03/12/2023',
    Resource: 'Siva Gaddipati',
    Status: 'Working'
  },
  {
    ISRUID: 2,
    WOID:8,
    WorkOrder: '7.51-204',
    WeekendDate: '03/12/2023',
    Resource: 'Elias Geisendorfer',
    Status: 'Submitted'
  },
  {
    ISRUID: 3,
    WOID:8,
    WorkOrder: '7.51-204',
    WeekendDate: '03/12/2023',
    Resource: 'John Doe',
    Status: 'Not Submitted'
  },
  {
    ISRUID: 4,
    WOID:10,
    WorkOrder: '7.51-205',
    WeekendDate: '03/12/2023',
    Resource: 'Siva Gaddipati',
    Status: 'Submitted'
  },
  {
    ISRUID: 5,
    WOID:10,
    WorkOrder: '7.51-205',
    WeekendDate: '03/12/2023',
    Resource: 'Michelle',
    Status: 'Submitted'
  },
  {
    ISRUID: 6,
    WOID:10,
    WorkOrder: '7.51-205',
    WeekendDate: '03/12/2023',
    Resource: 'Anderw',
    Status: 'Submitted'
  },
  {
    ISRUID: 7,
    WOID:10,
    WorkOrder: '7.51-205',
    WeekendDate: '03/12/2023',
    Resource: 'Jacob',
    Status: 'Not Started'
  }

]

const wsrs: WSR[] = [
  {
    WSRUID:1,
    WeekendDate: '6/4/2023',
    workorderid:8,
    WorkOrder: '',
    status:'Submitted',
    WSRWORKS:[
      {
        id:1,
        WSRUID:1,
        WorkActivity:'10',
        WorkType:'Meeting',
        Work:'<ul><li><p><strong>Performed no activities during this reporting period.</strong></p></li>'
      }
    ]
  },
  {

    WSRUID:2,
    WeekendDate: '6/4/2023',
    workorderid:1,
    WorkOrder: '',
    status:'Submitted',
    WSRWORKS:[
      {
        id:3,
        WSRUID:2,
        WorkActivity:'',
        WorkType:'',
        Work:''
      },
      {
        id:4,
        WSRUID:2,
        WorkActivity:'',
        WorkType:'',
        Work:''
      }

    ]
  },
  {

    WSRUID:3,
    WeekendDate: '6/4/2023' ,
    workorderid:1,
    WorkOrder: '',
    status:'Approved',
    WSRWORKS:[
      {
        id:5,
        WSRUID:3,
        WorkActivity:'',
        WorkType:'',
        Work:''
      },
      {
        id:6,
        WSRUID:3,
        WorkActivity:'',
        WorkType:'',
        Work:''
      }

    ]
  },
  {
    WSRUID:4,
    workorderid:8,
    WorkOrder: '7.51-204',
    WeekendDate:'6/4/2023',
    status:'Submitted',
    WSRWORKS:[
      {
        id:7,
        WSRUID:4,
        WorkActivity:'10',
        WorkType:'Development',
        Work:'<ul><li><p><span style=\"font-size:11.0pt;mso-bidi-font-size:10.0pt;\nline-height:120%;font-family:&quot;Times New Roman&quot;,serif;mso-ascii-theme-font:minor-latin;\nmso-fareast-font-family:SimSun;mso-hansi-theme-font:minor-latin;mso-ansi-language:\nEN-US;mso-fareast-language:EN-US;mso-bidi-language:AR-SA\">Analyzed the modified functional requirements document for Universal Text Identifier (UTI) PAY092 provided by the analyst to fix the incorrect date fill-in 5.</span></p></li></ul>'
      },
      {
        id:8,
        WSRUID:4,
        WorkActivity:'20',
        WorkType:'Development',
        Work:'<ul><li><p>Supported the Data Element Cluster (DEC) copybooks to M2-Master Beneficiary Record (MBR) copybook conversion:</p><ul><li><p class=\"Bullet2\" style=\"mso-list:l1 level2 lfo2\">Analyzed D2DV-MB-HITP group items in Copybook NOBENDEC and identified corresponding field names in copybook M2-MBR.</p></li></ul></li></ul><ul><li><p>Executed the following:</p><ul><li><p class=\"Bullet3\" style=\"mso-list:l1 level3 lfo2\">Automation script to verify Combined Exchange Record (CER) file requirements and record data exchanged with the Center for Medicare and Medicaid Services (CMS) generated by the Daily Update Data Exchange (DUDEX) program in the RD02 batch run</p></li><li><p class=\"Bullet3\" style=\"mso-list:l1 level3 lfo2\">Data generation utility to generate data tables for the missing cases in RD01</p></li></ul></li></ul>'
      }

    ]
  },
  {
    WSRUID:5,
    workorderid:10,
    WorkOrder: '7.51-205',
    WeekendDate: '6/4/2023',
    status:'Working',
    WSRWORKS:[
      {
        id:9,
        WSRUID:5,
        WorkActivity:'10',
        WorkType:'Meeting',
        Work:'<ul><li><p><strong>Performed no activities during this reporting period.</strong></p></li><li><p><span style=\"font-size:11.0pt;mso-bidi-font-size:10.0pt;\nline-height:120%;font-family:&quot;Times New Roman&quot;,serif;mso-ascii-theme-font:minor-latin;\nmso-fareast-font-family:SimSun;mso-hansi-theme-font:minor-latin;mso-ansi-language:\nEN-US;mso-fareast-language:EN-US;mso-bidi-language:AR-SA\">Analyzed the modified functional requirements document for Universal Text Identifier (UTI) PAY092 provided by the analyst to fix the incorrect date fill-in 5.</span></p></li></ul><ul><li><p>Executed the following:</p><ul><li><p class=\"Bullet3\" style=\"mso-list:l1 level3 lfo2\">Automation script to verify Combined Exchange Record (CER) file requirements and record data exchanged with the Center for Medicare and Medicaid Services (CMS) generated by the Daily Update Data Exchange (DUDEX) program in the RD02 batch run</p></li><li><p class=\"Bullet3\" style=\"mso-list:l1 level3 lfo2\">Data generation utility to generate data tables for the missing cases in RD01</p></li></ul></li></ul><ul><li><p>Supported the Data Element Cluster (DEC) copybooks to M2-Master Beneficiary Record (MBR) copybook conversion:</p><ul><li><p class=\"Bullet2\" style=\"mso-list:l1 level2 lfo2\">Analyzed D2DV-MB-HITP group items in Copybook NOBENDEC and identified corresponding field names in copybook M2-MBR.</p></li></ul></li></ul><ul><li><p>Executed the following:</p><ul><li><p class=\"Bullet3\" style=\"mso-list:l1 level3 lfo2\">Automation script to verify Combined Exchange Record (CER) file requirements and record data exchanged with the Center for Medicare and Medicaid Services (CMS) generated by the Daily Update Data Exchange (DUDEX) program in the RD02 batch run</p></li><li><p class=\"Bullet3\" style=\"mso-list:l1 level3 lfo2\">Data generation utility to generate data tables for the missing cases in RD01</p></li></ul></li></ul>'
      }
    ]
  }
];

const wsrstatus: WSRSTATUS[] = [
  {
    WSRUID:1,
    WEEKENDDATE: '3/5/2023',
    WORKORDER:'7.51-201',
    WSRSTATUS:'Working',
  },
  {
    WSRUID:2,
    WEEKENDDATE: '3/5/2023',
    WORKORDER:'7.51-202',
    WSRSTATUS:'Submitted',
  },
  {
    WSRUID:3,
    WEEKENDDATE: '3/5/2023',
    WORKORDER:'7.51-203',
    WSRSTATUS:'Processed',
  },
  {
    WSRUID:8,
    WEEKENDDATE: '3/5/2023',
    WORKORDER:'7.51-204',
    WSRSTATUS:'Working',
  },
  {
    WSRUID:10,
    WEEKENDDATE: '3/5/2023',
    WORKORDER:'7.51-205',
    WSRSTATUS:'Submitted',
  }
];

const resources: RESOURCE[]=[
  {
    id:1,
    PIN:'802139',
    NAME:'Siva P. Gaddipati',
    WORKORDER:'7.00-200',
    WORKACTIVITY:'94',
    EMPLOYER:'',
    LEADER:''
  },
  {
    id:2,
    PIN:'123456',
    NAME:'',
    WORKORDER:'',
    WORKACTIVITY:'',
    EMPLOYER:'',
    LEADER:''
  },
  {
    id:3,
    PIN:'564789',
    NAME:'',
    WORKORDER:'',
    WORKACTIVITY:'',
    EMPLOYER:'',
    LEADER:''
  },
  {
    id:4,
    PIN:'258963',
    NAME:'',
    WORKORDER:'',
    WORKACTIVITY:'',
    EMPLOYER:'',
    LEADER:''
  }
]
export class ISRData implements InMemoryDbService {
  createDb() {
    return { workorders, workactivities,resources, isrs, custstusbywo, wsrs, wsrstatus };
  }
}

