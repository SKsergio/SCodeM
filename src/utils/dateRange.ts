export interface DateRange {
    startDate: string;
    endDate: string;
}

export const toLocalDate = (value?: string | null): Date | undefined => {
    if (!value) return undefined
    const [y, m, d] = value.split('-').map(Number)
    return new Date(y, m - 1, d)
}

export const isDateOutOfRange = (date?: string | null, range?: DateRange | null): boolean => {
    if (!date || !range) return false
    return date < range.startDate || date > range.endDate
}

export const isEndBeforeStart = (startDate?: string | null, endDate?: string | null): boolean => {
    return !!startDate && !!endDate && endDate < startDate
}

//devuelve el mensaje de error de las fechas o null si son validas (no valida que sean requeridas)
export const getDateRangeError = (
    startDate?: string | null,
    endDate?: string | null,
    range?: DateRange | null
): string | null => {
    if (range && (isDateOutOfRange(startDate, range) || isDateOutOfRange(endDate, range))) {
        return `Dates must be between ${range.startDate} and ${range.endDate}`
    }
    if (isEndBeforeStart(startDate, endDate)) {
        return 'End date cannot be earlier than start date'
    }
    return null
}
