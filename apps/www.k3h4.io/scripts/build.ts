import { cp, mkdir, rm } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const outdir = path.join(root, 'dist')

async function cleanDist() {
  await rm(outdir, { recursive: true, force: true })
}

async function copyStatic() {
  await mkdir(outdir, { recursive: true })
  const htmlSource = path.join(root, 'index.html')
  await Bun.write(path.join(outdir, 'index.html'), await Bun.file(htmlSource).text())

  try {
    await cp(path.join(root, 'public'), outdir, { recursive: true })
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error
  }
}

async function build() {
  await cleanDist()
  await copyStatic()

  const result = await Bun.build({
    entrypoints: [path.join(root, 'src', 'main.tsx')],
    outdir,
    sourcemap: true,
    minify: true,
    target: 'browser',
    format: 'esm',
    splitting: true,
    publicPath: '/',
    loader: {
      '.svg': 'file',
    },
  })

  if (!result.success) {
    for (const log of result.logs) {
      console.error(log.message)
    }
    process.exitCode = 1
    return
  }

  console.log(`Built client bundle to ${outdir}`)
}

build()
