import React from "react";
import { R3FErrorBoundary } from "./R3FErrorBoundary";

export function withR3FErrorBoundary<TProps>(Component: React.ComponentType<TProps>) {
    return function WrappedWithBoundary(props: TProps) {
        return (
            <R3FErrorBoundary>
                <Component {...props} />
            </R3FErrorBoundary>
        );
    };
}
