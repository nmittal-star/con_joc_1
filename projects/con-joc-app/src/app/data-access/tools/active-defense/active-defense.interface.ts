export interface ActiveDefenseAccounts {
  sl: number;
  id: number;
  min_dial_level: number;
  throttle_percentage: number;
  throttle_duration: number;
  trigger_percentage: number;
  trigger_duration: number;
  created_at: string; 
  enabled: boolean;
}