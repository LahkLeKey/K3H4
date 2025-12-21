import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const outdir = path.join(root, 'dist')
const port = 4173

const server = Bun.serve({
  port,
  async fetch(req) {
    const url = new URL(req.url)
    let pathname = url.pathname

    if (pathname === '/') pathname = '/index.html'

    const filePath = path.join(outdir, pathname)
    const file = Bun.file(filePath)

    if (await file.exists()) return new Response(file)

    if (req.headers.get('accept')?.includes('text/html')) {
      const fallback = Bun.file(path.join(outdir, 'index.html'))
      if (await fallback.exists()) return new Response(fallback)
    }

    return new Response('Not found', { status: 404 })
  },
})

console.log(`Preview server running at http://localhost:${server.port}`)
