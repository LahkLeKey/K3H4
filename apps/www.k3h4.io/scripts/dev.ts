import { cp, mkdir, rm } from 'node:fs/promises'
import { watch } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const outdir = path.join(root, 'dist')
const port = 5173

async function cleanDist() {
  await rm(outdir, { recursive: true, force: true })
}

async function copyStatic() {
  await mkdir(outdir, { recursive: true })
  await Bun.write(path.join(outdir, 'index.html'), await Bun.file(path.join(root, 'index.html')).text())

  try {
    await cp(path.join(root, 'public'), outdir, { recursive: true })
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error
  }
}

function watchStatic() {
  watch(path.join(root, 'index.html'), () => {
    void copyStatic()
  })

  try {
    watch(path.join(root, 'public'), { recursive: true }, () => {
      void copyStatic()
    })
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error
  }
}

async function start() {
  await cleanDist()
  await copyStatic()
  watchStatic()

  const build = await Bun.build({
    entrypoints: [path.join(root, 'src', 'main.tsx')],
    outdir,
    sourcemap: 'inline',
    minify: false,
    target: 'browser',
    format: 'esm',
    splitting: true,
    publicPath: '/',
    loader: {
      '.svg': 'file',
    },
    watch: {
      onRebuild(result: Awaited<ReturnType<typeof Bun.build>>) {
        if (result.success) {
          console.log('Rebuilt client bundle')
          return
        }

        console.error('Rebuild failed:')
        for (const log of result.logs) {
          console.error(log.message)
        }
      },
    },
  } as any)

  if (!build.success) {
    for (const log of build.logs) {
      console.error(log.message)
    }
    process.exit(1)
  }

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

  console.log(`Dev server running at http://localhost:${server.port}`)
}

start()
