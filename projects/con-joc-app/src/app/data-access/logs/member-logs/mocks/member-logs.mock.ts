
import { MemberLogs } from "../members-logs.interface";

export const memberlogs: MemberLogs[] =[
  {
    "sl": 1,
    "date": "2026-02-20T10:15:30Z",
    "ip_adress": "192.168.1.10",
    "section": "Profile",
    "subsection": "Personal Info",
    "modifiedby": 101,
    "id": 5001,
    "difference": "Updated firstName from 'John' to 'Jonathan'"
  },
  {
    "sl": 2,
    "date": "2026-02-21T14:22:10Z",
    "ip_adress": "192.168.1.15",
    "section": "Account",
    "subsection": null,
    "modifiedby": 102,
    "id": 5002,
    "difference": "Changed account status from 'Inactive' to 'Active'"
  },
  {
    "sl": 3,
    "date": "2026-02-22T09:05:45Z",
    "ip_adress": "10.0.0.25",
    "section": "Security",
    "subsection": "Password",
    "modifiedby": 103,
    "id": 5003,
    "difference": "Password reset requested"
  }
]