import { createStore } from "../lib/store";
import { personaApi, type Persona, type PersonaCompatibility, type PersonaConfusionMatrix } from "../hooks/use-persona-queries";

const apiBaseDefault = (globalThis as any)?.__API_URL__ || (import.meta as any)?.API_URL || "http://localhost:3001";

type ConfusionPayload = { pairs: { sourceId: string; targetId: string; label: boolean }[]; threshold?: number };

type PersonaCompatErrors = {
  personas?: string;
  compatibility?: string;
  confusion?: string;
};

type PersonaCompatStoreState = {
  apiBase: string;
  personas: Persona[];
  compatibilities: PersonaCompatibility[];
  confusion?: PersonaConfusionMatrix;
  loadingPersonas: boolean;
  loadingCompatibility: boolean;
  loadingConfusion: boolean;
  errors: PersonaCompatErrors;
  autoRecomputeLocked: boolean;
  compatibilityAttempted: boolean;
  lastPersonasLoad: number;
  lastCompatibilityLoad: number;
  lastCompatibilityRequest: number;
  debounceMs: number;
  setApiBase: (apiBase: string) => void;
  loadPersonas: (apiBase?: string) => Promise<void>;
  loadCompatibility: (apiBase?: string, personaId?: string) => Promise<void>;
  recomputeCompatibility: (apiBase?: string) => Promise<void>;
  runConfusion: (apiBase: string, payload: ConfusionPayload) => Promise<void>;
  markAutoRecompute: () => void;
  resetConfusion: () => void;
  clearError: (key: keyof PersonaCompatErrors) => void;
  clearAttempted: () => void;
};

export const personaCompatStore = createStore<PersonaCompatStoreState>((set, get) => ({
  apiBase: apiBaseDefault,
  personas: [],
  compatibilities: [],
  confusion: undefined,
  loadingPersonas: false,
  loadingCompatibility: false,
  loadingConfusion: false,
  errors: {},
  autoRecomputeLocked: false,
  compatibilityAttempted: false,
  lastPersonasLoad: 0,
  lastCompatibilityLoad: 0,
  lastCompatibilityRequest: 0,
  debounceMs: 4000,

  setApiBase: (apiBase) => {
    const changed = apiBase !== get().apiBase;
    set((state) => ({
      apiBase,
      ...(changed
        ? {
            compatibilities: [],
            confusion: undefined,
            errors: { ...state.errors, compatibility: undefined, confusion: undefined },
            autoRecomputeLocked: false,
            compatibilityAttempted: false,
            lastCompatibilityLoad: 0,
            lastCompatibilityRequest: 0,
          }
        : {}),
    }));
  },

  loadPersonas: async (apiBase = get().apiBase) => {
    get().setApiBase(apiBase);
    if (get().loadingPersonas) return;
    set((state) => ({ loadingPersonas: true, errors: { ...state.errors, personas: undefined } }));
    try {
      const personas = await personaApi.list(apiBase);
      set({ personas, lastPersonasLoad: Date.now() });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to load personas";
      set((state) => ({ errors: { ...state.errors, personas: message } }));
    } finally {
      set({ loadingPersonas: false });
    }
  },

  loadCompatibility: async (apiBase = get().apiBase, personaId?: string) => {
    get().setApiBase(apiBase);
    const now = Date.now();
    const { lastCompatibilityRequest, debounceMs } = get();
    if (get().loadingCompatibility) return;
    if (now - lastCompatibilityRequest < debounceMs) return;
    set((state) => ({ loadingCompatibility: true, compatibilityAttempted: true, errors: { ...state.errors, compatibility: undefined } }));
    try {
      set({ lastCompatibilityRequest: now });
      const compatibilities = await personaApi.compatibility(apiBase, personaId);
      set({ compatibilities, lastCompatibilityLoad: Date.now() });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to load compatibility";
      set((state) => ({ errors: { ...state.errors, compatibility: message } }));
    } finally {
      set({ loadingCompatibility: false });
    }
  },

  recomputeCompatibility: async (apiBase = get().apiBase) => {
    get().setApiBase(apiBase);
    const now = Date.now();
    const { lastCompatibilityRequest, debounceMs } = get();
    if (get().loadingCompatibility) return;
    if (now - lastCompatibilityRequest < debounceMs) return;
    set((state) => ({ loadingCompatibility: true, autoRecomputeLocked: true, compatibilityAttempted: true, errors: { ...state.errors, compatibility: undefined } }));
    try {
      set({ lastCompatibilityRequest: now });
      const compatibilities = await personaApi.recomputeCompatibility(apiBase);
      set((state) => ({
        compatibilities,
        lastCompatibilityLoad: Date.now(),
        errors: { ...state.errors, compatibility: undefined },
      }));
    } catch (error) {
      const message = error instanceof Error ? error.message : "Recompute failed";
      set((state) => ({ errors: { ...state.errors, compatibility: message } }));
    } finally {
      set({ loadingCompatibility: false });
    }
  },

  runConfusion: async (apiBase: string, payload: ConfusionPayload) => {
    get().setApiBase(apiBase);
    if (get().loadingConfusion) return;
    set((state) => ({ loadingConfusion: true, errors: { ...state.errors, confusion: undefined } }));
    try {
      const confusion = await personaApi.confusion(apiBase, payload);
      set({ confusion });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Confusion evaluation failed";
      set((state) => ({ errors: { ...state.errors, confusion: message } }));
    } finally {
      set({ loadingConfusion: false });
    }
  },

  markAutoRecompute: () => set({ autoRecomputeLocked: true }),
  resetConfusion: () => set({ confusion: undefined }),
  clearError: (key) => set((state) => ({ errors: { ...state.errors, [key]: undefined } })),
  clearAttempted: () => set({ compatibilityAttempted: false }),
}));
