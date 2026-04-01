import { EmailLists } from "../email-lists.interface";

export const emaillists:EmailLists[]=[
  {
    "sl": 1,
    "id": 108,
    "handle": "TRR:_SIP_Code_DNIS_Block_Email_List",
    "name": "TRR: SIP Code DNIS Block Email List",
    "description": "Daily email alerts for SIP Code DNIS Blocking from Flagged CDRs",
    "prefixData":[{
      id:201,
      name:"John",
      email:"john123@gmail.com"

    },
    {
      id:202,
      name:"Jane",
      email:"jane123@gmail.com"

    },
  ]
  },
  {
    "sl": 2,
    "id": 106,
    "handle": "BYOT_EXPIRY_ALERT_EMAIL_LIST",
    "name": "BYOT EXPIRY ALERT EMAIL LIST",
    "description": "BYOT EXPIRY ALERT EMAIL LIST",
    "prefixData":[{
      id:901,
      name:"surya",
      email:"surya123@gmail.com"

    },
    {
      id:902,
      name:"don",
      email:"don123@gmail.com"

    },
  ]
  },
  {
    "sl": 3,
    "id": 104,
    "handle": "JOC_Sinch__Queue_Processing_Error_Log",
    "name": "JOC_Sinch _Queue_Processing_Error_Log",
    "description": "This Email List will be notified everytime Sinch Order Processing Cron gets failed.",
    "prefixData":[{
      id:829,
      name:"kumar",
      email:"kumar123@gmail.com"

    },
    {
      id:830,
      name:"divakar",
      email:"divakar123@gmail.com"

    },
  ]
  },
  {
    "sl": 4,
    "id": 102,
    "handle": "Kpi_Aggregation_Failures",
    "name": "Kpi Aggregation Failures",
    "description": "Notification email to trigger errors when getting an exception while running aggregations",
    "prefixData":[{
      id:180,
      name:"bhanu",
      email:"bhanu123@gmail.com"

    },
    {
      id:182,
      name:"krish",
      email:"krish123@gmail.com"

    },
  ]
  }
]