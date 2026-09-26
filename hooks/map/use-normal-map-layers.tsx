import { useVesselData } from "./use-data/use-vessel-data";
import { usePortData } from "./use-data/use-port-data";
import { useVesselLayers } from "./use-layer/use-vessel-layer";
import { usePortLayers } from "./use-layer/use-port-layer";
import { MapBounds } from "@/hooks/map/use-map-bounds";
import { useCallback } from "react";
import { PickingInfo } from "deck.gl";

export interface NormalMapProps {
    bounds: MapBounds | null;
    zoom: number | null;
    theme: "light" | "dark";
    isMapLoaded: boolean;
}

const EMPTY_BOUNDS = { minLat: 0, minLng: 0, maxLat: 0, maxLng: 0 };

export function useNormalMapLayers({
    bounds,
    zoom,
    theme,
    isMapLoaded,
}: NormalMapProps) {
    const { data: vesselData } = useVesselData(
        isMapLoaded,
        bounds ?? EMPTY_BOUNDS,
        []
    );

    const { data: portData } = usePortData(
        isMapLoaded,
        bounds ?? EMPTY_BOUNDS,
        zoom ?? 0
    );

    const port = usePortLayers(portData ?? null, theme);

    const vessel = useVesselLayers(vesselData ?? null, theme);

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

            vessel.clearHover();
            port.clearHover();
        },
        [vessel.onHover, vessel.clearHover, port.onHover, port.clearHover]
    );

    return {
        layers: [...port.layers, ...vessel.layers],
        onHover: vessel.onHover,
        onClick: vessel.onClick,
        hoveredVessel: vessel.hoveredVessel,
        selectedVessel: vessel.selectedVessel,
        hoveredPort: port.hoveredPort,
    };
}
