import { createStore } from "../lib/store";

type ResourcesFilters = {
  searchTerm: string;
  activeCategory: string | null;
  setSearchTerm: (value: string) => void;
  setActiveCategory: (value: string | null) => void;
  resetFilters: () => void;
};

export const agricultureResourcesStore = createStore<ResourcesFilters>((set) => ({
  searchTerm: "",
  activeCategory: null,
  setSearchTerm: (searchTerm) => set({ searchTerm }),
  setActiveCategory: (activeCategory) => set({ activeCategory }),
  resetFilters: () => set({ searchTerm: "", activeCategory: null }),
}));
