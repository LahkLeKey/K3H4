type Plot = {
    id: string;
    name: string;
    crop: string;
    stage: string;
    acres: number;
    health: string;
};

type Task = {
    id: string;
    title: string;
    assignee?: string | null;
    dueDate?: string | null;
};

type Shipment = {
    id: string;
    lot: string;
    destination: string;
    mode: string;
    eta?: string | null;
    freightLoadId?: string | null;
};
import { useState } from "react";

import { Section } from "../section";
import { SectionCard } from "../shell/section-card";
import { useAgricultureOverviewQuery, useCreateAgriculturePlot, useCreateAgricultureShipment, useCreateAgricultureTask } from "../../hooks/use-agriculture-queries";
import { trackTelemetry } from "../../lib/telemetry";

export type AgricultureDashboardProps = {
    apiBase: string;
    userEmail: string | null;
    onNavigateFreight?: () => void;
};

export function AgricultureDashboard({ apiBase, userEmail, onNavigateFreight }: AgricultureDashboardProps) {
    const overview = useAgricultureOverviewQuery(apiBase);
    const plots = (overview.data?.plots as Plot[] | undefined) ?? [];
    const tasks = (overview.data?.tasks as Task[] | undefined) ?? [];
    const shipments = (overview.data?.shipments as Shipment[] | undefined) ?? [];

    const createPlot = useCreateAgriculturePlot(apiBase);
    const createTask = useCreateAgricultureTask(apiBase);
    const createShipment = useCreateAgricultureShipment(apiBase);

    const [plotName, setPlotName] = useState("");
    const [plotCrop, setPlotCrop] = useState("Corn");
    const [plotAcres, setPlotAcres] = useState("25");
    const [taskTitle, setTaskTitle] = useState("Irrigate north field");
    const [taskAssignee, setTaskAssignee] = useState("Crew A");
    const [taskDueDate, setTaskDueDate] = useState("");
    const [shipmentLot, setShipmentLot] = useState("LOT-001");
    const [shipmentDestination, setShipmentDestination] = useState("Chicago DC");
    const [shipmentMode, setShipmentMode] = useState("Truck");
    const [shipmentFreightId, setShipmentFreightId] = useState("");
    const [errors, setErrors] = useState<string | null>(null);

    return (
        <div className="space-y-6">
            <Section
                eyebrow="Agriculture"
                title="Field and yield overview"
                description="Track plots, tasks, and outbound lots"
                actions={<div className="text-xs text-muted-foreground">User: {userEmail ?? "guest"}</div>}
            >
                {overview.isLoading ? <div className="text-sm text-muted-foreground">Loading agriculture overview…</div> : null}
                {overview.isError ? <div className="text-sm text-destructive">{(overview.error as Error).message}</div> : null}
                <div className="grid gap-4 md:grid-cols-3">
                    {plots.length ? plots.map((plot) => (
                        <SectionCard key={plot.id} tone="muted">
                            <div className="flex items-center justify-between">
                                <div className="text-sm font-semibold">{plot.name}</div>
                                <span className="text-xs text-muted-foreground">{plot.acres} acres</span>
                            </div>
                            <div className="mt-2 flex items-center justify-between text-sm">
                                <span>{plot.crop} · {plot.stage}</span>
                                <span className="text-xs text-emerald-700">{plot.health}</span>
                            </div>
                        </SectionCard>
                    )) : <div className="text-sm text-muted-foreground">No plots yet.</div>}
                </div>
            </Section>

            <div className="grid gap-4 lg:grid-cols-3">
                <SectionCard className="lg:col-span-2">
                    <div className="flex items-center justify-between">
                        <h3 className="text-base font-semibold">Upcoming tasks</h3>
                        <span className="text-xs text-muted-foreground">Synced to {apiBase}</span>
                    </div>
                    <div className="mt-4 space-y-2">
                        {tasks.length ? tasks.map((task) => (
                            <div key={task.id} className="flex items-center justify-between rounded-lg border bg-background/80 px-3 py-2">
                                <div>
                                    <div className="text-sm font-semibold">{task.title}</div>
                                    <div className="text-xs text-muted-foreground">Assignee: {task.assignee ?? "Unassigned"}</div>
                                </div>
                                <span className="text-xs font-medium text-orange-700">{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "No due date"}</span>
                            </div>
                        )) : <div className="text-sm text-muted-foreground">No tasks yet.</div>}
                    </div>
                </SectionCard>

                <SectionCard>
                    <div className="flex items-center justify-between">
                        <h3 className="text-base font-semibold">Outbound lots</h3>
                        <span className="text-xs text-muted-foreground">Freight ready</span>
                    </div>
                    <div className="mt-4 space-y-2">
                        {shipments.length ? shipments.map((shipment) => (
                            <div key={shipment.id} className="rounded-lg border bg-muted/50 px-3 py-2 text-sm">
                                <div className="flex items-center justify-between">
                                    <span className="font-semibold">{shipment.lot}</span>
                                    <span className="text-xs text-muted-foreground">{shipment.mode}</span>
                                </div>
                                <div className="flex items-center justify-between text-xs text-muted-foreground">
                                    <span>{shipment.destination}</span>
                                    <span>{shipment.eta ? new Date(shipment.eta).toLocaleDateString() : "ETA TBD"}</span>
                                </div>
                                {onNavigateFreight ? (
                                    <button
                                        type="button"
                                        className="mt-2 text-xs font-semibold text-primary hover:underline"
                                        onClick={() => {
                                            void trackTelemetry("agriculture.shipment.viewFreight", { shipmentId: shipment.id, freightLinked: Boolean(shipment.freightLoadId) });
                                            onNavigateFreight();
                                        }}
                                    >
                                        View in freight
                                    </button>
                                ) : null}
                            </div>
                        )) : <div className="text-sm text-muted-foreground">No outbound lots yet.</div>}
                    </div>
                </SectionCard>
            </div>

            <div className="grid gap-4 lg:grid-cols-3">
                <SectionCard>
                    <div className="flex items-center justify-between">
                        <h3 className="text-base font-semibold">Add plot</h3>
                        <span className="text-xs text-muted-foreground">Field inventory</span>
                    </div>
                    {errors ? <div className="mt-2 text-sm text-destructive">{errors}</div> : null}
                    <form
                        className="mt-4 space-y-3"
                        onSubmit={async (e) => {
                            e.preventDefault();
                            setErrors(null);
                            const acres = Number(plotAcres);
                            if (!plotName.trim()) {
                                setErrors("Plot name is required");
                                return;
                            }
                            if (!acres || Number.isNaN(acres)) {
                                setErrors("Acres must be a number");
                                return;
                            }
                            try {
                                await createPlot.mutateAsync({ name: plotName.trim(), crop: plotCrop, acres, stage: "Planning" });
                                setPlotName("");
                                setPlotCrop("Corn");
                                setPlotAcres("25");
                            } catch (err) {
                                setErrors((err as Error).message);
                            }
                        }}
                    >
                        <label className="flex flex-col text-sm font-medium">
                            Plot name
                            <input className="mt-1 rounded-md border px-2 py-1 text-sm" value={plotName} onChange={(e) => setPlotName(e.target.value)} />
                        </label>
                        <label className="flex flex-col text-sm font-medium">
                            Crop
                            <input className="mt-1 rounded-md border px-2 py-1 text-sm" value={plotCrop} onChange={(e) => setPlotCrop(e.target.value)} />
                        </label>
                        <label className="flex flex-col text-sm font-medium">
                            Acres
                            <input
                                className="mt-1 rounded-md border px-2 py-1 text-sm"
                                value={plotAcres}
                                onChange={(e) => setPlotAcres(e.target.value)}
                                type="number"
                                min="0"
                                step="0.01"
                            />
                        </label>
                        <button
                            type="submit"
                            className="w-full rounded-md bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90"
                            disabled={createPlot.isPending}
                        >
                            {createPlot.isPending ? "Adding…" : "Add plot"}
                        </button>
                    </form>
                </SectionCard>

                <SectionCard>
                    <div className="flex items-center justify-between">
                        <h3 className="text-base font-semibold">Add task</h3>
                        <span className="text-xs text-muted-foreground">Work queue</span>
                    </div>
                    <form
                        className="mt-4 space-y-3"
                        onSubmit={async (e) => {
                            e.preventDefault();
                            setErrors(null);
                            if (!taskTitle.trim()) {
                                setErrors("Task title is required");
                                return;
                            }
                            try {
                                await createTask.mutateAsync({ title: taskTitle.trim(), assignee: taskAssignee || undefined, dueDate: taskDueDate || undefined });
                                setTaskTitle("Irrigate north field");
                                setTaskAssignee("Crew A");
                                setTaskDueDate("");
                            } catch (err) {
                                setErrors((err as Error).message);
                            }
                        }}
                    >
                        <label className="flex flex-col text-sm font-medium">
                            Title
                            <input className="mt-1 rounded-md border px-2 py-1 text-sm" value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} />
                        </label>
                        <label className="flex flex-col text-sm font-medium">
                            Assignee
                            <input className="mt-1 rounded-md border px-2 py-1 text-sm" value={taskAssignee} onChange={(e) => setTaskAssignee(e.target.value)} />
                        </label>
                        <label className="flex flex-col text-sm font-medium">
                            Due date
                            <input className="mt-1 rounded-md border px-2 py-1 text-sm" value={taskDueDate} onChange={(e) => setTaskDueDate(e.target.value)} type="date" />
                        </label>
                        <button
                            type="submit"
                            className="w-full rounded-md bg-secondary px-3 py-2 text-sm font-semibold hover:opacity-90"
                            disabled={createTask.isPending}
                        >
                            {createTask.isPending ? "Adding…" : "Add task"}
                        </button>
                    </form>
                </SectionCard>

                <SectionCard>
                    <div className="flex items-center justify-between">
                        <h3 className="text-base font-semibold">Add shipment</h3>
                        <span className="text-xs text-muted-foreground">Outbound lots</span>
                    </div>
                    <form
                        className="mt-4 space-y-3"
                        onSubmit={async (e) => {
                            e.preventDefault();
                            setErrors(null);
                            if (!shipmentLot.trim()) {
                                setErrors("Lot is required");
                                return;
                            }
                            try {
                                await createShipment.mutateAsync({
                                    lot: shipmentLot.trim(),
                                    destination: shipmentDestination.trim() || "",
                                    mode: shipmentMode,
                                    freightLoadId: shipmentFreightId || undefined,
                                });
                                setShipmentLot("LOT-001");
                                setShipmentDestination("Chicago DC");
                                setShipmentMode("Truck");
                                setShipmentFreightId("");
                            } catch (err) {
                                setErrors((err as Error).message);
                            }
                        }}
                    >
                        <label className="flex flex-col text-sm font-medium">
                            Lot
                            <input className="mt-1 rounded-md border px-2 py-1 text-sm" value={shipmentLot} onChange={(e) => setShipmentLot(e.target.value)} />
                        </label>
                        <label className="flex flex-col text-sm font-medium">
                            Destination
                            <input className="mt-1 rounded-md border px-2 py-1 text-sm" value={shipmentDestination} onChange={(e) => setShipmentDestination(e.target.value)} />
                        </label>
                        <label className="flex flex-col text-sm font-medium">
                            Mode
                            <select className="mt-1 rounded-md border px-2 py-1 text-sm" value={shipmentMode} onChange={(e) => setShipmentMode(e.target.value)}>
                                <option>Truck</option>
                                <option>Rail</option>
                                <option>Air</option>
                                <option>Sea</option>
                            </select>
                        </label>
                        <label className="flex flex-col text-sm font-medium">
                            Freight load ID (optional)
                            <input className="mt-1 rounded-md border px-2 py-1 text-sm" value={shipmentFreightId} onChange={(e) => setShipmentFreightId(e.target.value)} placeholder="link existing freight" />
                        </label>
                        <button
                            type="submit"
                            className="w-full rounded-md bg-muted px-3 py-2 text-sm font-semibold hover:opacity-90"
                            disabled={createShipment.isPending}
                        >
                            {createShipment.isPending ? "Adding…" : "Add shipment"}
                        </button>
                    </form>
                </SectionCard>
            </div>
        </div>
    );
}
