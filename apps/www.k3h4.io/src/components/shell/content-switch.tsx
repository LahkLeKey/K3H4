import type { ReactNode } from "react";

export type ShellContentSwitchProps = {
    isCallback: boolean;
    callback: ReactNode;
    authenticated: boolean;
    signedIn: ReactNode;
    signedOut: ReactNode;
};

export function ShellContentSwitch({ isCallback, callback, authenticated, signedIn, signedOut }: ShellContentSwitchProps) {
    if (isCallback) return <>{callback}</>;
    if (authenticated) return <>{signedIn}</>;
    return <>{signedOut}</>;
}
