import { Html } from "@react-three/drei";
import type { ReactNode } from "react";

export type InteractableProps = {
    position: [number, number, number];
    onSelect: () => void;
    label: string;
    accent?: string;
    children: ReactNode;
};

export function Interactable({ position, onSelect, label, accent, children }: InteractableProps) {
    return (
        <group position={position}>
            <mesh onClick={onSelect} castShadow receiveShadow>
                {children}
            </mesh>
            <Html position={[0, 1.2, 0]} center transform distanceFactor={8} className="select-none">
                <button
                    type="button"
                    onClick={onSelect}
                    className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-slate-900/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-100 shadow-lg backdrop-blur"
                >
                    <span className="h-2 w-2 rounded-full" style={{ background: accent ?? "#a5f3fc" }} />
                    <span>{label}</span>
                </button>
            </Html>
        </group>
    );
}
