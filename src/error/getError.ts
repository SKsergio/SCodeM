export function getErrorMessage(error: any): string {
  const responseData = error.response?.data || error;

  if (responseData.erroresEspecificos && typeof responseData.erroresEspecificos === 'object') {
    const allMessages: string[] = [];
    for (const field in responseData.erroresEspecificos) {
      allMessages.push(`${field}: ${responseData.erroresEspecificos[field]}`);
    }
    if (allMessages.length > 0) {
      return allMessages.join("\n");
    }
  }
  if (responseData.mensaje) {
    return responseData.mensaje; // Aquí atrapará el error de "Los siguientes estudiantes..."
  }
  if (responseData.message) {
    return responseData.message; // Por si algún error de Spring viene en inglés
  }
  if (responseData.errorDetail) {
    return responseData.errorDetail;
  }
  // 4. Fallback estándar de JavaScript por si se cae el servidor o no hay internet
  if (error.message) {
    return error.message; 
  }
  return "Ocurrió un error inesperado";
}