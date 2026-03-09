export interface ProviderRates {
  id: number;
  name: string;
  rate_out_cents: number | null;
  rate_in_cents: number | null;
  rate_toll_free_out_cents: number | null;
  rate_toll_free_in_cents: number | null;
  rate_short_code_out_cents: number | null;
  rate_short_code_in_cents: number | null;
  unit_cost_name: string | null;
  unit_cost_cents: number | null;
  type: string;
  created_at: string; 
}