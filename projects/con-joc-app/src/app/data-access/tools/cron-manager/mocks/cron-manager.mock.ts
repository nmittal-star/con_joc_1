import { CronManager } from "../cron.manager.interface"

export const cronmanager:CronManager[]=[
  {
    "id": 1,
    "name": "Lead Drips",
    "scheduled_time": "NaN:NaN|NaN:NaN",
    "description": "Lead drips nightly run",
    "lastrun": "2026-02-26 12:58:32",
    "status": "ACTIVE"
  },
  {
    "id": 2,
    "name": "FTP Reports Push",
    "scheduled_time": "NaN:NaN",
    "description": "FTP Reports push",
    "lastrun": "2026-02-26 14:31:06",
    "status": "ACTIVE"
  },
  {
    "id": 3,
    "name": "FTP Recording Push",
    "scheduled_time": "NaN:NaN",
    "description": "FTP Recording Push",
    "lastrun": "2026-02-26 13:05:05",
    "status": "ACTIVE"
  }
]