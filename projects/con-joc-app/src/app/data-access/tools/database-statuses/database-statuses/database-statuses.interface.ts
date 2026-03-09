export interface DatabaseStatuses {
  sl:number
  id: number;
  clusterName:string;
  serverIp: string;
  port: number;
  secondsBehind: number;
  lastUpdated: string; 
  status: 'ONLINE' | 'OFFLINE';
  excluded: boolean;
}

