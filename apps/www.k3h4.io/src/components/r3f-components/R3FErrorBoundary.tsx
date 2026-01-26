import React from "react";
import { Canvas } from "@react-three/fiber";
import { FireExplosion } from "./FireExplosion";
import { CampfireFlame } from "./CampfireFlame";

/**
 * Isolates three/fiber crashes so the rest of the UI continues working.
 */
type R3FErrorState = { hasError: boolean; message?: string; stack?: string };

export class R3FErrorBoundary extends React.Component<{ children: React.ReactNode }, R3FErrorState> {
    constructor(props: { children: React.ReactNode }) {
        super(props);
        this.state = { hasError: false, message: undefined, stack: undefined };
    }

    static getDerivedStateFromError(error: unknown) {
        const message = error instanceof Error ? error.message : "Rendering error";
        return { hasError: true, message, stack: error instanceof Error ? error.stack : undefined } satisfies R3FErrorState;
    }

    componentDidCatch(error: unknown, info: unknown) {
        // Surface minimal context for diagnostics without crashing the rest of the app.
        console.error("R3F boundary caught error", error, info);
        const stack = error instanceof Error ? error.stack : undefined;
        if (stack) this.setState({ stack });
    }

    componentDidMount(): void {
        window.addEventListener("error", this.handleWindowError);
        window.addEventListener("unhandledrejection", this.handleRejection);
    }

    componentWillUnmount(): void {
        window.removeEventListener("error", this.handleWindowError);
        window.removeEventListener("unhandledrejection", this.handleRejection);
    }

    private handleWindowError = (evt: ErrorEvent) => {
        const message = evt?.message || "Runtime error";
        const stack = evt?.error instanceof Error ? evt.error.stack : undefined;
        this.setState({ hasError: true, message, stack });
    };

    private handleRejection = (evt: PromiseRejectionEvent) => {
        const reason = evt?.reason;
        const message = reason instanceof Error ? reason.message : String(reason ?? "Promise rejection");
        const stack = reason instanceof Error ? reason.stack : undefined;
        this.setState({ hasError: true, message, stack });
    };

    private handleRetry = () => {
        this.setState({ hasError: false, message: undefined, stack: undefined });
    };

    private handleCopy = async () => {
        const payload = [this.state.message ?? "R3F error", this.state.stack ?? ""].filter(Boolean).join("\n\n");
        try {
            await navigator.clipboard.writeText(payload);
        } catch (err) {
            console.error("clipboard copy failed", err);
        }
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="fixed inset-0 z-[999] flex items-center justify-center bg-slate-950" style={{ pointerEvents: "auto" }}>
                    <Canvas
                        camera={{ position: [0, 1.1, 2.4], fov: 55 }}
                        dpr={[1, 2]}
                        className="absolute inset-0"
                        gl={{ antialias: true, alpha: true }}
                        onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
                    >
                        <ambientLight intensity={0.7} />
                        <pointLight position={[0.4, 1.2, 1]} intensity={2.4} color={"#ff8a00"} />
                        <CampfireFlame />
                        <FireExplosion />
                    </Canvas>

                    <div className="relative z-10 w-[420px] max-w-[92vw] rounded-xl border border-amber-300/40 bg-slate-900/92 px-6 py-5 text-center text-slate-100 shadow-2xl backdrop-blur">
                        <div className="text-base font-semibold tracking-wide text-amber-200">3D view went boom</div>
                        <div className="mt-2 text-xs text-slate-300">{this.state.message ?? "A render error occurred."}</div>
                        {this.state.stack ? (
                            <pre className="mt-3 max-h-40 overflow-auto rounded-md bg-slate-950/80 px-3 py-2 text-left text-[11px] leading-snug text-amber-100/90 shadow-inner">
                                {this.state.stack}
                            </pre>
                        ) : null}
                        <div className="mt-3 flex items-center justify-center gap-2 text-[11px] text-slate-400">
                            <button
                                type="button"
                                onClick={this.handleCopy}
                                className="rounded-md bg-slate-800 px-3 py-1 font-semibold text-slate-100 shadow-sm ring-1 ring-slate-700 hover:bg-slate-700"
                            >
                                Copy error
                            </button>
                            <button
                                type="button"
                                onClick={this.handleRetry}
                                className="rounded-md bg-amber-300 px-3 py-1 font-semibold text-slate-900 shadow-sm hover:bg-amber-200"
                            >
                                Relaunch scene
                            </button>
                        </div>
                    </div>
                </div>
            );
        }

        return <>{this.props.children}</>;
    }
}
