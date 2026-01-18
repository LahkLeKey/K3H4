import { create } from "zustand";
import { z } from "zod";

import { apiFetch } from "../lib/api-client";
import { useAuthStore } from "./auth";

const PersonaAttributeSchema = z.object({
    id: z.string(),
    category: z.string(),
    value: z.string(),
    weight: z.coerce.number().default(1),
});

const PersonaSchema = z.object({
    id: z.string(),
    alias: z.string(),
    account: z.string(),
    handle: z.string().nullish(),
    note: z.string().nullish(),
    tags: z.array(z.string()).default([]),
    attributes: z.array(PersonaAttributeSchema).default([]),
});

const PersonaListSchema = z.object({ personas: z.array(PersonaSchema) });
const PersonaSingleSchema = z.object({ persona: PersonaSchema });

export type Persona = z.infer<typeof PersonaSchema>;
export type PersonaAttribute = z.infer<typeof PersonaAttributeSchema>;

export type PersonaState = {
    personas: Persona[];
    status: "idle" | "loading" | "ready" | "error";
    error: string | null;
    stats: { total: number; attributes: number; categories: Record<string, number> };
    fetchPersonas: () => Promise<void>;
    generatePersonas: (count?: number) => Promise<void>;
    createPersona: (payload: { alias: string; account: string; handle?: string; note?: string; tags?: string[] }) => Promise<void>;
    updateAttributes: (personaId: string, attributes: { category: string; values: string[]; weight?: number }[]) => Promise<void>;
};

const summarize = (personas: Persona[]) => {
    const categories: Record<string, number> = {};
    let attributes = 0;
    personas.forEach((p) => {
        p.attributes.forEach((attr) => {
            attributes += 1;
            categories[attr.category] = (categories[attr.category] || 0) + 1;
        });
    });
    return { total: personas.length, attributes, categories };
};

export const usePersonaStore = create<PersonaState>((set, get) => ({
    personas: [],
    status: "idle",
    error: null,
    stats: { total: 0, attributes: 0, categories: {} },

    fetchPersonas: async () => {
        const { session, apiBase } = useAuthStore.getState();
        if (!session?.accessToken) {
            set({ status: "error", error: "Sign in to load personas." });
            return;
        }
        set({ status: "loading", error: null });
        try {
            const res = await apiFetch("/personas", {
                token: session.accessToken,
                baseUrl: apiBase,
                schema: PersonaListSchema,
            });
            set({ personas: res.personas, status: "ready", error: null, stats: summarize(res.personas) });
        } catch (err) {
            const message = err instanceof Error ? err.message : "Unable to fetch personas";
            set({ status: "error", error: message });
        }
    },

    generatePersonas: async (count = 3) => {
        const { session, apiBase } = useAuthStore.getState();
        if (!session?.accessToken) {
            set({ status: "error", error: "Sign in to generate personas." });
            return;
        }
        try {
            const res = await apiFetch("/personas/generate", {
                method: "POST",
                token: session.accessToken,
                baseUrl: apiBase,
                schema: PersonaListSchema,
                body: { count },
            });
            const personas = [...res.personas, ...get().personas];
            set({ personas, status: "ready", stats: summarize(personas), error: null });
        } catch (err) {
            const message = err instanceof Error ? err.message : "Unable to generate";
            set({ status: "error", error: message });
        }
    },

    createPersona: async (payload) => {
        const { session, apiBase } = useAuthStore.getState();
        if (!session?.accessToken) {
            set({ status: "error", error: "Sign in to create personas." });
            return;
        }
        try {
            const res = await apiFetch("/personas", {
                method: "POST",
                token: session.accessToken,
                baseUrl: apiBase,
                schema: PersonaSingleSchema,
                body: payload,
            });
            const personas = [res.persona, ...get().personas];
            set({ personas, status: "ready", stats: summarize(personas), error: null });
        } catch (err) {
            const message = err instanceof Error ? err.message : "Unable to create persona";
            set({ status: "error", error: message });
        }
    },

    updateAttributes: async (personaId, attributes) => {
        const { session, apiBase } = useAuthStore.getState();
        if (!session?.accessToken) {
            set({ status: "error", error: "Sign in to edit attributes." });
            return;
        }
        try {
            const res = await apiFetch(`/personas/${personaId}/attributes`, {
                method: "PUT",
                token: session.accessToken,
                baseUrl: apiBase,
                schema: PersonaSingleSchema,
                body: { attributes },
            });
            const personas = get().personas.map((p) => (p.id === personaId ? res.persona : p));
            set({ personas, status: "ready", stats: summarize(personas), error: null });
        } catch (err) {
            const message = err instanceof Error ? err.message : "Unable to update attributes";
            set({ status: "error", error: message });
        }
    },
}));

export function usePersonaState() {
    return usePersonaStore();
}
