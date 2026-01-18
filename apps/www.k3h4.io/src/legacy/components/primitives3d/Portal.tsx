import { Float, Html } from "@react-three/drei";
import type { ReactNode } from "react";

export type PortalProps = {
    position: [number, number, number];
    accent: string;
    label: string;
    glyph?: string;
    description?: string;
    onSelect: () => void;
    children?: ReactNode;
};

export function Portal({ position, accent, label, glyph, description, onSelect, children }: PortalProps) {
    return (
        <Float speed={1.4} floatIntensity={0.8} rotationIntensity={0.25}>
            <mesh position={position} onClick={onSelect} castShadow receiveShadow>
                <torusKnotGeometry args={[0.6, 0.18, 128, 16]} />
                <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.45} metalness={0.6} roughness={0.25} />
            </mesh>
            <Html position={[position[0], position[1] + 1.8, position[2]]} center transform distanceFactor={6} className="select-none">
                <button
                    type="button"
                    onClick={onSelect}
                    className="group rounded-full border border-white/10 bg-slate-900/80 px-4 py-2 text-left text-xs font-semibold text-slate-50 shadow-lg backdrop-blur hover:border-white/30"
                >
                    <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full" style={{ background: accent }} />
                        <span className="text-[11px] uppercase tracking-[0.22em] text-slate-300">{glyph ? `${glyph} ${label}` : label}</span>
                    </div>
                    {description ? <p className="mt-1 max-w-[240px] text-[11px] text-slate-300/90">{description}</p> : null}
                </button>
            </Html>
            {children}
        </Float>
    );
}
