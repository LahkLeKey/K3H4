import { useGeoState } from "../zustand-stores/geo";

export function useGeoStatus() {
    const { status, poiStatus, center, error } = useGeoState();
    return { status, poiStatus, center, error };
}
