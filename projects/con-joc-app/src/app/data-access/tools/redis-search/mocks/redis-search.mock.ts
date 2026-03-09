import { RedisSearch } from "../redis-search.interface";

export const redissearch:RedisSearch[]=[
  {
    "sl": 1,
    "name": "session:1001",
    "time": "2026-02-26 10:15:30",
    "data": "{\"userId\":1001,\"status\":\"active\",\"ip\":\"192.168.1.10\"}"
  },
  {
    "sl": 2,
    "name": "cache:product:75",
    "time": "2026-02-26 10:18:42",
    "data": "{\"id\":75,\"name\":\"DID\",\"type\":\"Add On Services\"}"
  },
  {
    "sl": 3,
    "name": "auth:token:xyz123",
    "time": "2026-02-26 10:20:11",
    "data": "{\"token\":\"xyz123\",\"expiresIn\":3600,\"role\":\"admin\"}"
  },
  {
    "sl": 4,
    "name": "rate-limit:api:user1001",
    "time": "2026-02-26 10:22:05",
    "data": "{\"requests\":45,\"window\":\"1m\",\"blocked\":false}"
  }
]