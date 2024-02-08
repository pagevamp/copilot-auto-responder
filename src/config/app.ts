const appConfig = {
  copilotApiKey: process.env.COPILOT_API_KEY || '',
  webhookSigningSecret: process.env.WEBHOOK_SIGNING_SECRET || '',
  apiUrl: `${process.env.VERCEL_ENV === 'development' ? 'http://' : 'https://'}${process.env.VERCEL_URL}`,
};

export default appConfig;
