import { BankDashboard } from "@/radix-components/BankDashboard";
import { StarfieldLayout } from "@/radix-components/StarfieldLayout";

export function BankPage() {
    const gradient = "bg-[radial-gradient(circle_at_20%_20%,rgba(16,185,129,0.12),transparent_45%),radial-gradient(circle_at_80%_10%,rgba(59,130,246,0.12),transparent_40%),radial-gradient(circle_at_70%_80%,rgba(236,72,153,0.12),transparent_40%)]";

    return (
        <StarfieldLayout gradientClassName={gradient} contentClassName="mx-auto flex w-full max-w-6xl flex-1 flex-col">
            <BankDashboard />
        </StarfieldLayout>
    );
}
