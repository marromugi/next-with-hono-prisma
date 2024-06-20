import { CustomJwtVariables, createApp, prisma } from '@/libs/hono'

const app = createApp().get('/', async (c) => {
  try {
    const {
      data: { id }
    } = c.get('jwtPayload') as CustomJwtVariables

    if (!id) {
      return c.json({ message: 'unauthorized' }, 401)
    }

    const user = await prisma.user.findUnique({
      where: {
        userId: id
      },
      select: {
        email: true,
        id: true,
        userId: true,
        name: true
      }
    })

    if (!user) {
      return c.json({ message: 'unauthorized' }, 401)
    }

    return c.json({ me: user }, 200)
  } catch (e) {
    console.error(e)
    return c.json({ message: 'system error' }, 500)
  }
})

export default app
