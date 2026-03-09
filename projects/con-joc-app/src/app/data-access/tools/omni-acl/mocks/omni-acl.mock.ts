import { OmniACL } from "../omni-acl.interface";


export const omniacl:OmniACL[]=[
  {
    "sl":1,
    "name": "Report",
    "section_name": "admin_report",
    "parent": null,
    "require_acl": true,
    "status": "ACTIVE"
  },
  {
    "sl":2,
    "name": "Account",
    "section_name": "Account",
    "parent": null,
    "require_acl": false,
    "status": "ACTIVE"
  },
  {
    "sl":3,
    "name": "Campaigns",
    "section_name": "admin_campaigns",
    "parent": null,
    "require_acl": false,
    "status": "ACTIVE"
  },
  {
    "sl":4,
    "name": "Campaign General Settings",
    "section_name": "admin_campaign_general",
    "parent": "Campaigns",
    "require_acl": false,
    "status": "ACTIVE"
  },
  {
    "sl":5,
    "name": "Campaign Outbound Settings",
    "section_name": "admin_campaign_outbound",
    "parent": "Campaigns",
    "require_acl": false,
    "status": "ACTIVE"
  }
]