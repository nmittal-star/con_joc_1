export interface OmniACL {
    sl:number;
    name:string;
    section_name:string;
    parent:string | null;
    require_acl:boolean;
    status:string
}