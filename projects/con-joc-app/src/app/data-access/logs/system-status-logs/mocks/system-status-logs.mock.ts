import { SystemStatusLogs } from "../system-status-logs.interface";

export const systemstatuslogs : SystemStatusLogs[] =[
  {
    "sl": 1,
    "id": 1001,
    "type": "Incident",
    "platform": "Web",
    "group": "Authentication",
    "notes": "Users unable to log in due to token validation failure.",
    "reason": "Expired SSL certificate on auth server.",
    "tickets": "INC-2026-00123",
    "suggestions": "Renew SSL certificate and implement auto-renewal monitoring.",
    "starttime": "2026-02-24T08:30:00Z",
    "endtime": "2026-02-24T10:15:00Z"
  },
  {
    "sl": 2,
    "id": 1002,
    "type": "Maintenance",
    "platform": "Mobile",
    "group": "Payments",
    "notes": "Scheduled database upgrade.",
    "reason": "Performance optimization and patch update.",
    "tickets": "CHG-2026-00456",
    "suggestions": null,
    "starttime": "2026-02-25T01:00:00Z",
    "endtime": "2026-02-25T03:30:00Z"
  }
]