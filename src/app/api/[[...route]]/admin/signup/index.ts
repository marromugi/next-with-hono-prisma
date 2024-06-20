import { hashPassword } from "@/libs/bcrypto";
import { createApp, prisma } from "@/libs/hono";
import { z } from "@/libs/zod";
import { zValidator } from "@hono/zod-validator";

const app = createApp().post(
    "/",
    zValidator(
      "json",
      z.object({
        name: z.requiredString({}),
        email: z.requiredString({}),
        password: z.requiredString({}),
      }),
      async (result, c) => {
        if (!result.success) {
          return c.json({ message: "params error" }, 400);
        }
      }
    ),
    async (c) => {
      try {
        const { email, password, name } = c.req.valid("json");
        // TODO: メールでの検証等を入れる
        const user = await prisma.user.create({
          data: {
            userId: crypto.randomUUID(),
            name,
            email,
            password,
          },
          select: {
            id: true,
            userId: true,
            name: true
          },
        });

        return c.json(
          {
            id: user.id,
            userId: user.userId,
            name: user.name
          },
          200
        );
      } catch (e) {
        return c.json({ message: "system error" }, 500);
      }
    }
  );

export default app