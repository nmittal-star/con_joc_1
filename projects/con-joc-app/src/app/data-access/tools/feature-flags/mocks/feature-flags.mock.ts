import { FeatureFlag } from "../feature-flags.interface"

export const featureflags:FeatureFlag[]=[
  {
    "sl": 1,
    "flag": "advanced-analytics",
    "deployed_on": "6 months ago",
    "accounts_deployed": [
      { "account_id": 103065, "account_name": "Dev Test Account C06" },
      { "account_id": 108120, "account_name": "Condes Enterprise" },
      { "account_id": 105027, "account_name": "QA Test Account Cluster 03-3" },
      { "account_id": 105083, "account_name": "TINA New Billing Live Zoura" },
      { "account_id": 104533, "account_name": "Tech Writer Test Account" }
    ]
  },
  {
    "sl": 2,
    "flag": "agent-success-rate-routing",
    "deployed_on": "2 months ago",
    "accounts_deployed": [
      { "account_id": 108070, "account_name": "C15-QA-Nidhi" },
      { "account_id": 107584, "account_name": "Baseline Certification Cluster 05" },
      { "account_id": 104533, "account_name": "Tech Writer Test Account" }
    ]
  },
  {
    "sl": 3,
    "flag": "call-intelligence",
    "deployed_on": "Just now",
    "accounts_deployed": [
      { "account_id": 108480, "account_name": "qa_c3_test_account staging" },
      { "account_id": 107275, "account_name": "Call Qualifiers LLC 2" },
      { "account_id": 104533, "account_name": "Tech Writer Test Account" }
    ]
  },
  {
    "sl": 4,
    "flag": "google-sso",
    "deployed_on": "4 months ago",
    "accounts_deployed": [
      { "account_id": 108430, "account_name": "Thrive Insurance Partners" },
      { "account_id": 105795, "account_name": "TRR QA Test Account C23-3" },
      { "account_id": 104533, "account_name": "Tech Writer Test Account" }
    ]
  },
  {
    "sl": 5,
    "flag": "hyperdrive",
    "deployed_on": "Just now",
    "accounts_deployed": [
      { "account_id": 105851, "account_name": "Morning Test C37" },
      { "account_id": 108756, "account_name": "Salesforce Sandbox Account" },
      { "account_id": 104533, "account_name": "Tech Writer Test Account" }
    ]
  }
]