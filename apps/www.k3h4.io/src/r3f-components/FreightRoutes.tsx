import { Line } from "@react-three/drei";
import { useMemo } from "react";
import * as THREE from "three";

import type { FreightLoad } from "../react-hooks/freight";
import { RoutePath } from "../r3f-primitives";

export type FreightRoutesProps = {
    loads: FreightLoad[];
    accent?: string;
};

const scale = 0.08;

export function FreightRoutes({ loads, accent = "#fbbf24" }: FreightRoutesProps) {
    const paths = useMemo(() => {
        if (!loads.length) return [] as Array<{ id: string; line: THREE.Vector3[]; geo?: unknown }>;
        const centerLat = loads.reduce((sum, l) => sum + l.originLat + l.destinationLat, 0) / (loads.length * 2);
        const centerLng = loads.reduce((sum, l) => sum + l.originLng + l.destinationLng, 0) / (loads.length * 2);

        return loads.map((load) => {
            const start = new THREE.Vector3((load.originLng - centerLng) * scale, 0.02, (load.originLat - centerLat) * scale);
            const end = new THREE.Vector3((load.destinationLng - centerLng) * scale, 0.02, (load.destinationLat - centerLat) * scale);
            return { id: load.id, line: [start, end], geo: load.routeGeoJson };
        });
    }, [loads]);

    if (paths.length === 0) return null;

    return (
        <group>
            {paths.map((path) => (
                <group key={path.id}>
                    <Line points={path.line} color={accent} opacity={0.85} linewidth={3} transparent />
                    {path.geo ? <RoutePath geojson={path.geo} color={accent} opacity={0.4} width={2} /> : null}
                </group>
            ))}
        </group>
    );
}
