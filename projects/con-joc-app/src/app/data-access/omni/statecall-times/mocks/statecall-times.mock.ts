import { StateCall, StateCallHolidays } from "../statecall-times.interface";


export const statecall: StateCall[] = [
  {
    "sl": 1,
    "state": "California",
    "name": "Alabama 8am-8pm (No Sundays)",
    "startTime": "08:00 AM	",
    "endTime": "08:00 PM"
  },
  {
    "sl": 2,
    "state": "Texas",
    "name": "Conneticut 9am-8pm",
    "startTime": "09:00 AM	",
    "endTime": "08:00 PM"
  },
  {
    "sl": 3,
    "state": "New York",
    "name": "Florida 8am-8pm",
    "startTime": "08:00 AM	",
    "endTime": "08:00 PM"
  },
  {
    "sl": 4,
    "state": "Florida",
    "name": "ndiana 8pm restriction",
    "startTime": "09:00 AM	",
    "endTime": "08:00 PM"
  }
]

export const statecallholidays:StateCallHolidays[]=[
  {
    'sl':1,
    'date':'12/03/2026',
    'name':''
  },
   {
    'sl':2,
    'date':'19/03/2026',
    'name':''
  },
   {
    'sl':3,
    'date':'18/03/2026',
    'name':''
  }
]