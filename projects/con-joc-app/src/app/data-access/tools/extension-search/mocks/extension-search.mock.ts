import { ExtensionSearch } from "../extension-search.interface";

export const extensionsearch :ExtensionSearch[] =[
  {
    "sl": 1,
    "extension": "1001",
    "cluster": "QA Cluster 01",
    "registration_server": "sip1.company.com",
    "account": "QA Automation Cluster 33 (105501)",
    "user": "john.doe"
  },
  {
    "sl": 2,
    "extension": "1002",
    "cluster": "QA Cluster 01",
    "registration_server": "sip2.company.com",
    "account": "QA Automation Cluster 33 (105501)",
    "user": "jane.smith"
  },
  {
    "sl": 3,
    "extension": "2001",
    "cluster": "Production Cluster A",
    "registration_server": "sip-prod.company.com",
    "account": "Main Production Account (200145)",
    "user": "michael.brown"
  },
  {
    "sl": 4,
    "extension": "3005",
    "cluster": "Support Cluster",
    "registration_server": "sip-support.company.com",
    "account": "Support Team Account (309876)",
    "user": "support.agent"
  }
]