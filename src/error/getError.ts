import { ApiError } from '@/interfaces/ApiError';

export function getErrorMessage(error: ApiError | Error): string {
  if (error && "error" in error && error.error) {
    const allMessages: string[] = [];
    for (const field in error.error) {
      const messages = error.error[field];
      if (Array.isArray(messages)) {
        allMessages.push(...messages);
      }
    }
    if (allMessages.length > 0) {
      return allMessages.join("\n");
    }
  }

  if ("message" in error) {
    return error.message;
  }

  return "Ocurrió un error inesperado";
}
