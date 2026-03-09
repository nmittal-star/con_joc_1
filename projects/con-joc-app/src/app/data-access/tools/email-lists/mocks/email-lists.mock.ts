import { EmailLists } from "../email-lists.interface";

export const emaillists:EmailLists[]=[
  {
    "sl": 1,
    "id": 108,
    "handle": "TRR:_SIP_Code_DNIS_Block_Email_List",
    "name": "TRR: SIP Code DNIS Block Email List",
    "description": "Daily email alerts for SIP Code DNIS Blocking from Flagged CDRs"
  },
  {
    "sl": 2,
    "id": 106,
    "handle": "BYOT_EXPIRY_ALERT_EMAIL_LIST",
    "name": "BYOT EXPIRY ALERT EMAIL LIST",
    "description": "BYOT EXPIRY ALERT EMAIL LIST"
  },
  {
    "sl": 3,
    "id": 104,
    "handle": "JOC_Sinch__Queue_Processing_Error_Log",
    "name": "JOC_Sinch _Queue_Processing_Error_Log",
    "description": "This Email List will be notified everytime Sinch Order Processing Cron gets failed."
  },
  {
    "sl": 4,
    "id": 102,
    "handle": "Kpi_Aggregation_Failures",
    "name": "Kpi Aggregation Failures",
    "description": "Notification email to trigger errors when getting an exception while running aggregations"
  }
]