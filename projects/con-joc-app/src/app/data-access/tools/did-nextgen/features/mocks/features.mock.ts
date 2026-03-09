import { FeatureSetting } from "../features.interface"

export const featuresettings:FeatureSetting[]=[
  {
    "sl": 1,
    "value": "frequency_cap",
    "name": "Frequency Cap",
    "description": "Needs approval by product and engineering to change.",
    "settings": {
      "duration": 30
    }
  },
  {
    "sl": 2,
    "value": "health_score",
    "name": "Health Score",
    "description": "Needs approval by product and engineering to change.",
    "settings": {
      "min": 40,
      "carrier_specific": "Y",
      "algorithm": "contact_rate",
      "avg_use": "campaign"
    }
  },
  {
    "sl": 3,
    "value": "ab_testing",
    "name": "A/B Testing",
    "description": "Allows testing of multiple ACIDs on a single campaign",
    "settings": {
      "acid_lists": [
        { "id": 0, "ratio": 0 },
        { "id": 0, "ratio": 0 }
      ]
    }
  },
  {
    "sl": 4,
    "value": "resting_period",
    "name": "Underperforming DIDs Resting Period",
    "description": "Needs approval by product and engineering to change.",
    "settings": {
      "att": 0,
      "vz": 0,
      "tm": 0,
      "oth": 0,
      "tot": 0,
      "rnd_offset": 0
    }
  },
  {
    "sl": 5,
    "value": "expedited_scoring",
    "name": "Expedited Scoring",
    "description": "Needs approval by product and engineering to change.",
    "settings": {
      "min_dids_per_areacode": 10,
      "x": 50,
      "y": 80,
      "z": 85
    }
  }
]