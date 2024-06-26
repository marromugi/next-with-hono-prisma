# nextjs(App router) with hono and prisma(d1)

## technology stack

- [nextjs](https://github.com/vercel/next.js) (app router)
- [hono](https://github.com/honojs/hono)
  - [jwt](https://hono.dev/docs/middleware/builtin/jwt)(middleware)
  - [cors](https://hono.dev/docs/middleware/builtin/cors)(middleware)
  - [zod-validator](https://hono.dev/docs/guides/validation#with-zod)(middleware)
- [prisma](https://github.com/prisma/prisma)
- d1 (cloudflare)
- [zod](https://github.com/colinhacks/zod) (validation to both of frontend and backend)


## Setup

1. rewrite wrangler.toml to your project's info.

```toml
name = "{YOUR PROJECT NAME}"
compatibility_date = "2023-12-01"
compatibility_flags = ["nodejs_compat"] #WorkerでNode.jsのAPIを有効化するため

# [vars]
# MY_VAR = "my-variable"

# [[kv_namespaces]]
# binding = "MY_KV_NAMESPACE"
# id = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"

# [[r2_buckets]]
# binding = "MY_BUCKET"
# bucket_name = "my-bucket"

[[d1_databases]]
binding = "DB" # i.e. available in your Worker on env.DB
database_name = "{YOUR DB NAME}" # you can confirm about db in cloudflare dashboard.
database_id = "{YOUR DB ID}"

# [ai]
# binding = "AI"
```

2. run below commands
```
$ pnpm install

// generate client
$ npx prisma genearte

// migrate
$ npx prisma migrate diff --from-empty --to-schema-datamodel ./prisma/schema.prisma --script --output migrations/0000_create_user_table.sql\
$ npx wrangler d1 migrations apply {db-name} --local
$ npx wrangler d1 migrations apply {db-name} --remote
```

3. run project
```
pnpm dev
```


You can register user at `/admin/signup`, and sign in with the registered user.
