//abstrac interface to catalogues
export interface AbstractCatalog{
    id:number;
    name:string;
    code:string;
    created_at:string;
    updated_at:string
}

export interface DegreeInterface extends AbstractCatalog {} //interface to records of Degrees
export interface SectionInterface extends AbstractCatalog {} //interface to records od Sections