import { Html } from "@react-three/drei";
import { TABLE_HEIGHT } from "./bank-constants";
import { useBankStore } from "./bank-store";

export function LedgerStand() {
    const { title, entries, ledgerPage, totalPages, setLedgerPage } = useBankStore((state) => ({
        title: state.ledgerTitle,
        entries: state.ledgerEntries,
        ledgerPage: state.ledgerPage,
        totalPages: state.ledgerTotalPages,
        setLedgerPage: state.setLedgerPage,
    }));

    const formattedEntries = entries.map((entry) => {
        const amount = Number.parseFloat(String(entry.amount ?? 0)) || 0;
        const directionSign = amount >= 0 ? "+" : "";
        const balance = Number.parseFloat(String(entry.balanceAfter ?? 0)) || 0;
        return {
            id: entry.id,
            note: entry.note || "(no note)",
            amount: `${directionSign}${amount.toFixed(2)}`,
            balance: balance.toFixed(2),
            created: entry.createdAt ? new Date(entry.createdAt).toLocaleDateString() : "",
        };
    });

    return (
        <group position={[0, TABLE_HEIGHT + 0.6, -5.2]}>
            <mesh position={[0, -0.3, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                <planeGeometry args={[3.8, 2.6]} />
                <meshStandardMaterial color="#e2e8f0" metalness={0.08} roughness={0.65} />
            </mesh>
            <Html position={[0, 0, 0]} transform style={{ pointerEvents: "auto" }}>
                <div className="w-64 rounded-lg border border-slate-200 bg-white/95 p-3 shadow-xl">
                    <div className="mb-2 flex items-center justify-between text-xs text-slate-500">
                        <span>{title}</span>
                        <span>Game view: vault</span>
                    </div>
                    <div className="space-y-1 text-xs text-slate-700">
                        {formattedEntries.length === 0 ? <p className="text-slate-400">No entries</p> : null}
                        {formattedEntries.map((row) => (
                            <div key={row.id} className="flex items-center justify-between rounded-md bg-slate-50 px-2 py-1">
                                <span className="truncate font-semibold">{row.amount}</span>
                                <span className="truncate text-slate-500">{row.note}</span>
                                <span className="text-[10px] text-slate-400">{row.created}</span>
                            </div>
                        ))}
                    </div>
                    <div className="mt-2 flex items-center justify-between text-xs text-slate-600">
                        <button className="rounded border border-slate-200 px-2 py-1 hover:bg-slate-100" onClick={() => setLedgerPage((p) => Math.max(0, p - 1))} disabled={ledgerPage === 0}>
                            Prev
                        </button>
                        <span>Page {ledgerPage + 1} / {Math.max(1, totalPages)}</span>
                        <button className="rounded border border-slate-200 px-2 py-1 hover:bg-slate-100" onClick={() => setLedgerPage((p) => Math.min(totalPages - 1, p + 1))} disabled={ledgerPage + 1 >= totalPages}>
                            Next
                        </button>
                    </div>
                </div>
            </Html>
        </group>
    );
}
