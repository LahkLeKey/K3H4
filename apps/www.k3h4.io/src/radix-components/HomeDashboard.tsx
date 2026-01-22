import { useAuthStore } from "@/react-hooks/auth";
import { SessionPanel } from "./auth/SessionPanel";

export function HomeDashboard() {
    const { session } = useAuthStore();

    if (!session) {
        return (
            <div className="flex flex-1 items-center justify-center rounded-2xl border border-white/10 bg-slate-900/80 p-6 text-sm text-slate-200 shadow-2xl backdrop-blur">
                Sign in to view your session details.
            </div>
        );
    }

    return (
        <div className="flex flex-1 items-center justify-center">
            <SessionPanel session={session} variant="page" />
        </div>
    );
}
