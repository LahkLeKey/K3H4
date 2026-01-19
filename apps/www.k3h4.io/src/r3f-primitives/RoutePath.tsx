import { Line } from "@react-three/drei";
import { useMemo } from "react";
import * as THREE from "three";

export type RoutePathProps = {
    geojson?: unknown;
    color?: string;
    opacity?: number;
    width?: number;
};

const extractCoordinates = (value: unknown): number[][] => {
    if (!value || typeof value !== "object") return [];

    const pick = (coords: unknown): number[][] => {
        if (!Array.isArray(coords)) return [];
        if (coords.length === 0) return [];
        if (typeof coords[0]?.[0] === "number") return coords as number[][];
        if (Array.isArray(coords[0])) return pick(coords[0]);
        return [];
    };

    if ("coordinates" in (value as any)) return pick((value as any).coordinates);
    if ("features" in (value as any) && Array.isArray((value as any).features)) {
        const featCoords = (value as any).features
            .map((f: any) => (f?.geometry ? pick(f.geometry.coordinates) : []))
            .find((coords: number[][]) => coords.length > 0);
        if (featCoords) return featCoords;
    }
    return [];
};

export function RoutePath({ geojson, color = "#fbbf24", opacity = 0.9, width = 3 }: RoutePathProps) {
    const points = useMemo(() => {
        const coords = extractCoordinates(geojson);
        const clamped = coords.slice(0, 400);
        return clamped.map((coord) => new THREE.Vector3(coord[0] ?? 0, 0, coord[1] ?? 0));
    }, [geojson]);

    if (points.length < 2) return null;

    return <Line points={points} color={color} opacity={opacity} linewidth={width} transparent />;
}
