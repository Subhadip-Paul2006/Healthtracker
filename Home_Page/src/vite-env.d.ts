/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ARTICLES_APP_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
