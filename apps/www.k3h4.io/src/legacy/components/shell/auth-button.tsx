import { User } from "lucide-react";

import { Button } from "../ui/button";
import type { AuthStatus } from "../../stores/auth-store";

export type AuthButtonProps = {
    userEmail: string | null;
    authStatus: AuthStatus;
    onClick: () => void;
};

export function AuthButton({ userEmail, authStatus, onClick }: AuthButtonProps) {
    return (
        <Button
            variant="ghost"
            size="icon"
            aria-label={userEmail ? `Signed in as ${userEmail}` : "Sign in with GitHub"}
            onClick={onClick}
            disabled={authStatus === "loading"}
        >
            <User className="h-4 w-4" />
        </Button>
    );
}
