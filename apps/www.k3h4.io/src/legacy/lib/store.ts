import { useRef } from "react";
import { create, type StoreApi, type UseBoundStore } from "zustand";
import { shallow } from "zustand/shallow";

export type Selector<T, U> = (state: T) => U;
export type EqualityChecker<U> = (a: U, b: U) => boolean;

export type BoundStore<T> = UseBoundStore<StoreApi<T>>;

export type StoreWithShallow<T> = BoundStore<T> & {
  useShallow: <U>(selector: Selector<T, U>, equality?: EqualityChecker<U>) => U;
};

// Create a typed store and add a shallow-select helper to discourage repeated selectors.
export function createStore<T extends object>(initializer: (set: BoundStore<T>["setState"], get: BoundStore<T>["getState"]) => T): StoreWithShallow<T> {
  const store = create<T>((set, get) => initializer(set, get)) as StoreWithShallow<T>;
  store.useShallow = <U>(selector: Selector<T, U>, equality: EqualityChecker<U> = shallow) => store(selector, equality);
  return store;
}

// Per-component store helper to avoid global cross-talk while keeping shallow selection by default.
export function useLocalStore<T extends object>(initializer: (set: BoundStore<T>["setState"], get: BoundStore<T>["getState"]) => T): StoreWithShallow<T> {
  const ref = useRef<StoreWithShallow<T> | null>(null);
  if (!ref.current) {
    ref.current = createStore(initializer);
  }
  return ref.current;
}
