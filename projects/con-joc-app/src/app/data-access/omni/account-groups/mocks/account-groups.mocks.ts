import { AccountGroups, AccountgroupSettings, Impersonation } from "../account-group.interface";

export const accountgroups: AccountGroups[] =

[
  {
    "sl": 1,
    "id": 101,
    "name": "Admin Group",
    "description": "Group for system administrators",
    "accounts": 2,
    "impersonation": 2,
    "status": "ACTIVE",
    "creationDate": "2026-01-10T12:00:00Z"
  },
  {
    "sl": 2,
    "id": 102,
    "name": "Finance Team",
    "description": "Group for Finance System",
    "accounts": 1,
    "impersonation": 3,
    "status": "INACTIVE",
    "creationDate": "2025-11-05T08:30:00Z"
  },
  {
    "sl": 3,
    "id": 103,
    "name": "HR Department",
    "description": "Handles recruitment and payroll",
    "accounts": 1,
    "impersonation": 8,
    "status": "ACTIVE",
    "creationDate": "2026-02-01T09:15:00Z"
  },

]


export const settings:AccountgroupSettings[]=[
  {
    "sl": 1,
    "id": 1001,
    "name": "John Smith",
    "company_name": "TechNova Solutions",
    "customer_tier": "Gold",
    "active_seats": 120,
    "status": "Active",
    "billing": "Monthly",
    "sales_representive": "Rahul Sharma",
    "csm_representive": "Anita Verma",
    "cluster": "North America",
    "creation_date": "2025-01-12",
    "platform": "Web",
    "account_type": "Enterprise"
  },
  {
    "sl": 2,
    "id": 1002,
    "name": "Emily Davis",
    "company_name": "NextGen Analytics",
    "customer_tier": "Silver",
    "active_seats": 75,
    "status": "Active",
    "billing": "Yearly",
    "sales_representive": "Karthik Reddy",
    "csm_representive": "Priya Nair",
    "cluster": "Europe",
    "creation_date": "2024-11-03",
    "platform": "Mobile",
    "account_type": "Business"
  },
  {
    "sl": 3,
    "id": 1003,
    "name": "Michael Lee",
    "company_name": "CloudBridge Inc",
    "customer_tier": "Platinum",
    "active_seats": 200,
    "status": "Inactive",
    "billing": "Quarterly",
    "sales_representive": "Arjun Mehta",
    "csm_representive": "Sneha Kapoor",
    "cluster": "Asia",
    "creation_date": "2024-06-25",
    "platform": "Web",
    "account_type": "Enterprise"
  }
]


export const impersonation:Impersonation[]=[
  {
    "sl":1,
    "from_account":"104691 - Training Assessment Account",
    "from_user":"Training Assessment Do Not Change",
    "profile_1":'Super-Admin',
    "to_account":"104699 - Call Trader",
    "to_user":"	Gabe Bletnitsky",
    "profile_2":"Super-Admin"
    
  }
]