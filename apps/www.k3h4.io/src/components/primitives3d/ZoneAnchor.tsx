import { Html } from "@react-three/drei";

export type ZoneAnchorProps = {
    position: [number, number, number];
    label?: string;
    accent?: string;
    glyph?: string;
};

export function ZoneAnchor({ position, label, accent, glyph }: ZoneAnchorProps) {
    return (
        <group position={position}>
            <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                <ringGeometry args={[0.32, 0.4, 32]} />
                <meshStandardMaterial color={accent ?? "#7fe4d0"} emissive={accent ?? "#7fe4d0"} emissiveIntensity={0.35} metalness={0.5} roughness={0.4} />
            </mesh>
            <mesh position={[0, 0.18, 0]} castShadow>
                <sphereGeometry args={[0.08, 24, 24]} />
                <meshStandardMaterial color={accent ?? "#7fe4d0"} emissive={accent ?? "#7fe4d0"} emissiveIntensity={0.55} metalness={0.4} roughness={0.25} />
            </mesh>
            {label ? (
                <Html position={[0, 1.1, 0]} center transform distanceFactor={9} className="select-none">
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-900/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-100 shadow-lg backdrop-blur">
                        <span className="h-2 w-2 rounded-full" style={{ background: accent ?? "#7fe4d0" }} />
                        <span>{glyph ? `${glyph} ${label}` : label}</span>
                    </div>
                </Html>
            ) : null}
        </group>
    );
}
