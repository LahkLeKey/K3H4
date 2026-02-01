import { FullscreenCanvasLayout } from "../components/r3f-components/FullscreenCanvasLayout";

export function EnginePage() {
    return (
        <FullscreenCanvasLayout showDebugBorder>
            <ambientLight intensity={0.6} />
            <directionalLight position={[4, 4, 6]} intensity={0.9} />
            <mesh>
                <boxGeometry args={[1.5, 1.5, 1.5]} />
                <meshStandardMaterial color="#38bdf8" roughness={0.35} metalness={0.1} />
            </mesh>
        </FullscreenCanvasLayout>
    );
}
