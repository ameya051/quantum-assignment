// Environment variable type definitions
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT?: string;
      NODE_ENV?: 'development' | 'production' | 'test';
      ALLOWED_ORIGINS?: string;
      DATABASE_URL?: string;
      DB_NAME?: string;
      JWT_SECRET: string;
      API_BASE_URL?: string;
    }
  }
}

export {};
