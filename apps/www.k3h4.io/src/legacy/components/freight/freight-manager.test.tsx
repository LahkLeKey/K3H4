import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

import { FreightManager } from "./freight-manager";

const mockUseFreightLoadsQuery = vi.fn();
const mockUseCreateFreightMutation = vi.fn();
const mockUseCompleteFreightMutation = vi.fn();

vi.mock("../../hooks/use-freight-queries", () => ({
    useFreightLoadsQuery: (...args: unknown[]) => mockUseFreightLoadsQuery(...args),
    useCreateFreightMutation: (...args: unknown[]) => mockUseCreateFreightMutation(...args),
    useCompleteFreightMutation: (...args: unknown[]) => mockUseCompleteFreightMutation(...args),
}));

// Minimal maplibre stub to satisfy map interactions
vi.mock("maplibre-gl", () => {
    class Map {
        constructor(_: any) { }
        getCanvas() { return { addEventListener: vi.fn() }; }
        addControl = vi.fn();
        on = vi.fn((event: string, cb: () => void) => { if (event === "load" || event === "style.load") cb(); });
        once = vi.fn((_: string, cb: () => void) => cb());
        resize = vi.fn();
        addLayer = vi.fn();
        addSource = vi.fn();
        removeLayer = vi.fn();
        removeSource = vi.fn();
        isStyleLoaded = vi.fn(() => true);
        getLayer = vi.fn(() => null);
        getSource = vi.fn(() => null);
        fitBounds = vi.fn();
        setCenter = vi.fn();
        setZoom = vi.fn();
        remove = vi.fn();
    }
    class Marker {
        setLngLat = vi.fn(() => this);
        addTo = vi.fn(() => this);
    }
    class Popup {
        setLngLat = vi.fn(() => this);
        setDOMContent = vi.fn(() => this);
        addTo = vi.fn(() => this);
        remove = vi.fn();
    }
    class NavigationControl { }
    class LngLatBounds {
        constructor(_: any, __?: any) { }
        extend = vi.fn(() => this);
        isEmpty = vi.fn(() => false);
    }
    const defaultExport = { Map, Marker, Popup, NavigationControl, LngLatBounds };
    return { __esModule: true, default: defaultExport, Map, Marker, Popup, NavigationControl, LngLatBounds };
});

beforeEach(() => {
    mockUseFreightLoadsQuery.mockReset();
    mockUseCreateFreightMutation.mockReset();
    mockUseCompleteFreightMutation.mockReset();
});

describe("FreightManager", () => {
    it("creates and completes loads", async () => {
        const completeLoad = { mutateAsync: vi.fn(async () => ({})), isPending: false };
        const createLoad = { mutateAsync: vi.fn(async () => ({})), isPending: false };
        mockUseFreightLoadsQuery.mockReturnValue({
            data: [
                {
                    id: "l1",
                    title: "Load One",
                    originName: "A",
                    originLat: 1,
                    originLng: 2,
                    destinationName: "B",
                    destinationLat: 3,
                    destinationLng: 4,
                    status: "created",
                    durationMinutes: 10,
                    distanceKm: 20,
                    cost: 5,
                },
                {
                    id: "l2",
                    title: "Done",
                    originName: "C",
                    originLat: 5,
                    originLng: 6,
                    destinationName: "D",
                    destinationLat: 7,
                    destinationLng: 8,
                    status: "completed",
                    durationMinutes: 2,
                    distanceKm: 4,
                    cost: 1,
                },
            ],
            isLoading: false,
            error: null,
        });
        mockUseCreateFreightMutation.mockReturnValue(createLoad);
        mockUseCompleteFreightMutation.mockReturnValue(completeLoad);

        render(<FreightManager apiBase="api" userEmail="me@test.com" />);

        fireEvent.click(screen.getByRole("button", { name: /Create load/i }));
        await waitFor(() => expect(createLoad.mutateAsync).toHaveBeenCalled());

        fireEvent.click(screen.getByText(/Load One/));
        fireEvent.click(screen.getByRole("button", { name: /Mark delivered/i }));
        await waitFor(() => expect(completeLoad.mutateAsync).toHaveBeenCalledWith({ id: "l1" }));

        expect(screen.getByText(/Freight manager/)).toBeInTheDocument();
        expect(screen.getByText(/Load One/)).toBeInTheDocument();
        fireEvent.click(screen.getByRole("button", { name: /Show completed/i }));
        expect(screen.getByText(/Done/)).toBeInTheDocument();
    });
});
