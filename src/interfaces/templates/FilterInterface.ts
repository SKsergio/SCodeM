export type FilterType = 'search' | 'date' | 'select'

export interface FilterConfig {
    type: FilterType
    key: string
    placeholder?: string
    options?: { label: string; value: any }[],
    param?: string
}