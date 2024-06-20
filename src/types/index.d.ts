declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB: D1Database
      API_SECRET: string
      API_PASSWORD_HASH_COUNT: string
    }
  }
}
