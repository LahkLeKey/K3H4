import { StorefrontsDashboard } from "../radix-components/storefronts/StorefrontsDashboard";
import { StarfieldLayout } from "../radix-components/StarfieldLayout";

export function StorefrontsPage() {
    return (
        <StarfieldLayout
            gradientClassName="bg-[radial-gradient(circle_at_16%_20%,rgba(244,114,182,0.14),transparent_42%),radial-gradient(circle_at_82%_18%,rgba(244,114,255,0.12),transparent_42%),radial-gradient(circle_at_70%_82%,rgba(34,211,238,0.14),transparent_40%)]"
            className="bg-slate-950 text-white"
        >
            <StorefrontsDashboard />
        </StarfieldLayout>
    );
}
