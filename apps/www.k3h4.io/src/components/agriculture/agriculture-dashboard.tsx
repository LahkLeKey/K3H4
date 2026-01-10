import { useMemo, useState, type FormEvent, type ReactNode } from "react";

import { agricultureResourcesStore } from "../../stores/agriculture-resources-store";
import {
  useAgricultureAnalyticsQuery,
  useAgricultureInventoryQuery,
  useAgricultureOverviewQuery,
  useAgricultureResourcesQuery,
  useAgricultureTasksQuery,
  useAgriculturePlotsQuery,
  useCreateAgriculturePlot,
  useCreateAgricultureShipment,
  useCreateAgricultureTask,
} from "../../hooks/use-agriculture-queries";
import { trackTelemetry } from "../../lib/telemetry";
import { Section } from "../section";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

const apiBase = ((globalThis as any)?.__API_URL__ || (import.meta as any)?.API_URL || "http://localhost:3001").replace(/\/$/, "");

const shipmentModes = [
  { id: "road", label: "Road freight" },
  { id: "rail", label: "Rail" },
  { id: "air", label: "Air express" },
  { id: "sea", label: "Maritime" },
];

const formatDate = (value?: string | null) => {
  if (!value) return "—";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return "—";
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric" }).format(parsed);
};

const formatErrorMessage = (error?: unknown) =>
  error instanceof Error ? error.message : "Unable to load data.";

const getTaskBadgeVariant = (status: string) => {
  const normalized = status.toLowerCase();
  if (normalized.includes("complete")) return "success";
  if (normalized.includes("block")) return "destructive";
  return "secondary";
};

const getInventoryBadgeVariant = (status: string) => {
  const normalized = status.toLowerCase();
  if (normalized.includes("crit")) return "destructive";
  if (normalized.includes("low")) return "warning";
  if (normalized.includes("ok") || normalized.includes("good")) return "success";
  return "outline";
};

type FormFieldProps = {
  label: string;
  htmlFor?: string;
  description?: string;
  children: ReactNode;
};

const FormField = ({ label, htmlFor, description, children }: FormFieldProps) => (
  <div className="grid gap-1">
    <Label htmlFor={htmlFor} className="text-sm font-semibold text-muted-foreground">
      {label}
    </Label>
    {children}
    {description ? <p className="text-xs text-muted-foreground">{description}</p> : null}
  </div>
);

export function AgricultureDashboard() {
  const [plotName, setPlotName] = useState("");
  const [plotCrop, setPlotCrop] = useState("");
  const [plotAcres, setPlotAcres] = useState("12");
  const [taskTitle, setTaskTitle] = useState("");
  const [taskAssignee, setTaskAssignee] = useState("");
  const [taskStatus, setTaskStatus] = useState("pending");
  const [taskDueDate, setTaskDueDate] = useState("");
  const [shipmentLot, setShipmentLot] = useState("");
  const [shipmentDestination, setShipmentDestination] = useState("");
  const [shipmentMode, setShipmentMode] = useState(shipmentModes[0].id);
  const [shipmentEta, setShipmentEta] = useState("");

  const overviewQuery = useAgricultureOverviewQuery(apiBase);
  const analyticsQuery = useAgricultureAnalyticsQuery(apiBase);
  const resourcesQuery = useAgricultureResourcesQuery(apiBase);
  const tasksQuery = useAgricultureTasksQuery(apiBase);
  const inventoryQuery = useAgricultureInventoryQuery(apiBase);
  const plotsQuery = useAgriculturePlotsQuery(apiBase);

  const plotMutation = useCreateAgriculturePlot(apiBase);
  const taskMutation = useCreateAgricultureTask(apiBase);
  const shipmentMutation = useCreateAgricultureShipment(apiBase);

  const {
    searchTerm,
    activeCategory,
    setSearchTerm,
    setActiveCategory,
    resetFilters,
  } = agricultureResourcesStore.useShallow((state) => ({
    searchTerm: state.searchTerm,
    activeCategory: state.activeCategory,
    setSearchTerm: state.setSearchTerm,
    setActiveCategory: state.setActiveCategory,
    resetFilters: state.resetFilters,
  }));

  const categories = resourcesQuery.data?.categories ?? [];
  const filteredCategories = useMemo(() => {
    const normalizedTerm = searchTerm.trim().toLowerCase();
    return categories
      .map((category) => ({
        ...category,
        resources: category.resources.filter((resource) => {
          if (activeCategory && activeCategory !== category.id) {
            return false;
          }
          if (!normalizedTerm) {
            return true;
          }
          const haystack = [resource.title, resource.summary ?? "", ...(resource.tags ?? [])]
            .map((value) => value.toLowerCase())
            .join(" ");
          return haystack.includes(normalizedTerm);
        }),
      }))
      .filter((category) => category.resources.length > 0);
  }, [categories, activeCategory, searchTerm]);

  const resourceRows = useMemo(
    () =>
      filteredCategories.flatMap((category) =>
        category.resources.map((resource) => ({
          ...resource,
          categoryTitle: category.title,
        })),
      ),
    [filteredCategories],
  );

  const displayedPlots = (plotsQuery.data?.plots ?? []).slice(0, 8);
  const displayedTasks = (tasksQuery.data?.tasks ?? []).slice(0, 8);
  const displayedResources = resourceRows.slice(0, 8);
  const displayedInventory = (inventoryQuery.data?.inventory ?? []).slice(0, 6);

  const handleResourceSearch = (value: string) => {
    setSearchTerm(value);
    trackTelemetry("agriculture.resources.search", { term: value });
  };

  const handleResetResources = () => {
    resetFilters();
    trackTelemetry("agriculture.resources.resetFilters");
  };

  const planStats = [
    { label: "Plots", value: overviewQuery.data?.plots ?? "—", description: "Displaying acreage" },
    { label: "Tasks", value: overviewQuery.data?.tasks ?? "—", description: "Queued work orders" },
    { label: "Shipments", value: overviewQuery.data?.shipments ?? "—", description: "Outbound lots" },
  ];

  const planPhases = Object.entries(analyticsQuery.data?.planPhaseCounts ?? {});
  const taskStatusCounts = Object.entries(analyticsQuery.data?.taskStatusCounts ?? {});

  const handlePlanSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!plotName || !plotCrop) return;
    plotMutation.mutate(
      {
        name: plotName,
        crop: plotCrop,
        acres: Number(plotAcres) || 0,
      },
      {
        onSuccess: () => {
          setPlotName("");
          setPlotCrop("");
          setPlotAcres("12");
          trackTelemetry("agriculture.plot.created", { crop: plotCrop });
        },
      },
    );
  };

  const handleTaskSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!taskTitle) return;
    taskMutation.mutate(
      {
        title: taskTitle,
        assignee: taskAssignee || undefined,
        dueDate: taskDueDate || undefined,
        status: taskStatus,
      },
      {
        onSuccess: () => {
          setTaskTitle("");
          setTaskAssignee("");
          setTaskDueDate("");
          setTaskStatus("pending");
          trackTelemetry("agriculture.task.created", { status: taskStatus });
        },
      },
    );
  };

  const handleShipmentSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!shipmentLot || !shipmentDestination) return;
    shipmentMutation.mutate(
      {
        lot: shipmentLot,
        destination: shipmentDestination,
        mode: shipmentMode,
        eta: shipmentEta || undefined,
      },
      {
        onSuccess: () => {
          setShipmentLot("");
          setShipmentDestination("");
          setShipmentMode(shipmentModes[0].id);
          setShipmentEta("");
          trackTelemetry("agriculture.shipment.created", { mode: shipmentMode });
        },
      },
    );
  };

  return (
    <Section
      eyebrow="Agriculture"
      title="Field intelligence"
      description="Tables deliver a command-center feel—scan plots, tasks, and inventory like a live spreadsheet."
      actions={
        <Button variant="secondary" size="sm" onClick={() => trackTelemetry("agriculture.dashboard.refresh")}>
          Refresh data
        </Button>
      }
    >
      <Card className="space-y-4 bg-background/80 p-4 shadow-lg sm:p-6">
        <Tabs defaultValue="overview" className="w-full">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <TabsList className="flex-wrap gap-1">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="plots">Plots</TabsTrigger>
              <TabsTrigger value="tasks">Tasks</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
              <TabsTrigger value="inventory">Inventory</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="operations">Operations</TabsTrigger>
            </TabsList>
            <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Live tables</span>
          </div>

          <TabsContent value="overview" className="mt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Metric</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Notes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {overviewQuery.isLoading ? (
                  <TableRow>
                    <TableCell colSpan={3} className="text-muted-foreground">
                      Loading overview…
                    </TableCell>
                  </TableRow>
                ) : overviewQuery.isError ? (
                  <TableRow>
                    <TableCell colSpan={3} className="text-destructive">
                      {formatErrorMessage(overviewQuery.error)}
                    </TableCell>
                  </TableRow>
                ) : (
                  planStats.map((stat) => (
                    <TableRow key={stat.label}>
                      <TableCell className="font-semibold text-foreground">{stat.label}</TableCell>
                      <TableCell className="text-2xl font-semibold">{stat.value}</TableCell>
                      <TableCell className="text-xs uppercase tracking-[0.35em] text-muted-foreground">{stat.description}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
              <TableCaption>Top-level agriculture pulse.</TableCaption>
            </Table>
          </TabsContent>

          <TabsContent value="plots" className="mt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Plot</TableHead>
                  <TableHead>Crop · stage</TableHead>
                  <TableHead>Acres</TableHead>
                  <TableHead>Health</TableHead>
                  <TableHead>Last update</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {plotsQuery.isLoading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-muted-foreground">
                      Loading plots…
                    </TableCell>
                  </TableRow>
                ) : plotsQuery.isError ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-destructive">
                      {formatErrorMessage(plotsQuery.error)}
                    </TableCell>
                  </TableRow>
                ) : displayedPlots.length ? (
                  displayedPlots.map((plot) => (
                    <TableRow key={plot.id}>
                      <TableCell className="font-semibold text-foreground">{plot.name}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        <div>{plot.crop}</div>
                        <div className="text-xs uppercase tracking-[0.3em]">{plot.stage}</div>
                      </TableCell>
                      <TableCell>{plot.acres}</TableCell>
                      <TableCell>
                        <Badge variant="success">{plot.health}</Badge>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        {plot.latestCondition ? formatDate(plot.latestCondition.recordedAt) : "—"}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-muted-foreground">
                      No plots available yet. Use the operations tab to create one.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="tasks" className="mt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Task</TableHead>
                  <TableHead>Assignee</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Due</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tasksQuery.isLoading ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-muted-foreground">
                      Loading tasks…
                    </TableCell>
                  </TableRow>
                ) : tasksQuery.isError ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-destructive">
                      {formatErrorMessage(tasksQuery.error)}
                    </TableCell>
                  </TableRow>
                ) : displayedTasks.length ? (
                  displayedTasks.map((task) => (
                    <TableRow key={task.id}>
                      <TableCell className="font-semibold text-foreground">{task.title}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{task.assignee ?? "Unassigned"}</TableCell>
                      <TableCell>
                        <Badge variant={getTaskBadgeVariant(task.status)}>{task.status}</Badge>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">{formatDate(task.dueDate)}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-muted-foreground">
                      No tasks queued. Create one in the operations tab.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="resources" className="mt-4 space-y-3">
            <div className="flex flex-wrap gap-2">
              <Input
                className="w-full min-w-[220px]"
                placeholder="Search guides"
                value={searchTerm}
                onChange={(event) => handleResourceSearch(event.target.value)}
                aria-label="Search resource guides"
              />
              <Button size="sm" variant="ghost" onClick={handleResetResources}>
                Reset
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">
              <Button
                size="sm"
                variant={!activeCategory ? "default" : "ghost"}
                className="rounded-full px-3"
                onClick={() => setActiveCategory(null)}
              >
                All
              </Button>
              {categories.map((category) => (
                <Button
                  key={category.id}
                  size="sm"
                  variant={activeCategory === category.id ? "default" : "ghost"}
                  className="rounded-full px-3"
                  onClick={() => setActiveCategory(category.id === activeCategory ? null : category.id)}
                >
                  {category.title}
                </Button>
              ))}
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Resource</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>Tags</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {resourcesQuery.isLoading ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-muted-foreground">
                      Loading resources…
                    </TableCell>
                  </TableRow>
                ) : resourcesQuery.isError ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-destructive">
                      {formatErrorMessage(resourcesQuery.error)}
                    </TableCell>
                  </TableRow>
                ) : displayedResources.length ? (
                  displayedResources.map((resource) => (
                    <TableRow key={resource.id}>
                      <TableCell>
                        <a
                          className="text-sm font-semibold text-foreground transition hover:text-primary"
                          href={resource.url}
                          target="_blank"
                          rel="noreferrer"
                          onClick={() =>
                            trackTelemetry("agriculture.resources.open", {
                              resource: resource.title,
                              category: resource.categoryTitle,
                            })
                          }
                        >
                          {resource.title}
                        </a>
                        <p className="text-xs text-muted-foreground">{resource.summary}</p>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">{resource.categoryTitle}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{resource.source ?? "—"}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {(resource.tags ?? []).slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="outline">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-muted-foreground">
                      No resources match the current filters.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
              <TableCaption>
                {resourceRows.length} entries{resourceRows.length > displayedResources.length ? ` · showing top ${displayedResources.length}` : ""}
              </TableCaption>
            </Table>
          </TabsContent>

          <TabsContent value="inventory" className="mt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>SKU</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {inventoryQuery.isLoading ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-muted-foreground">
                      Loading inventory…
                    </TableCell>
                  </TableRow>
                ) : inventoryQuery.isError ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-destructive">
                      {formatErrorMessage(inventoryQuery.error)}
                    </TableCell>
                  </TableRow>
                ) : displayedInventory.length ? (
                  displayedInventory.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-semibold text-foreground">{item.sku}</TableCell>
                      <TableCell className="text-sm">
                        {item.totalQuantity} {item.unit}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">{item.location ?? "—"}</TableCell>
                      <TableCell>
                        <Badge variant={getInventoryBadgeVariant(item.status)}>{item.status}</Badge>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-muted-foreground">
                      Inventory is empty. Create movements via the operations tab.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="analytics" className="mt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Label</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Group</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {planPhases.length || taskStatusCounts.length ? (
                  <>
                    {planPhases.map(([phase, count]) => (
                      <TableRow key={`phase-${phase}`}>
                        <TableCell className="font-semibold text-foreground">{phase}</TableCell>
                        <TableCell>{count}</TableCell>
                        <TableCell className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Plan phase</TableCell>
                      </TableRow>
                    ))}
                    {taskStatusCounts.map(([status, count]) => (
                      <TableRow key={`status-${status}`}>
                        <TableCell className="font-semibold text-foreground">{status}</TableCell>
                        <TableCell>{count}</TableCell>
                        <TableCell className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Task status</TableCell>
                      </TableRow>
                    ))}
                  </>
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} className="text-muted-foreground">
                      Analytics pending. Activity will populate these counts.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
              <TableCaption>Phase and status distributions.</TableCaption>
            </Table>
          </TabsContent>

          <TabsContent value="operations" className="mt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[180px]">Flow</TableHead>
                  <TableHead>Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-semibold text-foreground">Schedule plot</TableCell>
                  <TableCell>
                    <form className="grid gap-3 sm:grid-cols-3" onSubmit={handlePlanSubmit}>
                      <FormField label="Plot name" htmlFor="plot-name">
                        <Input id="plot-name" value={plotName} onChange={(event) => setPlotName(event.target.value)} placeholder="Field 42" />
                      </FormField>
                      <FormField label="Crop" htmlFor="plot-crop">
                        <Input id="plot-crop" value={plotCrop} onChange={(event) => setPlotCrop(event.target.value)} placeholder="Organic wheat" />
                      </FormField>
                      <FormField label="Acres" htmlFor="plot-acres">
                        <Input
                          id="plot-acres"
                          type="number"
                          min={1}
                          value={plotAcres}
                          onChange={(event) => setPlotAcres(event.target.value)}
                        />
                      </FormField>
                      <div className="sm:col-span-3 flex justify-end">
                        <Button type="submit" size="sm" variant="secondary" disabled={plotMutation.isPending}>
                          Schedule plot
                        </Button>
                      </div>
                    </form>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-semibold text-foreground">Create task</TableCell>
                  <TableCell>
                    <form className="grid gap-3 sm:grid-cols-2" onSubmit={handleTaskSubmit}>
                      <FormField label="Title" htmlFor="task-title" description="Tickets feed into crew standups.">
                        <Input id="task-title" value={taskTitle} onChange={(event) => setTaskTitle(event.target.value)} placeholder="Inspect orchard" />
                      </FormField>
                      <FormField label="Assignee" htmlFor="task-assignee">
                        <Input id="task-assignee" value={taskAssignee} onChange={(event) => setTaskAssignee(event.target.value)} placeholder="Field lead" />
                      </FormField>
                      <FormField label="Status">
                        <Select value={taskStatus} onValueChange={(value) => setTaskStatus(value)}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Status" />
                          </SelectTrigger>
                          <SelectContent>
                            {[
                              "pending",
                              "in-progress",
                              "blocked",
                              "complete",
                            ].map((status) => (
                              <SelectItem key={status} value={status}>
                                {status}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormField>
                      <FormField label="Due" description="Syncs with the daily planner.">
                        <Input type="date" value={taskDueDate} onChange={(event) => setTaskDueDate(event.target.value)} />
                      </FormField>
                      <div className="sm:col-span-2 flex justify-end">
                        <Button type="submit" size="sm" variant="default" disabled={taskMutation.isPending}>
                          Add task
                        </Button>
                      </div>
                    </form>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-semibold text-foreground">Log shipment</TableCell>
                  <TableCell>
                    <form className="grid gap-3 sm:grid-cols-2" onSubmit={handleShipmentSubmit}>
                      <FormField label="Lot" htmlFor="shipment-lot">
                        <Input id="shipment-lot" value={shipmentLot} onChange={(event) => setShipmentLot(event.target.value)} placeholder="Lot 13" />
                      </FormField>
                      <FormField label="Destination" htmlFor="shipment-destination">
                        <Input
                          id="shipment-destination"
                          value={shipmentDestination}
                          onChange={(event) => setShipmentDestination(event.target.value)}
                          placeholder="Terminal"
                        />
                      </FormField>
                      <FormField label="Mode">
                        <Select value={shipmentMode} onValueChange={(value) => setShipmentMode(value)}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Mode" />
                          </SelectTrigger>
                          <SelectContent>
                            {shipmentModes.map((mode) => (
                              <SelectItem key={mode.id} value={mode.id}>
                                {mode.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormField>
                      <FormField label="ETA">
                        <Input type="date" value={shipmentEta} onChange={(event) => setShipmentEta(event.target.value)} />
                      </FormField>
                      <div className="sm:col-span-2 flex justify-end">
                        <Button type="submit" size="sm" variant="secondary" disabled={shipmentMutation.isPending}>
                          Launch shipment
                        </Button>
                      </div>
                    </form>
                  </TableCell>
                </TableRow>
              </TableBody>
              <TableCaption>Inline operations keep the workflow close to the data.</TableCaption>
            </Table>
          </TabsContent>
        </Tabs>
      </Card>
    </Section>
  );
}