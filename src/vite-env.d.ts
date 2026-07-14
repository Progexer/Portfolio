/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** EmailJS Service ID — dashboard → Email Services */
  readonly VITE_EMAILJS_SERVICE_ID: string
  /** EmailJS Template ID — dashboard → Email Templates */
  readonly VITE_EMAILJS_TEMPLATE_ID: string
  /** EmailJS Public Key — dashboard → Account → General → API Keys */
  readonly VITE_EMAILJS_PUBLIC_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
