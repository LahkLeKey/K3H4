import { ActorEntityDashboard } from "../components/radix-components/ActorEntityDashboard";
import { StarfieldLayout } from "../components/radix-components/StarfieldLayout";

export function ActorEntityPage() {
    return (
        <StarfieldLayout
            gradientClassName="bg-[radial-gradient(circle_at_18%_20%,rgba(148,163,184,0.18),transparent_42%),radial-gradient(circle_at_80%_18%,rgba(14,165,233,0.16),transparent_42%),radial-gradient(circle_at_65%_82%,rgba(34,197,94,0.16),transparent_40%)]"
            className="bg-slate-950 text-white"
            contentClassName="mx-auto flex w-full max-w-[96rem] flex-1 flex-col gap-6 px-6 py-10"
        >
            <ActorEntityDashboard />
        </StarfieldLayout>
    );
}
