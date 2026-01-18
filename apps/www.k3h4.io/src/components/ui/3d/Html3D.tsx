import { Html } from "@react-three/drei";
import type { ReactNode } from "react";

export type Html3DProps = {
    position?: [number, number, number];
    distanceFactor?: number;
    alignCenter?: boolean;
    children: ReactNode;
};

export function Html3D({ position = [0, 0, 0], distanceFactor = 8, alignCenter = true, children }: Html3DProps) {
    return (
        <Html position={position} center={alignCenter} transform distanceFactor={distanceFactor} className="select-none">
            {children}
        </Html>
    );
}
