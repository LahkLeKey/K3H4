# K3H4 shadcn registry

This folder hosts our local shadcn/ui registry used to source UI primitives for this project.

## Structure
- `registry.json`: registry metadata (name, aliases, tailwind config paths).
- `*.json`: one file per component pulled from `@/components/ui`.

## Syncing components
Regenerate registry items from the current code:

```sh
bun run registry:sync
```

## Consuming the registry
Point the shadcn CLI at this directory (local path works):

```sh
bunx shadcn@latest add button --registry ./registry/k3h4
```

To add all components from this registry into another project, run:

```sh
bunx shadcn@latest add -a --registry ./registry/k3h4
```

## Updating components
Edit files in `@/components/ui`, then re-run `bun run registry:sync` to refresh the registry JSON.
