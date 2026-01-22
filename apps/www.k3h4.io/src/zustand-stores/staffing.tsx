import { create } from "zustand";
import { z } from "zod";

import { apiFetch } from "@/react-hooks/lib/api-client";
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
    createEngagement: (input: { name: string; client?: string | null }) => Promise<void>;
    createRole: (input: { engagementId?: string | null; title: string; location?: string | null; priority?: string | null; status?: string | null; openings?: number | null; rateMin?: string | null; rateMax?: string | null }) => Promise<void>;
    createCandidate: (input: { fullName: string; roleId?: string | null; desiredRate?: string | null; stage?: string | null }) => Promise<void>;
    advanceCandidateStage: (candidateId: string, stage: string) => Promise<void>;
    createShift: (input: { title: string; roleId?: string | null; startsAt?: string | null; endsAt?: string | null; location?: string | null; status?: string | null }) => Promise<void>;
    createPlacement: (input: { candidateId?: string | null; roleId?: string | null; engagementId?: string | null; billRate?: string | null; payRate?: string | null; status?: string | null }) => Promise<void>;
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

    createEngagement: async (input) => {
        const { session, apiBase } = useAuthStore.getState();
        if (!session?.accessToken) {
            set({ status: "error", error: "Sign in to create engagements." });
            return;
        }
        set({ status: "loading", error: null });
        try {
            await apiFetch("/staffing/engagements", {
                method: "POST",
                token: session.accessToken,
                baseUrl: apiBase,
                body: input,
            });
            await useStaffingStore.getState().fetchDashboard();
        } catch (err) {
            const message = err instanceof Error ? err.message : "Unable to create engagement";
            set({ status: "error", error: message });
        }
    },

    createRole: async (input) => {
        const { session, apiBase } = useAuthStore.getState();
        if (!session?.accessToken) {
            set({ status: "error", error: "Sign in to create roles." });
            return;
        }
        set({ status: "loading", error: null });
        try {
            await apiFetch("/staffing/roles", {
                method: "POST",
                token: session.accessToken,
                baseUrl: apiBase,
                body: input,
            });
            await useStaffingStore.getState().fetchDashboard();
        } catch (err) {
            const message = err instanceof Error ? err.message : "Unable to create role";
            set({ status: "error", error: message });
        }
    },

    createCandidate: async (input) => {
        const { session, apiBase } = useAuthStore.getState();
        if (!session?.accessToken) {
            set({ status: "error", error: "Sign in to create candidates." });
            return;
        }
        set({ status: "loading", error: null });
        try {
            await apiFetch("/staffing/candidates", {
                method: "POST",
                token: session.accessToken,
                baseUrl: apiBase,
                body: input,
            });
            await useStaffingStore.getState().fetchDashboard();
        } catch (err) {
            const message = err instanceof Error ? err.message : "Unable to create candidate";
            set({ status: "error", error: message });
        }
    },

    advanceCandidateStage: async (candidateId, stage) => {
        const { session, apiBase } = useAuthStore.getState();
        if (!session?.accessToken) {
            set({ status: "error", error: "Sign in to advance candidates." });
            return;
        }
        set({ status: "loading", error: null });
        try {
            await apiFetch(`/staffing/candidates/${candidateId}/stage`, {
                method: "POST",
                token: session.accessToken,
                baseUrl: apiBase,
                body: { stage },
            });
            await useStaffingStore.getState().fetchDashboard();
        } catch (err) {
            const message = err instanceof Error ? err.message : "Unable to advance candidate";
            set({ status: "error", error: message });
        }
    },

    createShift: async (input) => {
        const { session, apiBase } = useAuthStore.getState();
        if (!session?.accessToken) {
            set({ status: "error", error: "Sign in to create shifts." });
            return;
        }
        set({ status: "loading", error: null });
        try {
            await apiFetch("/staffing/shifts", {
                method: "POST",
                token: session.accessToken,
                baseUrl: apiBase,
                body: input,
            });
            await useStaffingStore.getState().fetchDashboard();
        } catch (err) {
            const message = err instanceof Error ? err.message : "Unable to create shift";
            set({ status: "error", error: message });
        }
    },

    createPlacement: async (input) => {
        const { session, apiBase } = useAuthStore.getState();
        if (!session?.accessToken) {
            set({ status: "error", error: "Sign in to create placements." });
            return;
        }
        set({ status: "loading", error: null });
        try {
            await apiFetch("/staffing/placements", {
                method: "POST",
                token: session.accessToken,
                baseUrl: apiBase,
                body: input,
            });
            await useStaffingStore.getState().fetchDashboard();
        } catch (err) {
            const message = err instanceof Error ? err.message : "Unable to create placement";
            set({ status: "error", error: message });
        }
    },
}));

export function useStaffingState() {
    return useStaffingStore();
}
