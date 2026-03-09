export interface NPANXXUpload {
  sl:number;
  job: string;
  file: string;
  totalRows: number;
  startedAt: string;     
  finishedAt: string;    
  status: 'SUCCESS' | 'FAILED' ;
  inProdRowsCount: number;
  inStageRowsCount: number;
}