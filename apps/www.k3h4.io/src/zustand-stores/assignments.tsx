import { create } from "zustand";
import { z } from "zod";

import { apiFetch } from "../react-hooks/lib/api-client";
import { useAuthStore } from "./auth";

const PersonaRefSchema = z.object({ id: z.string(), alias: z.string(), account: z.string(), handle: z.string().nullish() });

const TimecardSchema = z.object({
    id: z.string(),
    hours: z.string(),
    amount: z.string(),
    note: z.string().nullish(),
    status: z.string(),
});

const PayoutSchema = z.object({
    id: z.string(),
    amount: z.string(),
    note: z.string().nullish(),
    status: z.string(),
    invoiceUrl: z.string().nullish(),
});

const AssignmentSchema = z.object({
    id: z.string(),
    title: z.string(),
    hourlyRate: z.string(),
    persona: PersonaRefSchema.nullish(),
    timecards: z.array(TimecardSchema).default([]),
    payouts: z.array(PayoutSchema).default([]),
});

const AssignmentListSchema = z.object({ assignments: z.array(AssignmentSchema) });
const AssignmentSingleSchema = z.object({ assignment: AssignmentSchema });
const TimecardSingleSchema = z.object({ timecard: TimecardSchema, assignment: AssignmentSchema.nullish() }).partial();
const PayoutSingleSchema = z.object({ payout: PayoutSchema, assignment: AssignmentSchema.nullish() }).partial();

export type Assignment = z.infer<typeof AssignmentSchema>;
export type Timecard = z.infer<typeof TimecardSchema>;
export type Payout = z.infer<typeof PayoutSchema>;

export type AssignmentState = {
    status: "idle" | "loading" | "ready" | "error";
    error: string | null;
    assignments: Assignment[];
    metrics: { count: number; hours: number; payouts: number };
    fetchAssignments: () => Promise<void>;
    createAssignment: (payload: { title: string; personaId: string; hourlyRate: number }) => Promise<void>;
    addTimecard: (assignmentId: string, hours: number, note?: string) => Promise<void>;
    payTimecard: (assignmentId: string, timecardId: string, note?: string) => Promise<void>;
};

const summarize = (assignments: Assignment[]) => {
    let hours = 0;
    let payouts = 0;
    assignments.forEach((a) => {
        a.timecards.forEach((tc) => {
            hours += Number(tc.hours) || 0;
        });
        a.payouts.forEach((p) => {
            payouts += Number(p.amount) || 0;
        });
    });
    return { count: assignments.length, hours, payouts };
};

export const useAssignmentStore = create<AssignmentState>((set, get) => ({
    status: "idle",
    error: null,
    assignments: [],
    metrics: { count: 0, hours: 0, payouts: 0 },

    fetchAssignments: async () => {
        const { session, apiBase } = useAuthStore.getState();
        if (!session?.accessToken) {
            set({ status: "error", error: "Sign in to load assignments." });
            return;
        }
        set({ status: "loading", error: null });
        try {
            const res = await apiFetch("/assignments", {
                token: session.accessToken,
                baseUrl: apiBase,
                schema: AssignmentListSchema,
            });
            set({ assignments: res.assignments, metrics: summarize(res.assignments), status: "ready", error: null });
        } catch (err) {
            const message = err instanceof Error ? err.message : "Unable to fetch assignments";
            set({ status: "error", error: message });
        }
    },

    createAssignment: async ({ title, personaId, hourlyRate }) => {
        const { session, apiBase } = useAuthStore.getState();
        if (!session?.accessToken) {
            set({ status: "error", error: "Sign in to create assignments." });
            return;
        }
        try {
            const res = await apiFetch("/assignments", {
                method: "POST",
                token: session.accessToken,
                baseUrl: apiBase,
                schema: AssignmentSingleSchema,
                body: { title, personaId, hourlyRate },
            });
            const assignments = [res.assignment, ...get().assignments];
            set({ assignments, metrics: summarize(assignments), status: "ready", error: null });
        } catch (err) {
            const message = err instanceof Error ? err.message : "Unable to create assignment";
            set({ status: "error", error: message });
        }
    },

    addTimecard: async (assignmentId, hours, note) => {
        const { session, apiBase } = useAuthStore.getState();
        if (!session?.accessToken) {
            set({ status: "error", error: "Sign in to add timecards." });
            return;
        }
        try {
            const res = await apiFetch(`/assignments/${assignmentId}/timecards`, {
                method: "POST",
                token: session.accessToken,
                baseUrl: apiBase,
                schema: TimecardSingleSchema,
                body: { hours, note },
            });
            const updated = res.assignment ?? get().assignments.find((a) => a.id === assignmentId);
            if (!updated) return;
            const assignments = get().assignments.map((a) => (a.id === assignmentId ? updated : a));
            set({ assignments, metrics: summarize(assignments), status: "ready", error: null });
        } catch (err) {
            const message = err instanceof Error ? err.message : "Unable to add timecard";
            set({ status: "error", error: message });
        }
    },

    payTimecard: async (assignmentId, timecardId, note) => {
        const { session, apiBase } = useAuthStore.getState();
        if (!session?.accessToken) {
            set({ status: "error", error: "Sign in to pay timecards." });
            return;
        }
        try {
            const res = await apiFetch(`/assignments/${assignmentId}/pay`, {
                method: "POST",
                token: session.accessToken,
                baseUrl: apiBase,
                schema: PayoutSingleSchema,
                body: { timecardId, note },
            });
            const updated = res.assignment ?? get().assignments.find((a) => a.id === assignmentId);
            if (!updated) return;
            const assignments = get().assignments.map((a) => (a.id === assignmentId ? updated : a));
            set({ assignments, metrics: summarize(assignments), status: "ready", error: null });
        } catch (err) {
            const message = err instanceof Error ? err.message : "Unable to pay timecard";
            set({ status: "error", error: message });
        }
    },
}));

export function useAssignmentState() {
    return useAssignmentStore();
}
