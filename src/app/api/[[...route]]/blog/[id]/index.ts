import { createApp, prisma } from "@/libs/hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "@/libs/zod";

const app = createApp()
  .get(
    "/",
    zValidator(
      "param",
      z.object({
        id: z.requiredString({}),
      }),
      async (result, c) => {
        if (!result.success) {
          return c.json({ message: "id is not found" }, 400);
        }
      }
    ),
    async (c) => {
      try {
        const { id } = c.req.valid("param");
        const blog = await prisma.blog.findUnique({ where: { blogId: id } });

        if (!blog) {
          return c.json({ message: "not found" }, 404);
        }

        return c.json(
          {
            blog,
          },
          200
        );
      } catch (e) {
        console.error(e);
        return c.json({ message: "system error" }, 500);
      }
    }
  )
  .put(
    "/",
    zValidator(
      "param",
      z.object({
        id: z.requiredString({}),
      }),
      async (result, c) => {
        if (!result.success) {
          return c.json({ message: "id is not found" }, 400);
        }
      }
    ),
    zValidator(
      "json",
      z.object({
        title: z.requiredString({}),
        content: z.requiredString({}),
      }),
      async (result, c) => {
        if (!result.success) {
          return c.json({ message: "params error" }, 400);
        }
      }
    ),
    async (c) => {
      try {
        const { title, content } = c.req.valid("json");
        const { id } = c.req.valid("param");
        const blog = await prisma.blog.update({
          where: {
            blogId: id,
          },
          data: {
            title,
            content,
          },
        });

        if (!blog) {
          return c.json({ message: "not found" }, 404);
        }

        return c.json(
          {
            blog,
          },
          200
        );
      } catch (e) {
        console.error(e);
        c.json({ message: "system error" }, 500);
      }
    }
  );

export default app;
