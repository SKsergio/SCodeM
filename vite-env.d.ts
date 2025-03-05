/// <reference types="vite/client" />

interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  
  interface ImportMetaEnv {
    readonly VITE_API_URL?: string;
    readonly BASE_URL: string;
    // Agrega otras variables de entorno que uses
  }
  