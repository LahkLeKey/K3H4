import React from "react";
import { Canvas } from "@react-three/fiber";
import { CampfireFlame } from "../../r3f-components/CampfireFlame";
import { FireExplosion } from "../../r3f-components/FireExplosion";

export class UiErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean; message?: string }> {
    constructor(props: { children: React.ReactNode }) {
        super(props);
        this.state = { hasError: false, message: undefined };
    }

    static getDerivedStateFromError(error: unknown) {
        const message = error instanceof Error ? error.message : "Unexpected error";
        return { hasError: true, message };
    }

    componentDidCatch(error: unknown, info: unknown) {
        console.error("UI boundary caught error", error, info);
    }

    private handleRetry = () => {
        this.setState({ hasError: false, message: undefined });
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="absolute inset-0 z-[998] flex items-center justify-center px-6" style={{ pointerEvents: "auto" }}>
                    <Canvas
                        className="absolute inset-0"
                        dpr={[1, 2]}
                        camera={{ position: [0, 1.1, 2.4], fov: 55 }}
                        gl={{ antialias: true, alpha: true }}
                        onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
                    >
                        <ambientLight intensity={0.4} />
                        <pointLight position={[0.4, 1.2, 1]} intensity={0.8} color={"#ff8a00"} />
                        <CampfireFlame size={0.85} intensity={0.65} lightIntensity={0.8} />
                        <group scale={0.25}>
                            <FireExplosion size={0.03} scale={0.25} />
                        </group>
                    </Canvas>

                    <div className="absolute left-1/2 top-1/2 z-10 flex w-[380px] max-w-[92vw] -translate-x-1/2 -translate-y-1/2 flex-col items-center rounded-xl border border-amber-200/50 bg-slate-950/92 px-4 py-3 text-center text-white shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
                        <div className="w-full rounded-lg bg-black/88 px-4 py-4 shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
                            <div className="text-base font-semibold text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.55)]">Fire be happening 🔥</div>
                            <div className="mt-2 text-xs text-amber-50 drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
                                {this.state.message ?? "The UI yeeted itself into the void."}
                            </div>
                            <div className="mt-3 flex justify-center gap-2">
                                <button
                                    type="button"
                                    onClick={this.handleRetry}
                                    className="rounded-md bg-amber-300 px-3 py-1 text-xs font-semibold text-slate-900 shadow hover:bg-amber-200"
                                >
                                    Retry
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        return <>{this.props.children}</>;
    }
}
