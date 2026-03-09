import { NPANXXUpload } from "../npanxx-upload.interface"

export const npanxxupload:NPANXXUpload[]=[
  {
    "sl":1,
    "job": "ImportCustomers",
    "file": "customers_2026_02_25.csv",
    "totalRows": 12000,
    "startedAt": "2026-02-25 10:15:22",
    "finishedAt": "2026-02-25 10:18:45",
    "status": "SUCCESS",
    "inProdRowsCount": 11890,
    "inStageRowsCount": 12000
  },
  {
    "sl":2,
    "job": "ImportOrders",
    "file": "orders_2026_02_25.csv",
    "totalRows": 8450,
    "startedAt": "2026-02-25 11:00:10",
    "finishedAt": "2026-02-25 11:04:30",
    "status": "SUCCESS",
    "inProdRowsCount": 8420,
    "inStageRowsCount": 8450
  },
  {
    "sl":3,
    "job": "ImportInvoices",
    "file": "invoices_2026_02_26.csv",
    "totalRows": 5600,
    "startedAt": "2026-02-26 09:20:15",
    "finishedAt": "",
    "status": "SUCCESS",
    "inProdRowsCount": 3200,
    "inStageRowsCount": 5600
  }
]