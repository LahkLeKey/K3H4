import { StarfieldLayout } from "@/radix-components/StarfieldLayout";
import { HomeDashboard } from "@/radix-components/HomeDashboard";

export function HomePage() {
    const gradient = "bg-[radial-gradient(circle_at_20%_20%,rgba(168,85,247,0.12),transparent_40%),radial-gradient(circle_at_75%_10%,rgba(56,189,248,0.12),transparent_38%),radial-gradient(circle_at_70%_80%,rgba(34,197,94,0.12),transparent_38%)]";

    return (
        <StarfieldLayout gradientClassName={gradient} contentClassName="mx-auto flex w-full max-w-6xl flex-1 flex-col px-6 py-10">
            <HomeDashboard />
        </StarfieldLayout>
    );
}
