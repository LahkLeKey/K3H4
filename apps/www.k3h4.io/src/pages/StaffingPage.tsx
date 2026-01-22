import { StaffingDashboard } from "../radix-components/StaffingDashboard";
import { StarfieldLayout } from "../radix-components/StarfieldLayout";

export function StaffingPage() {
    const gradient = "bg-[radial-gradient(circle_at_18%_22%,rgba(16,185,129,0.14),transparent_42%),radial-gradient(circle_at_78%_18%,rgba(59,130,246,0.12),transparent_38%),radial-gradient(circle_at_68%_78%,rgba(14,165,233,0.12),transparent_42%)]";

    return (
        <StarfieldLayout gradientClassName={gradient} contentClassName="mx-auto flex w-full max-w-6xl flex-1 flex-col">
            <StaffingDashboard />
        </StarfieldLayout>
    );
}
