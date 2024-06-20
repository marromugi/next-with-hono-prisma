import { ApiType } from '@/app/api/[[...route]]/route'
import { PrismaD1 } from '@prisma/adapter-d1'
import { PrismaClient } from '@prisma/client'
import { Hono } from 'hono'
import { hc } from 'hono/client'
import { JwtVariables } from 'hono/jwt'

type Bindings = {
  DB: D1Database
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB: D1Database
      API_SECRET: string
      API_PASSWORD_HASH_COUNT: string
    }
  }
}

export type CustomJwtVariables = { data: { id: string } }

// export const createPrisma = async <P extends string, I extends Input>(
//   context: Context<{ Bindings: Bindings }, P, I>
// ) => {
//   return new PrismaClient({ adapter: new PrismaD1(process.env.DB) });
// }

export const prisma = new PrismaClient({ adapter: new PrismaD1(process.env.DB) })

export const createApp = () => new Hono<{ Bindings: Bindings; Variables: JwtVariables }>()

export const client = hc<ApiType>('http://localhost:3000', {
  init: {
    credentials: 'include',
    mode: 'cors',
    cache: 'no-store'
  }
})

export const createClient = (
  options: { init?: RequestInit<CfProperties<unknown>>; headers?: Record<string, string> } = {}
) => {
  const init = options ? { ...options.init } ?? {} : {}
  const headers = options ? { ...options.headers } ?? {} : {}

  return hc<ApiType>('http://localhost:3000', {
    init: {
      credentials: 'include',
      mode: 'cors',
      cache: 'no-store',
      ...init
    },
    headers
  })
}
