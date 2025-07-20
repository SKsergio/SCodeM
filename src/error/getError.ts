export function getErrorMessage(error:any): string {
    if (typeof error === 'object' && error !== null){
        const firstKey  = Object.keys(error)[0];
        if(firstKey && Array.isArray(error[firstKey])){
            return error[firstKey][0];
        }
    }
    return 'Ocurrio un error inesperado'
}