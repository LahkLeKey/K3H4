import { cp, mkdir, rm, stat, readdir } from 'node:fs/promises'
import { watchFile } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import * as dotenv from 'dotenv'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const outdir = path.join(root, 'dist')
const port = 5173

dotenv.config({ path: path.join(root, '.env') })
const env = process.env

// Force polling-based watchers for host bind mounts (Windows/macOS) so changes are observed inside Docker
env.BUN_WATCHER_USE_POLLING ??= '1'
env.BUN_WATCHER_POLL_INTERVAL ??= '500'
env.CHOKIDAR_USEPOLLING ??= '1'
env.CHOKIDAR_INTERVAL ??= '500'

console.log('[web dev] API_URL=', env.API_URL, 'GITHUB_CLIENT_ID=', env.GITHUB_CLIENT_ID)

async function cleanDist() {
  await rm(outdir, { recursive: true, force: true })
}

async function copyStatic() {
  await mkdir(outdir, { recursive: true })
  const htmlSource = await Bun.file(path.join(root, 'index.html')).text()
  const inject = `<script>window.__API_URL__=${JSON.stringify(env.API_URL || 'http://localhost:3001')};window.__GITHUB_CLIENT_ID=${JSON.stringify(env.GITHUB_CLIENT_ID || '')};</script>`
  const htmlWithEnv = htmlSource.replace('</head>', `${inject}</head>`) || `${inject}${htmlSource}`
  await Bun.write(path.join(outdir, 'index.html'), htmlWithEnv)

  try {
    await cp(path.join(root, 'public'), outdir, { recursive: true })
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error
  }
}

function watchStatic() {
  const htmlPath = path.join(root, 'index.html')
  watchFile(htmlPath, { interval: Number(env.CHOKIDAR_INTERVAL) || 500 }, () => {
    void copyStatic()
  })

  // Fallback polling watcher for public assets; fs.watch recursive can miss changes on mounted volumes
  const publicPath = path.join(root, 'public')
  watchFile(publicPath, { interval: Number(env.CHOKIDAR_INTERVAL) || 500 }, () => {
    void copyStatic()
  })
}

async function snapshotMtime(dir: string, ignore: Set<string>): Promise<number> {
  let latest = 0
  const entries = await readdir(dir, { withFileTypes: true })
  for (const entry of entries) {
    if (ignore.has(entry.name)) continue
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      latest = Math.max(latest, await snapshotMtime(full, ignore))
    } else {
      try {
        const info = await stat(full)
        latest = Math.max(latest, info.mtimeMs)
      } catch (error) {
        if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error
      }
    }
  }
  return latest
}

async function buildCss() {
  const stylesPath = path.join(outdir, 'styles.css')
  const tailwind = Bun.spawn({
    cmd: [
      'bun',
      'x',
      'tailwindcss',
      '-i',
      path.join(root, 'src', 'index.css'),
      '-o',
      stylesPath,
      '--config',
      path.join(root, 'tailwind.config.ts'),
    ],
    cwd: root,
    stdout: 'inherit',
    stderr: 'inherit',
  })

  const exitCode = await tailwind.exited
  if (exitCode !== 0) {
    console.error('Tailwind one-off build failed')
    process.exit(exitCode ?? 1)
  }
}

function startCssWatcher() {
  const stylesPath = path.join(outdir, 'styles.css')
  const tailwind = Bun.spawn({
    cmd: [
      'bun',
      'x',
      'tailwindcss',
      '-i',
      path.join(root, 'src', 'index.css'),
      '-o',
      stylesPath,
      '--watch',
      '--poll',
      '--config',
      path.join(root, 'tailwind.config.ts'),
    ],
    cwd: root,
    stdout: 'inherit',
    stderr: 'inherit',
  })

  const teardown = () => tailwind.kill()
  process.on('exit', teardown)
  process.on('SIGINT', () => {
    teardown()
    process.exit()
  })
  process.on('SIGTERM', () => {
    teardown()
    process.exit()
  })

  return tailwind
}

async function start() {
  await cleanDist()
  await copyStatic()
  await buildCss()
  watchStatic()
  startCssWatcher()

  const buildOptions = {
    entrypoints: [path.join(root, 'src', 'main.tsx')],
    outdir,
    sourcemap: 'inline',
    minify: false,
    target: 'browser',
    format: 'esm',
    splitting: true,
    publicPath: '/',
    tsconfig: path.join(root, 'tsconfig.app.json'),
    loader: {
      '.svg': 'file',
    },
    define: {
      'import.meta.env.API_URL': JSON.stringify(env.API_URL || 'http://localhost:3001'),
      'import.meta.env.GITHUB_CLIENT_ID': JSON.stringify(env.GITHUB_CLIENT_ID || ''),
    },
    watch: {
      onRebuild(result: Awaited<ReturnType<typeof Bun.build>>) {
        if (result.success) {
          console.log('Rebuilt client bundle (watch)')
          return
        }

        console.error('Rebuild failed (watch):')
        for (const log of result.logs) {
          console.error(log.message)
        }
      },
    },
  } as const

  let building = false
  async function runBuild(label: string) {
    if (building) return
    building = true
    const result = await Bun.build(buildOptions as any)
    building = false
    if (!result.success) {
      console.error(`Rebuild failed (${label}):`)
      for (const log of result.logs) console.error(log.message)
      return
    }
    console.log(`Rebuilt client bundle (${label})`)
  }

  const initialBuild = await Bun.build(buildOptions as any)

  if (!initialBuild.success) {
    for (const log of initialBuild.logs) {
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

  // Polling fallback: detect file changes via mtime and trigger rebuild if the native watcher misses
  const watchRoots = [path.join(root, 'src'), path.join(root, 'public'), path.join(root, 'index.html')]
  const ignore = new Set(['node_modules', 'dist', '.git'])
  let lastSig = 0
  const intervalMs = Number(env.WATCH_POLL_INTERVAL || env.BUN_WATCHER_POLL_INTERVAL || 1000)

  async function computeSignature() {
    let latest = 0
    for (const dir of watchRoots) {
      try {
        const info = await stat(dir)
        if (info.isDirectory()) {
          latest = Math.max(latest, await snapshotMtime(dir, ignore))
        } else {
          latest = Math.max(latest, info.mtimeMs)
        }
      } catch (error) {
        if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error
      }
    }
    return latest
  }

  lastSig = await computeSignature()
  setInterval(async () => {
    const sig = await computeSignature()
    if (sig > lastSig) {
      lastSig = sig
      console.log('Detected change via polling; triggering rebuild')
      await runBuild('poll')
    }
  }, intervalMs)
}

start()
