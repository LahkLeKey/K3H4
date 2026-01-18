import { Canvas } from "@react-three/fiber";
import { Html, OrbitControls, Stars } from "@react-three/drei";

import { useLocalStore } from "../../lib/store";
import { SnakeGame } from "./games/snake-game";

type GameKey = "snake";

const gameLabel: Record<GameKey, string> = {
    snake: "Snake",
};

const gameHint: Record<GameKey, string> = {
    snake: "Snake: WASD to move",
};

export function ArcadeGames() {
    const store = useLocalStore<{ activeGame: GameKey }>(() => ({ activeGame: "snake" }));
    const { activeGame } = store.useShallow((state) => ({ activeGame: state.activeGame }));

    return (
        <div className="relative h-[420px] overflow-hidden rounded-2xl border bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
            <div className="absolute z-10 m-3 flex gap-2 rounded-full bg-black/40 p-2 text-xs text-white backdrop-blur">
                <button
                    className="rounded-full px-3 py-1 bg-white/90 text-black"
                >
                    {gameLabel.snake}
                </button>
            </div>
            <Canvas camera={{ position: [0, 12, 0.001], fov: 45 }} shadows>
                <color attach="background" args={["#030712"]} />
                <OrbitControls
                    enableZoom={false}
                    enableRotate={false}
                    enablePan={false}
                    target={[0, 0, 0]}
                    minPolarAngle={0.01}
                    maxPolarAngle={0.01}
                />
                <Stars radius={30} depth={40} count={1200} factor={2.5} saturation={0} fade speed={1} />
                {activeGame === "snake" ? <SnakeGame /> : null}
                <Html position={[-8, 5, 0]} className="pointer-events-none select-none text-left text-xs text-muted-foreground">
                    <div className="rounded-md bg-background/85 px-3 py-2 shadow">{gameHint[activeGame]}</div>
                </Html>
            </Canvas>
        </div>
    );
}
