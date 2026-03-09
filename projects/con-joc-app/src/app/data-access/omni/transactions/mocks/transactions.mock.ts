import { Transactions } from "../transactions.interface";

export const transactions: Transactions[] = 
[
  {
    "sl": 1,
    "date": "2026-02-18T10:15:00Z",
    "amount": 120.50,
    "creditCard": "**** **** **** 1234",
    "transactionid": 1001,
    "subscriptionId": 501,
    "accountId": 301,
    "memo": "Monthly subscription payment"
  },
  {
    "sl": 2,
    "date": "2026-02-17T14:45:00Z",
    "amount": 75.00,
    "creditCard": "**** **** **** 5678",
    "transactionid": 1002,
    "subscriptionId": 502,
    "accountId": 302,
    "memo": "One-time purchase"
  },
  {
    "sl": 3,
    "date": "2026-02-16T09:30:00Z",
    "amount": 200.00,
    "creditCard": "**** **** **** 9012",
    "transactionid": 1003,
    "subscriptionId": 503,
    "accountId": 303,
    "memo": "Annual membership"
  },
  {
    "sl": 4,
    "date": "2026-02-15T11:20:00Z",
    "amount": 50.75,
    "creditCard": "**** **** **** 3456",
    "transactionid": 1004,
    "subscriptionId": 504,
    "accountId": 304,
    "memo": "Add-on service payment"
  }
]
