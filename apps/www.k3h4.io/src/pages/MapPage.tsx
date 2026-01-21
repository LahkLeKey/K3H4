import { AppShell } from "../radix-primitives/AppShell";

type MapPageProps = {
    showNav?: boolean;
};

export function MapPage({ showNav = true }: MapPageProps) {
    return <AppShell showNav={showNav} />;
}
