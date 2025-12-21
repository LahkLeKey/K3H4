import { useState, type ReactNode } from 'react'
import { ArrowRight, Boxes, Layers, Sparkles } from 'lucide-react'

import { Avatar, AvatarFallback } from './components/ui/avatar'
import { Badge } from './components/ui/badge'
import { Button } from './components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card'
import { Checkbox } from './components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './components/ui/dropdown-menu'
import { Input } from './components/ui/input'
import { Label } from './components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select'
import { Separator } from './components/ui/separator'
import { Switch } from './components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs'
import { Textarea } from './components/ui/textarea'
import { MapBackground } from './components/ui/map-background'

type ComponentDemo = {
  id: string
  name: string
  summary: string
  render: ReactNode
}

const demos: ComponentDemo[] = [
  {
    id: 'buttons',
    name: 'Buttons & CTAs',
    summary: 'Primary, ghost, outline, and icon-first actions.',
    render: (
      <div className="flex flex-wrap items-center gap-3">
        <Button className="gap-2">
          <Sparkles className="h-4 w-4" /> Launch
        </Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
      </div>
    ),
  },
  {
    id: 'forms',
    name: 'Inputs & switches',
    summary: 'Form primitives composed with label, input, and switch.',
    render: (
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" placeholder="you@k3h4.io" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="role">Role</Label>
          <Select defaultValue="founder">
            <SelectTrigger id="role">
              <SelectValue placeholder="Choose role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="founder">Founder</SelectItem>
              <SelectItem value="designer">Designer</SelectItem>
              <SelectItem value="engineer">Engineer</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="notes">Notes</Label>
          <Textarea id="notes" placeholder="What should we build next?" rows={3} />
        </div>
        <div className="flex items-center gap-3 sm:col-span-2">
          <Switch id="notifications" defaultChecked />
          <Label htmlFor="notifications">Notify me when a component changes</Label>
        </div>
      </div>
    ),
  },
  {
    id: 'filters',
    name: 'Filters & chips',
    summary: 'Badges, checkbox filters, and inline toggles.',
    render: (
      <div className="flex flex-wrap items-center gap-3">
        <Badge variant="secondary" className="gap-2">
          <Boxes className="h-3.5 w-3.5" /> System
        </Badge>
        <Badge className="gap-2">
          <Layers className="h-3.5 w-3.5" /> Components
        </Badge>
        <div className="flex items-center gap-2 rounded-lg border p-3">
          <Checkbox id="dark" defaultChecked />
          <Label htmlFor="dark" className="text-sm">
            Dark-ready
          </Label>
        </div>
        <div className="flex items-center gap-2 rounded-lg border p-3">
          <Checkbox id="a11y" defaultChecked />
          <Label htmlFor="a11y" className="text-sm">
            A11y-first
          </Label>
        </div>
      </div>
    ),
  },
  {
    id: 'layout',
    name: 'Cards & content',
    summary: 'Card scaffolding with stacked header and content.',
    render: (
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Component velocity</CardTitle>
            <CardDescription>Ship faster with systems I build.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border px-3 py-2">
              <span className="text-sm text-muted-foreground">Patterns</span>
              <Badge>14</Badge>
            </div>
            <div className="flex items-center justify-between rounded-lg border px-3 py-2">
              <span className="text-sm text-muted-foreground">Tokens</span>
              <Badge variant="secondary">Themed</Badge>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Live preview</CardTitle>
            <CardDescription>Every component is interactive by default.</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center gap-4">
            <Avatar>
              <AvatarFallback>KH</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">Kyle Halek</p>
              <p className="text-sm text-muted-foreground">Product engineer · Design systems</p>
            </div>
          </CardContent>
        </Card>
      </div>
    ),
  },
]

function App() {
  const [selected, setSelected] = useState<string>(demos[0]?.id ?? 'buttons')

  return (
    <div className="relative min-h-screen text-foreground">
      <MapBackground className="fixed inset-0 -z-20 h-screen w-screen" />
      <div
        className="pointer-events-none fixed inset-0 -z-10 bg-gradient-to-b from-background/5 via-background/10 to-background/20"
        aria-hidden
      />

      <header className="sticky top-0 z-30 border-b bg-background/60 backdrop-blur border-[hsl(var(--foreground)/0.15)]">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 ring-1 ring-primary/30">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-muted-foreground">Kyle Halek</p>
              <p className="text-sm font-semibold">Product Engineer • Hastings, MN 55033</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  Explore
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Navigate</DropdownMenuLabel>
                <DropdownMenuItem asChild>
                  <a href="#components">Featured work</a>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <a href="mailto:hi@k3h4.io">Contact Kyle</a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <main className="mx-auto flex max-w-6xl flex-col gap-12 px-6 pb-16 pt-10">
        <section className="glass-surface grid gap-8 px-8 py-10" id="hero">
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <Badge variant="secondary" className="gap-2">
              <Sparkles className="h-3.5 w-3.5" /> Product engineer
            </Badge>
            <Separator orientation="vertical" className="h-6" />
            <span>Hastings, Minnesota • Building for the open web</span>
          </div>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="space-y-4">
              <h1 className="text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
                Kyle Halek — shipping resilient products.
              </h1>
              <p className="max-w-2xl text-lg text-muted-foreground">
                Full-stack product engineer blending design systems, delightful UX, and production-grade reliability. From Hastings, MN, building interfaces that stay fast and feel intentional.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button className="gap-2" asChild>
                  <a href="#components">
                    View featured work <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="mailto:hi@k3h4.io">Email Kyle</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6" id="components">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="space-y-1">
              <p className="text-sm uppercase tracking-[0.18em] text-muted-foreground">Featured work</p>
              <h2 className="text-2xl font-semibold">Live component playground</h2>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Badge variant="outline">Interactive</Badge>
              <Badge variant="secondary">Theme-aware</Badge>
            </div>
          </div>

          <Card id="components" className="glass-surface">
            <CardHeader className="space-y-4">
              <div className="flex flex-wrap items-center gap-4">
                <Tabs value={selected} onValueChange={setSelected} className="w-full">
                  <TabsList className="flex w-full flex-wrap justify-start gap-2 bg-background/40 backdrop-blur p-1 border rounded-xl border-[hsl(var(--foreground)/0.1)]">
                    {demos.map((demo) => (
                      <TabsTrigger key={demo.id} value={demo.id} className="data-[state=active]:bg-background">
                        {demo.name}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  {demos.map((demo) => (
                    <TabsContent key={demo.id} value={demo.id} className="mt-4">
                      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <div className="space-y-1">
                          <h3 className="text-lg font-semibold">{demo.name}</h3>
                          <p className="text-sm text-muted-foreground">{demo.summary}</p>
                        </div>
                        <Select value={selected} onValueChange={setSelected}>
                          <SelectTrigger className="w-[200px] bg-background/60 backdrop-blur border-[hsl(var(--foreground)/0.2)]">
                            <SelectValue placeholder="Choose component" />
                          </SelectTrigger>
                          <SelectContent>
                            {demos.map((option) => (
                              <SelectItem key={option.id} value={option.id}>
                                {option.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <Separator className="my-4" />
                      <div className="rounded-2xl border bg-background/60 backdrop-blur p-6 border-[hsl(var(--foreground)/0.12)]">
                        {demo.render}
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </div>
            </CardHeader>
          </Card>
        </section>

      </main>
    </div>
  )
}

export default App
