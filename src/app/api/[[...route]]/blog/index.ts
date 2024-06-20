import { createApp, prisma } from '@/libs/hono'
import { z } from '@/libs/zod'
import { zValidator } from '@hono/zod-validator'

const app = createApp()
  .get('/', async (c) => {
    try {
      const blogs = await prisma.blog.findMany({
        select: {
          title: true
        }
      })

      return c.json(
        {
          blogs
        },
        200
      )
    } catch (e) {
      console.error(e)
      return c.json({ message: 'system error' }, 500)
    }
  })
  .post(
    '/',
    zValidator(
      'json',
      z.object({
        title: z.requiredString({}),
        blogId: z.optionalString()
      }),
      async (result, c) => {
        if (!result.success) {
          return c.json({ message: 'params error' }, 400)
        }
      }
    ),
    async (c) => {
      try {
        const { title, blogId } = c.req.valid('json')
        const blog = await prisma.blog.create({
          data: {
            blogId: blogId ?? crypto.randomUUID(),
            title,
            content: 'コンテンツ'
          },
          select: {
            id: true,
            blogId: true
          }
        })

        return c.json(
          {
            blog
          },
          200
        )
      } catch (e) {
        c.json({ message: 'system error' }, 500)
      }
    }
  )

export default app
