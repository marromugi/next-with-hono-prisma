import { COOKIE_ID } from '@/const/cookie'
import { createApp, prisma } from '@/libs/hono'
import { z } from '@/libs/zod'
import { zValidator } from '@hono/zod-validator'
import { setCookie } from 'hono/cookie'
import { sign } from 'hono/jwt'

const app = createApp().post(
  '/',
  zValidator(
    'json',
    z.object({
      email: z.requiredString({}).email(),
      password: z.requiredString({})
    }),
    async (result, c) => {
      if (!result.success) {
        return c.json(
          {
            message: result.error
          },
          400
        )
      }
    }
  ),
  async (c) => {
    const { email, password } = c.req.valid('json')
    const user = await prisma.user.findUnique({
      where: {
        email,
        password
      },
      select: {
        userId: true,
        name: true
      }
    })

    if (!user) {
      return c.json({ message: 'invalid email and password' }, 401)
    }

    const token = await sign(
      {
        //iat: Math.round(Date.now() / 1000),
        exp: Math.round(Date.now() / 1000 + 60 * 60 * 24),
        data: { id: user.userId }
      },
      process.env.API_SECRET,
      'HS256'
    )

    setCookie(c, COOKIE_ID.accessToken, token, {
      //expires: new Date(Math.round(Date.now() + 60 * 60 * 24)),
      httpOnly: true,
      sameSite: 'lax',
      secure: true
    })

    return c.json({ message: `Hello, ${user.name}` }, 200)
  }
)

export default app
