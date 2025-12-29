type MenuItem = {
    id: string;
    name: string;
    prepMinutes: number;
    cost: string | number;
    price: string | number;
};

type PrepTask = {
    id: string;
    task: string;
    station: string;
    dueAt?: string | null;
};

type SupplierNeed = {
    id: string;
    item: string;
    quantity: string;
    status: string;
    dueDate?: string | null;
};
import { useState } from "react";

import { Section } from "../section";
import { SectionCard } from "../shell/section-card";
import { useCreateCulinaryMenuItem, useCreateCulinaryPrepTask, useCreateCulinarySupplierNeed, useCulinaryOverviewQuery } from "../../hooks/use-culinary-queries";
import { trackTelemetry } from "../../lib/telemetry";

export type CulinaryOpsProps = {
    apiBase: string;
    userEmail: string | null;
    onNavigatePos?: () => void;
    onNavigateWarehouse?: () => void;
};

export function CulinaryOps({ apiBase, userEmail, onNavigatePos, onNavigateWarehouse }: CulinaryOpsProps) {
    const overview = useCulinaryOverviewQuery(apiBase);
    const menuItems = (overview.data?.menuItems as MenuItem[] | undefined) ?? [];
    const prepTasks = (overview.data?.prepTasks as PrepTask[] | undefined) ?? [];
    const supplierNeeds = (overview.data?.supplierNeeds as SupplierNeed[] | undefined) ?? [];

    const createMenuItem = useCreateCulinaryMenuItem(apiBase);
    const createPrepTask = useCreateCulinaryPrepTask(apiBase);
    const createSupplierNeed = useCreateCulinarySupplierNeed(apiBase);

    const [menuName, setMenuName] = useState("Signature bowl");
    const [menuPrepMinutes, setMenuPrepMinutes] = useState("12");
    const [menuCost, setMenuCost] = useState("4.50");
    const [menuPrice, setMenuPrice] = useState("12.00");

    const [prepTask, setPrepTask] = useState("Chop vegetables");
    const [prepStation, setPrepStation] = useState("Garde manger");
    const [prepDueAt, setPrepDueAt] = useState("");

    const [supplierItem, setSupplierItem] = useState("Greens case");
    const [supplierQty, setSupplierQty] = useState("3 cases");
    const [supplierStatus, setSupplierStatus] = useState("open");
    const [supplierDue, setSupplierDue] = useState("");

    const [errors, setErrors] = useState<string | null>(null);
    return (
        <div className="space-y-6">
            <Section
                eyebrow="Culinary"
                title="Menus and prep"
                description="Coordinate prep tasks, menu costing, and supplier pulls"
                actions={<div className="text-xs text-muted-foreground">User: {userEmail ?? "guest"}</div>}
            >
                {overview.isLoading ? <div className="text-sm text-muted-foreground">Loading culinary overview…</div> : null}
                {overview.isError ? <div className="text-sm text-destructive">{(overview.error as Error).message}</div> : null}
                <div className="grid gap-4 md:grid-cols-3">
                    {menuItems.length ? menuItems.map((item) => (
                        <SectionCard key={item.id} tone="muted">
                            <div className="flex items-center justify-between">
                                <div className="text-sm font-semibold">{item.name}</div>
                                <span className="text-xs text-muted-foreground">{item.prepMinutes} min prep</span>
                            </div>
                            <div className="mt-2 flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">Cost {item.cost}</span>
                                <span className="font-semibold">Price {item.price}</span>
                            </div>
                        </SectionCard>
                    )) : <div className="text-sm text-muted-foreground">No menu items yet.</div>}
                </div>
            </Section>

            <div className="grid gap-4 lg:grid-cols-3">
                <SectionCard className="lg:col-span-2">
                    <div className="flex items-center justify-between">
                        <h3 className="text-base font-semibold">Prep queue</h3>
                        <span className="text-xs text-muted-foreground">Kitchen board</span>
                    </div>
                    <div className="mt-4 space-y-2">
                        {prepTasks.length ? prepTasks.map((prep) => (
                            <div key={prep.id} className="flex items-center justify-between rounded-lg border bg-background/80 px-3 py-2">
                                <div>
                                    <div className="text-sm font-semibold">{prep.task}</div>
                                    <div className="text-xs text-muted-foreground">{prep.station}</div>
                                </div>
                                <span className="text-xs font-medium text-orange-700">{prep.dueAt ? new Date(prep.dueAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "No due time"}</span>
                            </div>
                        )) : <div className="text-sm text-muted-foreground">No prep tasks yet.</div>}
                    </div>
                </SectionCard>

                <SectionCard>
                    <div className="flex items-center justify-between">
                        <h3 className="text-base font-semibold">Supplier pulls</h3>
                        <span className="text-xs text-muted-foreground">Linked to {apiBase}</span>
                    </div>
                    <div className="mt-4 space-y-2">
                        {supplierNeeds.length ? supplierNeeds.map((need) => (
                            <div key={need.id} className="rounded-lg border bg-muted/50 px-3 py-2 text-sm">
                                <div className="flex items-center justify-between">
                                    <span className="font-semibold">{need.item}</span>
                                    <span className="text-xs text-muted-foreground">{need.quantity}</span>
                                </div>
                                <div className="text-xs text-muted-foreground">{need.status}</div>
                                <div className="text-xs text-muted-foreground">{need.dueDate ? new Date(need.dueDate).toLocaleDateString() : "No due date"}</div>
                                <div className="mt-2 flex items-center gap-3">
                                    {onNavigateWarehouse ? (
                                        <button
                                            type="button"
                                            className="text-xs font-semibold text-primary hover:underline"
                                            onClick={() => {
                                                void trackTelemetry("culinary.supplier.viewWarehouse", { needId: need.id });
                                                onNavigateWarehouse();
                                            }}
                                        >
                                            View in warehouse
                                        </button>
                                    ) : null}
                                    {onNavigatePos ? (
                                        <button
                                            type="button"
                                            className="text-xs font-semibold text-primary hover:underline"
                                            onClick={() => {
                                                void trackTelemetry("culinary.menu.viewPos", { needId: need.id });
                                                onNavigatePos();
                                            }}
                                        >
                                            View in PoS
                                        </button>
                                    ) : null}
                                </div>
                            </div>
                        )) : <div className="text-sm text-muted-foreground">No supplier needs yet.</div>}
                    </div>
                </SectionCard>
            </div>

            <div className="grid gap-4 lg:grid-cols-3">
                <SectionCard>
                    <div className="flex items-center justify-between">
                        <h3 className="text-base font-semibold">Add menu item</h3>
                        <span className="text-xs text-muted-foreground">Costing</span>
                    </div>
                    {errors ? <div className="mt-2 text-sm text-destructive">{errors}</div> : null}
                    <form
                        className="mt-4 space-y-3"
                        onSubmit={async (e) => {
                            e.preventDefault();
                            setErrors(null);
                            const prepMinutes = Number(menuPrepMinutes);
                            const cost = Number(menuCost);
                            const price = Number(menuPrice);
                            if (!menuName.trim()) {
                                setErrors("Name is required");
                                return;
                            }
                            if (Number.isNaN(prepMinutes) || Number.isNaN(cost) || Number.isNaN(price)) {
                                setErrors("Numeric fields must be valid numbers");
                                return;
                            }
                            try {
                                await createMenuItem.mutateAsync({ name: menuName.trim(), prepMinutes, cost, price });
                                setMenuName("Signature bowl");
                                setMenuPrepMinutes("12");
                                setMenuCost("4.50");
                                setMenuPrice("12.00");
                            } catch (err) {
                                setErrors((err as Error).message);
                            }
                        }}
                    >
                        <label className="flex flex-col text-sm font-medium">
                            Name
                            <input className="mt-1 rounded-md border px-2 py-1 text-sm" value={menuName} onChange={(e) => setMenuName(e.target.value)} />
                        </label>
                        <label className="flex flex-col text-sm font-medium">
                            Prep minutes
                            <input
                                className="mt-1 rounded-md border px-2 py-1 text-sm"
                                value={menuPrepMinutes}
                                onChange={(e) => setMenuPrepMinutes(e.target.value)}
                                type="number"
                                min="0"
                            />
                        </label>
                        <label className="flex flex-col text-sm font-medium">
                            Cost
                            <input
                                className="mt-1 rounded-md border px-2 py-1 text-sm"
                                value={menuCost}
                                onChange={(e) => setMenuCost(e.target.value)}
                                type="number"
                                step="0.01"
                                min="0"
                            />
                        </label>
                        <label className="flex flex-col text-sm font-medium">
                            Price
                            <input
                                className="mt-1 rounded-md border px-2 py-1 text-sm"
                                value={menuPrice}
                                onChange={(e) => setMenuPrice(e.target.value)}
                                type="number"
                                step="0.01"
                                min="0"
                            />
                        </label>
                        <button
                            type="submit"
                            className="w-full rounded-md bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90"
                            disabled={createMenuItem.isPending}
                        >
                            {createMenuItem.isPending ? "Adding…" : "Add menu item"}
                        </button>
                    </form>
                </SectionCard>

                <SectionCard>
                    <div className="flex items-center justify-between">
                        <h3 className="text-base font-semibold">Add prep task</h3>
                        <span className="text-xs text-muted-foreground">Line checks</span>
                    </div>
                    <form
                        className="mt-4 space-y-3"
                        onSubmit={async (e) => {
                            e.preventDefault();
                            setErrors(null);
                            if (!prepTask.trim()) {
                                setErrors("Task is required");
                                return;
                            }
                            try {
                                await createPrepTask.mutateAsync({ task: prepTask.trim(), station: prepStation, dueAt: prepDueAt || undefined });
                                setPrepTask("Chop vegetables");
                                setPrepStation("Garde manger");
                                setPrepDueAt("");
                            } catch (err) {
                                setErrors((err as Error).message);
                            }
                        }}
                    >
                        <label className="flex flex-col text-sm font-medium">
                            Task
                            <input className="mt-1 rounded-md border px-2 py-1 text-sm" value={prepTask} onChange={(e) => setPrepTask(e.target.value)} />
                        </label>
                        <label className="flex flex-col text-sm font-medium">
                            Station
                            <input className="mt-1 rounded-md border px-2 py-1 text-sm" value={prepStation} onChange={(e) => setPrepStation(e.target.value)} />
                        </label>
                        <label className="flex flex-col text-sm font-medium">
                            Due at
                            <input className="mt-1 rounded-md border px-2 py-1 text-sm" value={prepDueAt} onChange={(e) => setPrepDueAt(e.target.value)} type="time" />
                        </label>
                        <button
                            type="submit"
                            className="w-full rounded-md bg-secondary px-3 py-2 text-sm font-semibold hover:opacity-90"
                            disabled={createPrepTask.isPending}
                        >
                            {createPrepTask.isPending ? "Adding…" : "Add prep task"}
                        </button>
                    </form>
                </SectionCard>

                <SectionCard>
                    <div className="flex items-center justify-between">
                        <h3 className="text-base font-semibold">Add supplier need</h3>
                        <span className="text-xs text-muted-foreground">Pull sheet</span>
                    </div>
                    <form
                        className="mt-4 space-y-3"
                        onSubmit={async (e) => {
                            e.preventDefault();
                            setErrors(null);
                            if (!supplierItem.trim()) {
                                setErrors("Item is required");
                                return;
                            }
                            try {
                                await createSupplierNeed.mutateAsync({
                                    item: supplierItem.trim(),
                                    quantity: supplierQty,
                                    status: supplierStatus,
                                    dueDate: supplierDue || undefined,
                                });
                                setSupplierItem("Greens case");
                                setSupplierQty("3 cases");
                                setSupplierStatus("open");
                                setSupplierDue("");
                            } catch (err) {
                                setErrors((err as Error).message);
                            }
                        }}
                    >
                        <label className="flex flex-col text-sm font-medium">
                            Item
                            <input className="mt-1 rounded-md border px-2 py-1 text-sm" value={supplierItem} onChange={(e) => setSupplierItem(e.target.value)} />
                        </label>
                        <label className="flex flex-col text-sm font-medium">
                            Quantity
                            <input className="mt-1 rounded-md border px-2 py-1 text-sm" value={supplierQty} onChange={(e) => setSupplierQty(e.target.value)} />
                        </label>
                        <label className="flex flex-col text-sm font-medium">
                            Status
                            <select className="mt-1 rounded-md border px-2 py-1 text-sm" value={supplierStatus} onChange={(e) => setSupplierStatus(e.target.value)}>
                                <option>open</option>
                                <option>ordered</option>
                                <option>received</option>
                            </select>
                        </label>
                        <label className="flex flex-col text-sm font-medium">
                            Due date
                            <input className="mt-1 rounded-md border px-2 py-1 text-sm" value={supplierDue} onChange={(e) => setSupplierDue(e.target.value)} type="date" />
                        </label>
                        <button
                            type="submit"
                            className="w-full rounded-md bg-muted px-3 py-2 text-sm font-semibold hover:opacity-90"
                            disabled={createSupplierNeed.isPending}
                        >
                            {createSupplierNeed.isPending ? "Adding…" : "Add supplier need"}
                        </button>
                    </form>
                </SectionCard>
            </div>
        </div>
    );
}
