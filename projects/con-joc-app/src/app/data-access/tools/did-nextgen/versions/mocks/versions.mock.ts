import { Version } from "../versions.interface"

export const versions:Version[]=[
  {
    "sl": 1,
    "version": "v1.0",
    "name": "Version 1.0",
    "description": "Frequency Cap Only",
    "active": true,
    "features": 'frequency_cap'
  },
  {
    "sl": 2,
    "version": "v2.0",
    "name": "Version 2.0",
    "description": "Frequency Cap + Health Score",
    "active": true,
    "features": "expedited_scoring"
  },
  {
    "sl": 3,
    "version": "v3.0",
    "name": "Version 3.0",
    "description": "Health Score Only",
    "active": true,
    "features": 'expedited_scoring'
  },
  {
    "sl": 4,
    "version": "v4.0",
    "name": "Version 4.0",
    "description": "A/B Testing",
    "active": true,
    "features": 'ab_testing'
  }
]