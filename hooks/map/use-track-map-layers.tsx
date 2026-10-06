import { useVesselData, useVesselTrackData } from "./use-data/use-vessel-data";
import { usePortData } from "./use-data/use-port-data";
import {
    useVesselLayers,
    useTrackVesselLayers,
} from "./use-layer/use-vessel-layer";
import { usePortLayers } from "./use-layer/use-port-layer";
import { MapBounds } from "@/hooks/map/use-map-bounds";
import { useCallback } from "react";
import { PickingInfo } from "deck.gl";
import { ScatterplotLayer } from "@deck.gl/layers";
import type { Layer } from "@deck.gl/core";

export interface TrackMapProps {
    bounds: MapBounds | null;
    trackMmsi: number | null;
    from: Date | null;
    to: Date | null;
    zoom: number | null;
    theme: "light" | "dark";
    isMapLoaded: boolean;
}

const EMPTY_BOUNDS = { minLat: 0, minLng: 0, maxLat: 0, maxLng: 0 };

export function useTrackMapLayers({
    bounds,
    trackMmsi,
    from,
    to,
    zoom,
    theme,
    isMapLoaded,
}: TrackMapProps) {
    const { data: vesselData } = useVesselData(
        isMapLoaded,
        bounds ?? EMPTY_BOUNDS,
        []
    );

    const { data: trackData } = useVesselTrackData(
        isMapLoaded && trackMmsi !== null && from !== null && to !== null,
        trackMmsi ?? 0,
        from ?? new Date(),
        to ?? new Date()
    );

    const { data: portData } = usePortData(
        isMapLoaded,
        bounds ?? EMPTY_BOUNDS,
        zoom ?? 0
    );

    const port = usePortLayers(portData ?? null, theme);

    const vessel = useVesselLayers(vesselData ?? null, theme);

    const trackVessel = useTrackVesselLayers(trackData ?? null, theme);

    const onHover = useCallback(
        (info: PickingInfo) => {
            if (info.layer?.id === "vessels" && info.object) {
                port.clearHover();
                vessel.onHover(info);
                return;
            }

            if (info.layer?.id === "ports" && info.object) {
                vessel.clearHover();
                port.onHover(info);
                return;
            }

            // Track selbst ignorieren
            vessel.clearHover();
            port.clearHover();
        },
        [vessel.onHover, vessel.clearHover, port.onHover, port.clearHover]
    );

    return {
        layers: [...trackVessel.layers, ...port.layers, ...vessel.layers],
        onHover: onHover,
        onClick: vessel.onClick,
        hoveredVessel: vessel.hoveredVessel,
        selectedVessel: vessel.selectedVessel,
        hoveredPort: port.hoveredPort,
    };
}
