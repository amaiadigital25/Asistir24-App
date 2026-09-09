declare namespace Cloudflare {
  interface Env {
    DB?: D1Database;
    BUCKET?: R2Bucket;
    TWILIO_ACCOUNT_SID?: string;
    TWILIO_AUTH_TOKEN?: string;
    TWILIO_VERIFY_SERVICE_SID?: string;
    APP_ADMIN_PHONE?: string;
  }
}
