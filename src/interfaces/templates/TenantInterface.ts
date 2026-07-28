export interface TenantResponse {
    id: number;
    name: string;
    nit: string;
    nrc: string;
    legalName: string;
    address: string;
    domainOrSlug?: string;
}

export interface TenantRequest{
    name: string;
    nit:string;
    nrc:string;
    legalName: string;
    address:string
}

export interface TenantSimpleResponse{
    id:number
    name:string
    nit:string
}

export interface userTenantSummaryDTO{
    tenantId: number,
    tenantName: string,
    roleName:string
}
   
