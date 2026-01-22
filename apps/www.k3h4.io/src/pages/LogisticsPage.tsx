import { LogisticsDashboard } from "../radix-components/LogisticsDashboard";
import { StarfieldLayout } from "../radix-components/StarfieldLayout";

export function LogisticsPage() {
    return (
        <StarfieldLayout
            gradientClassName="bg-[radial-gradient(circle_at_20%_18%,rgba(251,191,36,0.12),transparent_42%),radial-gradient(circle_at_78%_16%,rgba(59,130,246,0.14),transparent_42%),radial-gradient(circle_at_62%_82%,rgba(16,185,129,0.14),transparent_40%)]"
            className="bg-slate-950 text-white"
        >
            <LogisticsDashboard />
        </StarfieldLayout>
    );
}
