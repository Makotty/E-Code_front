/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FIREBASE_API_KEY: string
  readonly VITE_FIREBASE_AUTH_DOMAIN: string
  readonly VITE_FIREBASE_PROJECT_ID: string
  readonly VITE_FIREBASE_STORAGE_BUCKET: string
  readonly VITE_FIREBASE_MESSAGING_SENDER_ID: string
  readonly VITE_FIREBASE_APP_ID: string

  readonly VITE_S3_BUCKET: string
  readonly VITE_S3_REGION: string
  readonly VITE_S3_ACCESS_KEY: string
  readonly VITE_S3_SECRET_ACCESS_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
