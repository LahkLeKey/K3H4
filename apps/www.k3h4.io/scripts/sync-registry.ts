import { mkdir, readFile, readdir, writeFile } from "node:fs/promises"
import path from "node:path"

type ItemFile = {
  name: string
  type: string
  path: string
  content: string
}

type RegistryItem = {
  name: string
  type: string
  dependencies?: Record<string, string>
  devDependencies?: Record<string, string>
  registryDependencies?: string[]
  tailwind?: {
    config?: string[]
    css?: string[]
    baseColor?: string
    cssVariables?: boolean
  }
  files: ItemFile[]
}

const root = path.resolve(path.join(import.meta.dirname, ".."))
const componentsDir = path.join(root, "@", "components", "ui")
const registryDir = path.join(root, "registry", "k3h4")

async function readComponentFiles(name: string): Promise<ItemFile[]> {
  const filePath = path.join(componentsDir, `${name}.tsx`)
  const content = await readFile(filePath, "utf8")
  return [
    {
      name: `${name}.tsx`,
      type: "registry:ui",
      path: path.posix.join("@/components/ui", `${name}.tsx`),
      content,
    },
  ]
}

async function buildItem(name: string): Promise<RegistryItem> {
  const files = await readComponentFiles(name)
  return {
    name,
    type: "registry:ui",
    files,
  }
}

async function main() {
  await mkdir(registryDir, { recursive: true })

  const entries = await readdir(componentsDir)
  const items: RegistryItem[] = []

  for (const entry of entries) {
    if (!entry.endsWith(".tsx")) continue
    const name = entry.replace(/\.tsx$/, "")
    items.push(await buildItem(name))
  }

  for (const item of items) {
    const outPath = path.join(registryDir, `${item.name}.json`)
    await writeFile(outPath, JSON.stringify(item, null, 2), "utf8")
  }

  console.log(`Wrote ${items.length} registry items to ${registryDir}`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
