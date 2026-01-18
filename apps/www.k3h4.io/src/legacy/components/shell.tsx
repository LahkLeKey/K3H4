import { useEffect } from "react";

import { AtlasRoot } from "./atlas/AtlasRoot";
import { useAuthProfile } from "../hooks/use-auth-profile";
import { setTelemetryApiBase } from "../lib/telemetry";

export function Shell() {
    const { apiBase, user, profile, handleSignOut } = useAuthProfile();
    const userEmail = user.status === "authenticated" ? user.email : null;

    useEffect(() => {
        setTelemetryApiBase(apiBase);
    }, [apiBase]);

    return (
        <AtlasRoot
            userEmail={userEmail}
            profileAvatar={profile?.avatarUrl ?? null}
            onSignOut={handleSignOut}
        />
    );
}
