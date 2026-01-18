import { create } from "zustand";
import { z } from "zod";

import { apiFetch } from "../lib/api-client";
import { useAuthStore } from "./auth";

const PersonaRefSchema = z.object({ id: z.string(), alias: z.string(), account: z.string(), handle: z.string().nullish() });

const StaffingRoleSchema = z.object({
    id: z.string(),
    engagementId: z.string().nullish(),
    title: z.string(),
    location: z.string().nullish(),
    modality: z.string().nullish(),
    openings: z.coerce.number().nullable().optional(),
    priority: z.string().nullish(),
    status: z.string().nullish(),
    rateMin: z.string().nullish(),
    rateMax: z.string().nullish(),
    billRate: z.string().nullish(),
    payRate: z.string().nullish(),
});

const StaffingCandidateSchema = z.object({
    id: z.string(),
    fullName: z.string(),
    stage: z.string().nullish(),
    desiredRate: z.string().nullish(),
    score: z.string().nullish(),
    persona: PersonaRefSchema.nullish(),
    roleId: z.string().nullish(),
});

const StaffingShiftSchema = z.object({
    id: z.string(),
    title: z.string(),
    location: z.string().nullish(),
    status: z.string().nullish(),
    coverageStatus: z.string().nullish(),
    startsAt: z.string().datetime({ offset: true }).or(z.string()).or(z.null()),
    endsAt: z.string().datetime({ offset: true }).or(z.string()).or(z.null()),
    roleId: z.string().nullish(),
    assignedPersona: PersonaRefSchema.nullish(),
    assignedCandidate: z
        .object({ id: z.string(), fullName: z.string(), stage: z.string().nullish() })
        .nullish(),
});

const StaffingPlacementSchema = z.object({
    id: z.string(),
    roleId: z.string().nullish(),
    engagementId: z.string().nullish(),
    candidateId: z.string().nullish(),
    status: z.string().nullish(),
    billRate: z.string().nullish(),
    payRate: z.string().nullish(),
    margin: z.string().nullish(),
    persona: PersonaRefSchema.nullish(),
});

const StaffingEngagementSchema = z.object({
    id: z.string(),
    name: z.string(),
    client: z.string().nullish(),
    priority: z.string().nullish(),
    status: z.string().nullish(),
    budget: z.string().nullish(),
    forecast: z.string().nullish(),
    roles: z.array(StaffingRoleSchema).default([]),
    candidates: z.array(StaffingCandidateSchema).default([]),
    placements: z.array(StaffingPlacementSchema).default([]),
});

const StaffingMetricsSchema = z.object({
    openRoles: z.number(),
    activeCandidates: z.number(),
    scheduledShifts: z.number(),
    activePlacements: z.number(),
    fillRate: z.number(),
});

const StaffingDashboardSchema = z.object({
    engagements: z.array(StaffingEngagementSchema),
    roles: z.array(StaffingRoleSchema),
    candidates: z.array(StaffingCandidateSchema),
    shifts: z.array(StaffingShiftSchema),
    placements: z.array(StaffingPlacementSchema),
    metrics: StaffingMetricsSchema,
});

export type StaffingEngagement = z.infer<typeof StaffingEngagementSchema>;
export type StaffingRole = z.infer<typeof StaffingRoleSchema>;
export type StaffingCandidate = z.infer<typeof StaffingCandidateSchema>;
export type StaffingShift = z.infer<typeof StaffingShiftSchema>;
export type StaffingPlacement = z.infer<typeof StaffingPlacementSchema>;
export type StaffingMetrics = z.infer<typeof StaffingMetricsSchema>;

export type StaffingState = {
    status: "idle" | "loading" | "ready" | "error";
    error: string | null;
    engagements: StaffingEngagement[];
    roles: StaffingRole[];
    candidates: StaffingCandidate[];
    shifts: StaffingShift[];
    placements: StaffingPlacement[];
    metrics: StaffingMetrics | null;
    fetchDashboard: () => Promise<void>;
};

export const useStaffingStore = create<StaffingState>((set) => ({
    status: "idle",
    error: null,
    engagements: [],
    roles: [],
    candidates: [],
    shifts: [],
    placements: [],
    metrics: null,

    fetchDashboard: async () => {
        const { session, apiBase } = useAuthStore.getState();
        if (!session?.accessToken) {
            set({ status: "error", error: "Sign in to load staffing." });
            return;
        }
        set({ status: "loading", error: null });
        try {
            const res = await apiFetch("/staffing/dashboard", {
                token: session.accessToken,
                baseUrl: apiBase,
                schema: StaffingDashboardSchema,
            });
            set({
                engagements: res.engagements,
                roles: res.roles,
                candidates: res.candidates,
                shifts: res.shifts,
                placements: res.placements,
                metrics: res.metrics,
                status: "ready",
                error: null,
            });
        } catch (err) {
            const message = err instanceof Error ? err.message : "Unable to fetch staffing";
            set({ status: "error", error: message });
        }
    },
}));

export function useStaffingState() {
    return useStaffingStore();
}
