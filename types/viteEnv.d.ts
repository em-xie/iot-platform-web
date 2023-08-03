/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_API_URL: string;
  VITE_APP_BASE_API: string;
  VITE_MOCK_ENABLE: boolean;
  VITE_ROUTER_AUTOLOAD: boolean;
  VITE_PORT: number;
  VITE_GLOB_APP_TITLE: string;
  VITE_APP_CONTEXT_PATH: string;
}
