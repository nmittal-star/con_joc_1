import { AccountGroups } from "../account-group.interface";

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
