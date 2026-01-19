import type { ComponentType, ReactElement } from "react";
import { R3FErrorBoundary } from "./R3FErrorBoundary";

export function withR3FErrorBoundary<TProps extends Record<string, unknown>>(Component: ComponentType<TProps>) {
    return function WrappedWithBoundary(props: TProps): ReactElement {
        return (
            <R3FErrorBoundary>
                <Component {...props} />
            </R3FErrorBoundary>
        );
    };
}
