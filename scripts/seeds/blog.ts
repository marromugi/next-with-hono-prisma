const util = require('node:util')
const exec = util.promisify(require('node:child_process').exec)

const blogs = [
  {
    id: '1',
    blogId: 'blog-1',
    title: 'ブログ１',
    content: 'Hello,World!'
  },
  {
    id: '2',
    blogId: 'blog-2',
    title: 'ブログ２',
    content: 'Hello,World!'
  },
  {
    id: '3',
    blogId: 'blog-3',
    title: 'ブログ３',
    content: 'Hello,World!'
  }
]

async function run() {
  const promises = blogs.map(async (blog) => {
    try {
      // please replace {xxx} to your db name
      await exec(
        `npx wrangler d1 execute {xxx} --command "INSERT INTO  \"Blog\" (\"blogId\", \"title\", \"content\") VALUES  ('${blog.blogId}', '${blog.title}', '${blog.content}');" --remote`
      )
    } catch (error) {
      console.error(error)
    }
  })
  await Promise.all(promises)
}

run()
