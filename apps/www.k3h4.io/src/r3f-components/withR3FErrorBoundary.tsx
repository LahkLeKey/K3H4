import React from "react";
import { R3FErrorBoundary } from "./R3FErrorBoundary";

export function withR3FErrorBoundary<TProps extends Record<string, unknown>>(Component: React.ComponentType<TProps>) {
    return function WrappedWithBoundary(props: TProps): JSX.Element {
        return (
            <R3FErrorBoundary>
                <Component {...props} />
            </R3FErrorBoundary>
        );
    };
}
