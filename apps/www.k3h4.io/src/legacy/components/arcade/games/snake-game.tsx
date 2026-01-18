import { useEffect, useMemo } from "react";
import { useFrame } from "@react-three/fiber";

import { useSnakeStore, type SnakeState } from "./snake-store";

const grid = 10;
const halfGrid = grid / 2;
const minX = -halfGrid;
const maxX = halfGrid;
const minY = -halfGrid;
const maxY = halfGrid;

const randInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

const randomFood = (snake: Array<[number, number]>): [number, number] => {
    for (let i = 0; i < 25; i += 1) {
        const fx = randInt(minX, maxX);
        const fy = randInt(minY, maxY);
        if (!snake.some(([sx, sy]) => sx === fx && sy === fy)) return [fx, fy];
    }
    return [2, 2];
};

const isOpposite = (a: [number, number], b: [number, number]) => a[0] === -b[0] && a[1] === -b[1];

const resetState = (): Partial<SnakeState> => ({ snake: [[0, 0]], dir: [1, 0], food: randomFood([[0, 0]]), tick: 0 });

export function SnakeGame() {
    const store = useSnakeStore();
    const { snake, food } = store.useShallow((state) => ({ snake: state.snake, food: state.food }));

    const borderPositions = useMemo(() => {
        const y = 0.2;
        const inset = 0.5;
        return new Float32Array([
            minX - inset, y, minY - inset,
            maxX + inset, y, minY - inset,
            maxX + inset, y, maxY + inset,
            minX - inset, y, maxY + inset,
            minX - inset, y, minY - inset,
        ]);
    }, []);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            const nextDir: [number, number] | null =
                e.key === "w" || e.key === "W"
                    ? [0, -1]
                    : e.key === "s" || e.key === "S"
                        ? [0, 1]
                        : e.key === "a" || e.key === "A"
                            ? [-1, 0]
                            : e.key === "d" || e.key === "D"
                                ? [1, 0]
                                : null;
            if (!nextDir) return;
            store.setState((state) => (isOpposite(state.dir, nextDir) ? {} : { dir: nextDir }));
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [store]);

    useFrame((_, delta) => {
        store.setState((state): Partial<SnakeState> => {
            const tick = state.tick + delta;
            if (tick < 0.35) return { tick };
            const head = state.snake[0];
            const nextHead: [number, number] = [head[0] + state.dir[0], head[1] + state.dir[1]];
            const hitWall =
                nextHead[0] < minX ||
                nextHead[0] > maxX ||
                nextHead[1] < minY ||
                nextHead[1] > maxY;
            const hitSelf = state.snake.some(([sx, sy]) => sx === nextHead[0] && sy === nextHead[1]);
            if (hitWall || hitSelf) return resetState();
            const nextSnake = [nextHead, ...state.snake];
            const ate = nextHead[0] === state.food[0] && nextHead[1] === state.food[1];
            if (!ate) nextSnake.pop();
            const nextFood: [number, number] = ate ? randomFood(nextSnake) : state.food;
            return { snake: nextSnake, food: nextFood, tick: 0 };
        });
    });

    return (
        <group position={[0, 0, 0]}>
            <ambientLight intensity={0.4} />
            <pointLight position={[0, 6, 6]} intensity={1} />
            <lineLoop position={[0, 0.15, 0]} renderOrder={10}>
                <bufferGeometry attach="geometry">
                    <bufferAttribute attach="attributes-position" args={[borderPositions, 3]} count={5} itemSize={3} />
                </bufferGeometry>
                <lineBasicMaterial color="#fcd34d" depthTest={false} transparent opacity={0.95} />
            </lineLoop>
            {snake.map((segment, idx) => (
                <mesh key={idx} position={[segment[0], 0.2, segment[1]]}>
                    <boxGeometry args={[0.8, 0.4, 0.8]} />
                    <meshStandardMaterial color={idx === 0 ? "#22c55e" : "#10b981"} />
                </mesh>
            ))}
            <mesh position={[food[0], 0.2, food[1]]}>
                <sphereGeometry args={[0.35, 16, 16]} />
                <meshStandardMaterial color="#f97316" emissive="#f97316" emissiveIntensity={0.4} />
            </mesh>
        </group>
    );
}
