//abstrac interface to catalogues
export interface AbstractCatalog{
    readonly id:number;
    name:string;
    code:string;
    description?:string;
    readonly created_at:string;
    readonly updated_at:string
}

export interface DegreeInterface extends Omit<AbstractCatalog, 'description'> {} //interface to records of Degrees
export interface ClassromInterface extends Omit<AbstractCatalog, 'description'> {} //interface to records of Degrees
export interface PeriodInterface extends Omit<AbstractCatalog, 'description'> {
    date_from:string,
    date_until:string
} //interface to records of Periods
export interface SectionInterface extends AbstractCatalog {} //interface to records od Sections
export interface TypeEvaluationsInterface extends Omit<AbstractCatalog, 'description'> {} //interface to records of Degrees