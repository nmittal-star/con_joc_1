export interface DNOToolsConfig {
    sl: number;
    name: string;
    requesting_entity: string;
    phone_number: string;
    status: 'active' | 'inactive';
    created_date: string;
    apply_to_sms: boolean;

}