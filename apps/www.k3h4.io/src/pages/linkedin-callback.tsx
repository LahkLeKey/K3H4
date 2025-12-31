
import { useEffect, useMemo, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CallbackStatusCard } from "../components/callback-status-card";
import { useAuthProfile } from "../hooks/use-auth-profile";

export function LinkedinCallbackPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const hasRun = useRef(false);
    const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
    const code = searchParams.get("code");
    const errorParam = searchParams.get("error");
    const { authStatus, authMessage, redirectUri, completeLinkedinCallback, setAuthState } = useAuthProfile();

    useEffect(() => {
        const run = async () => {
            if (hasRun.current) return;
            hasRun.current = true;

            if (errorParam) {
                setAuthState("error", errorParam);
                return;
            }
            if (!code) {
                setAuthState("error", "Missing authorization code");
                return;
            }
            const result = await completeLinkedinCallback(code, redirectUri);
            if (result.ok) {
                setTimeout(() => navigate("/", { replace: true }), 600);
            }
        };
        run();
    }, [code, completeLinkedinCallback, errorParam, navigate, redirectUri, setAuthState]);

    return (
        <CallbackStatusCard
            authStatus={authStatus}
            authMessage={authMessage || ""}
            onRestart={() => navigate("/", { replace: true })}
            onContinue={() => navigate("/", { replace: true })}
        />
    );
}
