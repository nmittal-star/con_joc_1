export interface Orders {
  id: number;
  account: string;
  orderType: string;
  numberType: string;
  total: number;
  dids: number;                // # DIDs
  processed: number;           // # Processed
  processing: number;          // # Processing
  errored: number;             // # Errored
  imports: number;             // # Imports
  date: string;                
  lastProcessed: string;       
  status: string;
  paymentStatus: string;
  percentage: number;          
  pendingPayment: number;      
  payment: string;             
}


export interface ViewOrders {
  id: number;
  isPaid: boolean | null;
  did: string;
  vendor: string;
  status: "ERROR" | "SUCCESS" | "PENDING";
  error?: string;
  replacedWith?: string | null;
  lastReplaceAttempt?: string | null;
 

}