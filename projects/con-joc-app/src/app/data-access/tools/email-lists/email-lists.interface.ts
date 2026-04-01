export interface EmailLists {
    sl:number;
    id:number;
    handle:string;
    name:string;
    description:string;
     prefixData: pricePerPrefix['data'];
}


export interface pricePerPrefix {
    data: {
        id?: number;
        name?: string;
        email?: string;
        
    }[];
}