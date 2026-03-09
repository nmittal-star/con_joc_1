export interface FeatureSetting {
  sl: number;
  value: string;
  name: string;
  description: string;
  settings: Record<string, any>;
}