import { useState } from 'react'
import { Bell, CheckCircle2, Mail, Menu } from 'lucide-react'

import { Section } from '../components/section'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion'
import { Alert, AlertDescription, AlertTitle } from '../components/ui/alert'
import { Avatar, AvatarFallback } from '../components/ui/avatar'
import { Badge } from '../components/ui/badge'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '../components/ui/breadcrumb'
import { Button } from '../components/ui/button'
import { ButtonGroup } from '../components/ui/button-group'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '../components/ui/card'
import { Checkbox } from '../components/ui/checkbox'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '../components/ui/dialog'
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '../components/ui/drawer'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '../components/ui/dropdown-menu'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '../components/ui/pagination'
import { Popover, PopoverContent, PopoverTrigger } from '../components/ui/popover'
import { Progress } from '../components/ui/progress'
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../components/ui/select'
import { Slider } from '../components/ui/slider'
import { Spinner } from '../components/ui/spinner'
import { Switch } from '../components/ui/switch'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '../components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { Textarea } from '../components/ui/textarea'
import { Toggle } from '../components/ui/toggle'
import { ToggleGroup, ToggleGroupItem } from '../components/ui/toggle-group'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../components/ui/tooltip'
import { Calendar } from '../components/ui/calendar'

export function UiComponentsPage() {
    const [marketingOptIn, setMarketingOptIn] = useState(true)
    const [radioValue, setRadioValue] = useState('driver')
    const [sliderValue, setSliderValue] = useState<number[]>([30])
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())

    return (
        <div className="space-y-6">
            <Section
                eyebrow="UI kit"
                title="Component scaffolds"
                description="Examples of the shared UI layer so every page has working body content."
                actions={
                    <Button variant="outline" className="gap-2">
                        <Menu className="h-4 w-4" />
                        Quick open
                    </Button>
                }
            />

            <Section title="Actions" description="Buttons, button groups, toggles, and badges.">
                <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-3">
                        <div className="flex flex-wrap items-center gap-2">
                            <Button>Primary</Button>
                            <Button variant="secondary">Secondary</Button>
                            <Button variant="outline">Outline</Button>
                            <Button variant="ghost">Ghost</Button>
                        </div>
                        <ButtonGroup className="gap-0">
                            <Button variant="outline">Left</Button>
                            <Button variant="outline">Center</Button>
                            <Button variant="outline">Right</Button>
                        </ButtonGroup>
                        <div className="flex flex-wrap items-center gap-2">
                            <Badge>New</Badge>
                            <Badge variant="secondary">Secondary</Badge>
                            <Badge variant="outline">Outline</Badge>
                        </div>
                    </div>
                    <div className="space-y-3">
                        <div className="flex flex-wrap items-center gap-2">
                            <Toggle aria-label="Bold">B</Toggle>
                            <Toggle aria-label="Italic">I</Toggle>
                            <Toggle aria-label="Underline">U</Toggle>
                        </div>
                        <ToggleGroup type="single" defaultValue="grid" aria-label="Layout">
                            <ToggleGroupItem value="list">List</ToggleGroupItem>
                            <ToggleGroupItem value="grid">Grid</ToggleGroupItem>
                            <ToggleGroupItem value="board">Board</ToggleGroupItem>
                        </ToggleGroup>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            <Spinner />
                            <span>Async actions in progress</span>
                        </div>
                    </div>
                </div>
            </Section>

            <Section title="Inputs" description="Form controls and selection primitives.">
                <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-3 rounded-xl border bg-background/70 p-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="you@k3h4.io" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="message">Message</Label>
                            <Textarea id="message" rows={3} placeholder="Context, goals, timeline" />
                        </div>
                        <div className="grid gap-3 sm:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="role">Role</Label>
                                <Select defaultValue="driver">
                                    <SelectTrigger id="role">
                                        <SelectValue placeholder="Select role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="driver">Driver</SelectItem>
                                        <SelectItem value="designer">Designer</SelectItem>
                                        <SelectItem value="founder">Founder</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="budget">Budget</Label>
                                <Input id="budget" type="number" min={0} placeholder="$50k" />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4 rounded-xl border bg-background/70 p-4">
                        <div className="flex items-center gap-3">
                            <Checkbox
                                id="marketing"
                                checked={marketingOptIn}
                                onCheckedChange={(value) => setMarketingOptIn(Boolean(value))}
                            />
                            <Label htmlFor="marketing">Send product updates</Label>
                        </div>
                        <div className="space-y-2">
                            <Label>Seniority</Label>
                            <RadioGroup value={radioValue} onValueChange={setRadioValue} className="flex flex-wrap gap-4">
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="driver" id="driver" />
                                    <Label htmlFor="driver">Driver</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="engineer" id="engineer" />
                                    <Label htmlFor="engineer">Engineer</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="ops" id="ops" />
                                    <Label htmlFor="ops">Ops lead</Label>
                                </div>
                            </RadioGroup>
                        </div>
                        <div className="flex items-center justify-between gap-4">
                            <div className="space-y-1">
                                <Label htmlFor="switch">Notifications</Label>
                                <p className="text-xs text-muted-foreground">Email + SMS</p>
                            </div>
                            <Switch id="switch" defaultChecked />
                        </div>
                        <div className="space-y-2">
                            <Label>Capacity</Label>
                            <Slider
                                value={sliderValue}
                                onValueChange={setSliderValue}
                                min={0}
                                max={100}
                                step={5}
                            />
                            <p className="text-xs text-muted-foreground">{sliderValue[0]}% utilization</p>
                        </div>
                    </div>
                </div>
            </Section>

            <Section title="Navigation" description="Breadcrumbs, tabs, and pagination.">
                <div className="space-y-4">
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="#">Home</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink href="#">Projects</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>UI kit</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>

                    <Tabs defaultValue="overview" className="w-full">
                        <TabsList>
                            <TabsTrigger value="overview">Overview</TabsTrigger>
                            <TabsTrigger value="activity">Activity</TabsTrigger>
                            <TabsTrigger value="files">Files</TabsTrigger>
                        </TabsList>
                        <TabsContent value="overview" className="rounded-xl border bg-background/70 p-4">
                            Recent rollouts and approvals.
                        </TabsContent>
                        <TabsContent value="activity" className="rounded-xl border bg-background/70 p-4">
                            Live events, outages, and alerts.
                        </TabsContent>
                        <TabsContent value="files" className="rounded-xl border bg-background/70 p-4">
                            Contracts, invoices, and uploads.
                        </TabsContent>
                    </Tabs>

                    <Pagination className="pt-2">
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious href="#" />
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#">1</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#" isActive>
                                    2
                                </PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#">3</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationNext href="#" />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            </Section>

            <Section title="Data display" description="Cards, tables, avatars, and progress.">
                <div className="grid gap-4 lg:grid-cols-2">
                    <Card className="border bg-background/70">
                        <CardHeader>
                            <CardTitle>Shipment health</CardTitle>
                            <CardDescription>Inline metrics pulled from the UI layer.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">On-time rate</span>
                                <Badge variant="secondary">98.4%</Badge>
                            </div>
                            <div className="space-y-2">
                                <Progress value={82} />
                                <p className="text-xs text-muted-foreground">82% of current loads tracked.</p>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Avatar className="h-8 w-8">
                                    <AvatarFallback>KH</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-medium text-foreground">Kyle Halek</p>
                                    <p className="text-xs text-muted-foreground">Ops owner</p>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-end gap-2">
                            <Button variant="outline">Export</Button>
                            <Button>Sync</Button>
                        </CardFooter>
                    </Card>

                    <div className="rounded-xl border bg-background/70 p-4">
                        <div className="flex items-center justify-between pb-3">
                            <p className="text-sm font-medium">Active accounts</p>
                            <Badge variant="outline" className="gap-1">
                                <CheckCircle2 className="h-4 w-4" />
                                Verified
                            </Badge>
                        </div>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Account</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Balance</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell>Operating</TableCell>
                                    <TableCell>Active</TableCell>
                                    <TableCell className="text-right">$218,430</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Payroll</TableCell>
                                    <TableCell>Limited</TableCell>
                                    <TableCell className="text-right">$64,010</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Reserve</TableCell>
                                    <TableCell>Active</TableCell>
                                    <TableCell className="text-right">$482,190</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </Section>

            <Section title="Overlays" description="Dropdowns, popovers, tooltips, dialogs, and drawers.">
                <div className="grid gap-4 lg:grid-cols-2">
                    <div className="flex flex-wrap items-center gap-3 rounded-xl border bg-background/70 p-4">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline">Menu</Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start">
                                <DropdownMenuLabel>Quick actions</DropdownMenuLabel>
                                <DropdownMenuItem>Share</DropdownMenuItem>
                                <DropdownMenuItem>Duplicate</DropdownMenuItem>
                                <DropdownMenuItem>Archive</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="outline">Popover</Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-64">
                                <p className="text-sm font-medium">Scheduling window</p>
                                <p className="text-xs text-muted-foreground">Pick a slot and notify the team.</p>
                            </PopoverContent>
                        </Popover>

                        <TooltipProvider delayDuration={150}>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                        <Bell className="h-4 w-4" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>Alerts are live</TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 rounded-xl border bg-background/70 p-4">
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button>Dialog</Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Ready to deploy?</DialogTitle>
                                    <DialogDescription>Review checks, approvals, and sign-offs.</DialogDescription>
                                </DialogHeader>
                                <DialogFooter className="justify-end gap-2">
                                    <Button variant="outline">Cancel</Button>
                                    <Button>Ship</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>

                        <Drawer>
                            <DrawerTrigger asChild>
                                <Button variant="outline">Drawer</Button>
                            </DrawerTrigger>
                            <DrawerContent>
                                <DrawerHeader>
                                    <DrawerTitle>Mobile-friendly shell</DrawerTitle>
                                    <DrawerDescription>Surface summaries or quick forms.</DrawerDescription>
                                </DrawerHeader>
                                <DrawerFooter className="gap-2">
                                    <DrawerClose asChild>
                                        <Button variant="outline">Dismiss</Button>
                                    </DrawerClose>
                                    <Button>Submit</Button>
                                </DrawerFooter>
                            </DrawerContent>
                        </Drawer>
                    </div>
                </div>
            </Section>

            <Section title="Content" description="Alerts, accordion details, and date selection.">
                <div className="grid gap-4 lg:grid-cols-2">
                    <div className="space-y-3 rounded-xl border bg-background/70 p-4">
                        <Alert>
                            <Mail className="h-4 w-4" />
                            <AlertTitle>Inbox connected</AlertTitle>
                            <AlertDescription>Messages will thread by customer and domain.</AlertDescription>
                        </Alert>
                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="item-1">
                                <AccordionTrigger>Notifications</AccordionTrigger>
                                <AccordionContent>Email, SMS, and webhooks.</AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-2">
                                <AccordionTrigger>Controls</AccordionTrigger>
                                <AccordionContent>Role-based overrides per tenant.</AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>

                    <div className="space-y-3 rounded-xl border bg-background/70 p-4">
                        <p className="text-sm font-medium">Calendar</p>
                        <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} className="rounded-md border" />
                        <p className="text-xs text-muted-foreground">
                            Selected: {selectedDate ? selectedDate.toLocaleDateString() : 'No date chosen'}
                        </p>
                    </div>
                </div>
            </Section>
        </div>
    )
}
