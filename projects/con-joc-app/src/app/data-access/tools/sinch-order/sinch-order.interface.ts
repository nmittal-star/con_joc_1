export interface SinchOrderQueue {
sl:number
  id: number;
  account_id: number;
  action: 'MESSAGING_CAMPAIGN_ADD' | 'MESSAGING_CAMPAIGN_REMOVE';
  vendor_order_id?: string;          
  campaign_registry_id?: string;     
  dids: string[];                    
  payload?: any;                    
  response?: any;                    
  status: 'PENDING' | 'SUCCESS' | 'FAILED';
  retry_count: number;
  created_at: string;                
  updated_at: string;  

}