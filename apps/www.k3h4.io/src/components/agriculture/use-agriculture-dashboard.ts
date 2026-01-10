import { useEffect, useMemo } from "react";

import {
    useAgricultureAnalyticsQuery,
    useAgricultureOverviewQuery,
    useAgriculturePlotsQuery,
    useAgricultureTasksQuery,
    useCreateAgriculturePlot,
    useCreateAgricultureTask,
} from "../../hooks/use-agriculture-queries";
import { useBankUpdateMutation } from "../../hooks/use-bank-queries";
import { useK3h4Bank } from "../../hooks/use-k3h4-bank";
import {
    useUsdaEsrCommoditiesQuery,
    useUsdaEsrReleaseQuery,
    useUsdaPsdCommoditiesQuery,
} from "../../hooks/use-usda-queries";
import { trackTelemetry } from "../../lib/telemetry";
import { formatCommodityLabel, normalizeHealth } from "./utils";
import { type PlotMesh } from "./plot-canvas";
import { type ActionMode } from "../../stores/agriculture-dashboard-store";

export type DashboardHookParams = {
    apiBase: string;
    highlightedPlot: string | null;
    searchTerm: string;
    plotName: string;
    plotCrop: string;
    plotAcres: string;
    plotCost: string;
    seedCommodity: string;
    seedCost: string;
    workerTaskTitle: string;
    workerDueDate: string;
    workerAssignee: string;
    setActionMode: (mode: ActionMode) => void;
    setSignalsOpen: (value: boolean) => void;
    setRosterOpen: (value: boolean) => void;
    setWorkerDueDate: (value: string) => void;
    setStatusMessage: (value: string) => void;
};

export function useAgricultureDashboard({
    apiBase,
    highlightedPlot,
    searchTerm,
    plotName,
    plotCrop,
    plotAcres,
    plotCost,
    seedCommodity,
    seedCost,
    workerTaskTitle,
    workerDueDate,
    workerAssignee,
    setActionMode,
    setSignalsOpen,
    setRosterOpen,
    setWorkerDueDate,
    setStatusMessage,
}: DashboardHookParams) {
    const overviewQuery = useAgricultureOverviewQuery(apiBase);
    const analyticsQuery = useAgricultureAnalyticsQuery(apiBase);
    const plotsQuery = useAgriculturePlotsQuery(apiBase);
    const tasksQuery = useAgricultureTasksQuery(apiBase);
    const createPlotMutation = useCreateAgriculturePlot(apiBase);
    const createTaskMutation = useCreateAgricultureTask(apiBase);
    const bankUpdateMutation = useBankUpdateMutation(apiBase);
    const bank = useK3h4Bank(apiBase);

    const usdaEsrCommoditiesQuery = useUsdaEsrCommoditiesQuery(apiBase);
    const usdaEsrReleaseQuery = useUsdaEsrReleaseQuery(apiBase);
    const usdaPsdCommoditiesQuery = useUsdaPsdCommoditiesQuery(apiBase);

    const plots = plotsQuery.data?.plots ?? [];
    const filteredPlots = useMemo(() => {
        if (!searchTerm.trim()) return plots;
        const needle = searchTerm.toLowerCase();
        return plots.filter((plot) => `${plot.name} ${plot.crop} ${plot.stage}`.toLowerCase().includes(needle));
    }, [plots, searchTerm]);

    useEffect(() => {
        const withTargets = plots
            .flatMap((plot) => plot.plans || [])
            .map((plan) => plan.targetHarvestDate || plan.endDate || plan.startDate)
            .filter(Boolean) as string[];
        const soonest = withTargets.sort((a, b) => new Date(a).getTime() - new Date(b).getTime())[0];
        if (soonest) {
            setWorkerDueDate(soonest.slice(0, 10));
        }
    }, [plots, setWorkerDueDate]);

    const esrCommodities = Array.isArray(usdaEsrCommoditiesQuery.data) ? usdaEsrCommoditiesQuery.data : [];
    const psdCommodities = Array.isArray(usdaPsdCommoditiesQuery.data) ? usdaPsdCommoditiesQuery.data : [];
    const esrReleases = Array.isArray(usdaEsrReleaseQuery.data) ? usdaEsrReleaseQuery.data : [];
    const esrCommodityList = esrCommodities.slice(0, 8);
    const psdCommodityList = psdCommodities.slice(0, 8);
    const esrReleaseList = esrReleases.slice(0, 6);

    const activePlot = filteredPlots.find((plot) => plot.id === highlightedPlot) || filteredPlots[0];

    const planPhases = Object.entries(analyticsQuery.data?.planPhaseCounts ?? {});
    const taskStatusCounts = Object.entries(analyticsQuery.data?.taskStatusCounts ?? {});

    const seedOptions = esrCommodities.slice(0, 12).map((item) => ({
        label: formatCommodityLabel(item),
        code: (item as any)?.commodityCode || (item as any)?.CommodityCode || "",
    }));

    const assigneeOptions = useMemo(
        () => Array.from(new Set(["Crew", ...((tasksQuery.data?.tasks || []).map((task) => task.assignee).filter(Boolean) as string[])])),
        [tasksQuery.data?.tasks],
    );

    const busy = bankUpdateMutation.isPending || createPlotMutation.isPending || createTaskMutation.isPending;
    const bankUpdateError = (bankUpdateMutation.error as Error | null | undefined)?.message || "";
    const createPlotError = (createPlotMutation.error as Error | null | undefined)?.message || "";
    const createTaskError = (createTaskMutation.error as Error | null | undefined)?.message || "";
    const derivedStatusMessage = bank.error || bankUpdateError || createPlotError || createTaskError || bank.message || "";

    const balanceValue = Number(bank.balance || 0);

    const handleConfirmAddPlot = async () => {
        const acresValue = Number(plotAcres) || 1;
        const costValue = Number(plotCost) || 0;
        if (balanceValue < costValue) {
            setStatusMessage("Insufficient K3H4 coin for plot purchase.");
            return;
        }
        try {
            setStatusMessage("");
            await bankUpdateMutation.mutateAsync({ delta: -costValue, reason: `Plot purchase: ${plotName}` });
            await createPlotMutation.mutateAsync({ name: plotName, crop: plotCrop, stage: "planned", acres: acresValue, health: "good" });
            setActionMode(null);
            void trackTelemetry("agriculture.dashboard.add_plot.success", { costValue, acresValue });
        } catch (error: any) {
            setStatusMessage(error?.message || "Unable to create plot.");
            void trackTelemetry("agriculture.dashboard.add_plot.error", { message: error?.message });
        }
    };

    const handleConfirmBuySeeds = async () => {
        const costValue = Number(seedCost) || 0;
        const label = seedOptions.find((item) => item.code === seedCommodity)?.label || "Seed";
        if (balanceValue < costValue) {
            setStatusMessage("Insufficient K3H4 coin for seeds.");
            return;
        }
        try {
            setStatusMessage("");
            await bankUpdateMutation.mutateAsync({ delta: -costValue, reason: `Seeds: ${label}` });
            // TODO: when inventory/purchase endpoint exists, POST there with the same reason.
            setActionMode(null);
            setSignalsOpen(true);
            void trackTelemetry("agriculture.dashboard.buy_seeds.success", { costValue, seedCommodity });
        } catch (error: any) {
            setStatusMessage(error?.message || "Unable to purchase seeds.");
            void trackTelemetry("agriculture.dashboard.buy_seeds.error", { message: error?.message });
        }
    };

    const handleConfirmScheduleWorkers = async () => {
        try {
            setStatusMessage("");
            await createTaskMutation.mutateAsync({ title: workerTaskTitle, assignee: workerAssignee, dueDate: workerDueDate, status: "pending" });
            setActionMode(null);
            setRosterOpen(true);
            void trackTelemetry("agriculture.dashboard.schedule_workers.success");
        } catch (error: any) {
            setStatusMessage(error?.message || "Unable to schedule workers.");
            void trackTelemetry("agriculture.dashboard.schedule_workers.error", { message: error?.message });
        }
    };

    const plotMeshes: PlotMesh[] = filteredPlots.map((plot) => ({
        id: plot.id,
        name: plot.name,
        crop: plot.crop,
        stage: plot.stage,
        acres: plot.acres,
        health: plot.health,
        latestCondition: plot.latestCondition,
        position: [0, 0, 0] as [number, number, number],
        size: [3, 2] as [number, number],
        healthTint: normalizeHealth(plot.health),
    }));

    return {
        overviewQuery,
        analyticsQuery,
        plotsQuery,
        tasksQuery,
        usdaEsrCommoditiesQuery,
        usdaEsrReleaseQuery,
        usdaPsdCommoditiesQuery,
        bank,
        bankUpdateMutation,
        createPlotMutation,
        createTaskMutation,
        filteredPlots,
        activePlot,
        plotMeshes,
        seedOptions,
        assigneeOptions,
        planPhases,
        taskStatusCounts,
        esrCommodities,
        psdCommodities,
        esrReleases,
        esrCommodityList,
        psdCommodityList,
        esrReleaseList,
        busy,
        derivedStatusMessage,
        balanceValue,
        handleConfirmAddPlot,
        handleConfirmBuySeeds,
        handleConfirmScheduleWorkers,
    };
}
