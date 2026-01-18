import "./index.css";

export default function App() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-slate-100">
            <div className="max-w-xl space-y-3 text-center">
                <p className="text-xs uppercase tracking-[0.22em] text-slate-400">K3H4 Atlas</p>
                <h1 className="text-3xl font-semibold">Re-scaffold in progress</h1>
                <p className="text-sm text-slate-300">
                    Existing frontend has been quarantined under <span className="font-semibold">src/legacy</span>. Build the new Atlas surface here.
                </p>
            </div>
        </main>
    );
}
