import { createApp } from '@/libs/hono'
import { cors } from 'hono/cors'

export const app = createApp().use(
  '/',
  cors({
    origin: ['http://localhost:3000'],
    credentials: true
    // exposeHeaders: ['set-cookie']
    // allowHeaders: ['*'],
    // allowMethods: ['GET'],
    // maxAge: 60 * 60 * 24
  })
)

export default app
