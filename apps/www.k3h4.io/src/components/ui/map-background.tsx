import { useEffect, useRef } from "react"
import maplibregl, { type Map } from "maplibre-gl"

import "maplibre-gl/dist/maplibre-gl.css"

import { cn } from "../../lib/utils"

export type MapBackgroundProps = {
    className?: string
    /** Override the default Hastings, MN center. */
    center?: [number, number]
    /** Zoom level; defaults to a city overview. */
    zoom?: number
    /** Disable user interaction when you want a fixed backdrop. */
    interactive?: boolean
}

const DEFAULT_CENTER: [number, number] = [-92.851, 44.743]
const DEFAULT_ZOOM = 12

export function MapBackground({
    className,
    center = DEFAULT_CENTER,
    zoom = DEFAULT_ZOOM,
    interactive = false,
}: MapBackgroundProps) {
    const mapRef = useRef<HTMLDivElement | null>(null)
    const instanceRef = useRef<Map | null>(null)

    useEffect(() => {
        if (!mapRef.current) return

        instanceRef.current = new maplibregl.Map({
            container: mapRef.current,
            style: "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json",
            center,
            zoom,
            interactive,
            attributionControl: false,
        })

        instanceRef.current.on("error", (event) => {
            // Surface map errors to the console to debug missing tiles/styles.
            console.warn("MapLibre error", event?.error ?? event)
        })

        // Subtle accent stroke to match the theme palette.
        instanceRef.current.once("load", () => {
            const map = instanceRef.current
            if (!map) return

            const paintUpdates: Array<
                [layer: string, property: string, value: string]
            > = [
                    ["water", "fill-color", "hsl(200, 80%, 68%)"],
                    ["landuse", "fill-color", "hsl(205, 33%, 96%)"],
                    ["park", "fill-color", "hsl(158, 38%, 28%)"],
                    ["waterway", "line-color", "hsl(200, 75%, 58%)"],
                    ["road", "line-color", "hsl(158, 38%, 28%)"],
                ]

            paintUpdates.forEach(([layer, property, value]) => {
                if (map.getLayer(layer)) {
                    map.setPaintProperty(layer, property, value)
                }
            })
        })

        return () => {
            instanceRef.current?.remove()
            instanceRef.current = null
        }
    }, [center, zoom, interactive])

    return (
        <div className={cn("map-shell", className)}>
            <div
                ref={mapRef}
                className={cn(
                    "map-shell__map",
                    "[&_.maplibregl-canvas-container]:!h-full [&_.maplibregl-canvas-container]:!w-full",
                    "[&_.maplibregl-canvas]:rounded-[1.25rem]"
                )}
            />
        </div>
    )
}
