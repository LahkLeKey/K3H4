import { AppShell } from "@/components/ui";

type MapPageProps = {
    showNav?: boolean;
};

export function MapPage({ showNav = true }: MapPageProps) {
    return <AppShell showNav={showNav} />;
}
