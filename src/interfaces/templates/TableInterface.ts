export interface Column {
    key:string;
    label:string;
}

export interface ColumnDefinition<T>{
    key: keyof T;
    label: string;
    width?: string;
}
