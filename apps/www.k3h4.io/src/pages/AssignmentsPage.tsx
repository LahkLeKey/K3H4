import { AssignmentsDashboard } from "../radix-components/AssignmentsDashboard";
import { StarfieldLayout } from "../radix-components/StarfieldLayout";

export function AssignmentsPage() {
    const gradient = "bg-[radial-gradient(circle_at_15%_20%,rgba(52,211,153,0.12),transparent_45%),radial-gradient(circle_at_80%_12%,rgba(56,189,248,0.12),transparent_42%),radial-gradient(circle_at_70%_82%,rgba(236,72,153,0.12),transparent_40%)]";

    return (
        <StarfieldLayout gradientClassName={gradient} contentClassName="mx-auto flex w-full max-w-6xl flex-1 flex-col">
            <AssignmentsDashboard />
        </StarfieldLayout>
    );
}
