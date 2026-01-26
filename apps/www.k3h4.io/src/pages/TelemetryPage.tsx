import { TelemetryDashboard } from "../components/radix-components/TelemetryDashboard";
import { StarfieldLayout } from "../components/radix-components/StarfieldLayout";

export function TelemetryPage() {
    return (
        <StarfieldLayout contentClassName="mx-auto flex w-full max-w-6xl flex-1 flex-col">
            <TelemetryDashboard />
        </StarfieldLayout>
    );
}
