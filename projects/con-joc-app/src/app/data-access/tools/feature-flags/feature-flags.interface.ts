export interface FeatureFlagAccount {
  account_id: number;
  account_name: string;
}

export interface FeatureFlag {
  sl: number;
  flag: string;
  accounts_deployed: FeatureFlagAccount[];
  deployed_on: string; 
}