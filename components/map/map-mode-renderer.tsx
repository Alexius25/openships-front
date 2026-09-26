import MapMode from "@/types/map-mode";
import NormalMap from "@/hooks/map/use-normal-map-layers";
import { MapBounds } from "@/hooks/map/use-map-bounds";
// import TrackMap from "@/components/map/modes/track-map-mode";
// import HistoryMap from "@/components/map/modes/history-map-mode";

export interface MapModeRendererProps {
    mode: MapMode;
    bounds: MapBounds | null;
    zoom: number | null;
    theme: "light" | "dark";
    isMapLoaded: boolean;
}

export function MapModeRenderer({
    mode,
    bounds,
    zoom,
    theme,
    isMapLoaded,
}: MapModeRendererProps) {
    switch (mode.type) {
        case "normal":
            return (
                <NormalMap
                    bounds={bounds}
                    zoom={zoom}
                    theme={theme}
                    isMapLoaded={isMapLoaded}
                />
            );

        /*
        case "track":
            return (
                <TrackMap
                    {...props}
                    mmsi={props.mode.mmsi}
                />
            );

        case "history":
            return (
                <HistoryMap
                    {...props}
                    mmsi={props.mode.mmsi}
                    from={props.mode.from}
                    to={props.mode.to}
                />
            );
            */
    }
}
