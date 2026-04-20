/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_HOME_PAGE_ORIGIN?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
