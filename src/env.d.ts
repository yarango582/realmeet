/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WS_SERVER: string;
  // más variables de entorno...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
