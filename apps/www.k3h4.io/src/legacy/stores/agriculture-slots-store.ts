import { createStore } from "../lib/store";
import type { AgricultureSlot } from "../hooks/use-agriculture-queries";

type SlotsState = {
  slots: AgricultureSlot[];
  unlockedSlotCount: number;
  setSlots: (slots: AgricultureSlot[]) => void;
  upsertSlot: (slot: AgricultureSlot) => void;
  setUnlockedSlotCount: (count: number) => void;
  reset: () => void;
};

const defaultState: Pick<SlotsState, "slots" | "unlockedSlotCount"> = {
  slots: [],
  unlockedSlotCount: 0,
};

export const agricultureSlotsStore = createStore<SlotsState>((set, get) => ({
  ...defaultState,
  setSlots: (slots) => set({ slots, unlockedSlotCount: Math.max(get().unlockedSlotCount, slots.length) }),
  upsertSlot: (slot) => {
    const next = [...get().slots];
    const idx = next.findIndex((item) => item.id === slot.id);
    if (idx >= 0) next[idx] = slot;
    else next.push(slot);
    set({ slots: next, unlockedSlotCount: Math.max(next.length, get().unlockedSlotCount) });
  },
  setUnlockedSlotCount: (count) => set({ unlockedSlotCount: count }),
  reset: () => set({ ...defaultState }),
}));
