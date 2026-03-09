
import { ReleaseLogs } from "../release-logs.interface";

export const releaselogs: ReleaseLogs[] =[
  {
    "sl": 1,
    "id": 1001,
    "type": "Major",
    "notes": "Introduced new dashboard layout and performance improvements.",
    "tickets": "JIRA-245, JIRA-246",
    "feature": "Dashboard Revamp",
    "createdat": 1708502400000,
    "publishedat": "2026-02-20T08:30:00Z"
  },
  {
    "sl": 2,
    "id": 1002,
    "type": "Minor",
    "notes": "Bug fixes for login validation and session timeout handling.",
    "tickets": "JIRA-251",
    "feature": null,
    "createdat": 1708588800000,
    "publishedat": "2026-02-21T10:00:00Z"
  },
  {
    "sl": 3,
    "id": 1003,
    "type": "Patch",
    "notes": "Fixed UI alignment issue on mobile devices.",
    "tickets": "JIRA-260, JIRA-262",
    "feature": "Mobile UI Fix",
    "createdat": 1708675200000,
    "publishedat": "2026-02-22T12:15:00Z"
  }
]