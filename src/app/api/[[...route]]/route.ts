import { createApp } from '@/libs/hono'

import blog from './blog'
import blogId from './blog/[id]'
import adminSignup from './admin/signup'
import adminLogin from './admin/login'
import adminMe from './admin/me'

import cors from './__middleware__/cors'
import jwt from './__middleware__/jwt'

export const runtime = 'edge'

const app = createApp().basePath('/api')
const route = app
  .route('/*', cors)
  .route('/blog', blog)
  .route('/blog/:id', blogId)
  .route('/admin/signup', adminSignup)
  .route('/admin/login', adminLogin)
  .route('/admin/*', jwt)
  .route('/admin/me', adminMe)

export const GET = route.fetch
export const POST = route.fetch

export type ApiType = typeof route
