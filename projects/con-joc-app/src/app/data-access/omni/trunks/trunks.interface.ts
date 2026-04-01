export interface Trunk {
  id: number;
  trunkType: string;
  status: string;
  payType: string;
  unlimited: string;
  balance: number;
  allowedNegativeBalance: number;
  refillAmount: number;
  balanceBeforeRefill: number;
  rateCents: number;
  transactionRetry: number;
  minStartSeconds: number;
  incrementSeconds: number;
  dialPlan: string;
  mrmFundPercent: number;
}
