import { Html as DreiHtml } from "@react-three/drei";
import type { ReactNode } from "react";

export type HtmlProps = {
    position?: [number, number, number];
    distanceFactor?: number;
    alignCenter?: boolean;
    children: ReactNode;
};

export function Html({ position = [0, 0, 0], distanceFactor = 8, alignCenter = true, children }: HtmlProps) {
    return (
        <DreiHtml position={position} center={alignCenter} transform distanceFactor={distanceFactor} className="select-none">
            {children}
        </DreiHtml>
    );
}
