export interface AccountGroups{
     sl:number;
    id:number;
    name:string;
    description:string | null;
    accounts:number 
    impersonation:number;
    status:string;
    creationDate:string;

}


export interface AccountgroupSettings {
  sl: number;
  id: number | string;
  name: string;
  company_name: string;
  customer_tier: string;
  active_seats: number;
  status: string;
  billing: string;
  sales_representive: string;
  csm_representive: string;
  cluster: string;
  creation_date: string; 
  platform: string;
  account_type: string;
}



export interface Impersonation{
    sl:number;
    from_account:string;
    from_user:string;
    profile_1:string;
    to_account:string;
    to_user:string
    profile_2:string;
}