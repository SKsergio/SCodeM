export interface ApiError {
  message: string;
  status: number;
  error?: Record<string, string[]>; // opcional, solo aparece en validaciones
}
