import { createStore, useLocalStore, type StoreWithShallow } from "../../../lib/store";

export type SnakeState = {
  snake: Array<[number, number]>;
  dir: [number, number];
  food: [number, number];
  tick: number;
};

const initialState = (): SnakeState => ({
  snake: [[0, 0]],
  dir: [1, 0],
  food: [2, 2],
  tick: 0,
});

const initializer = () => initialState();

export const createSnakeStore = (): StoreWithShallow<SnakeState> => createStore<SnakeState>((_set, _get) => initializer());

export const useSnakeStore = (): StoreWithShallow<SnakeState> => useLocalStore<SnakeState>((_set, _get) => initializer());
