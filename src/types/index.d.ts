declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production";
      API_BASE_URL: string;
    }
  }
}

export {};
