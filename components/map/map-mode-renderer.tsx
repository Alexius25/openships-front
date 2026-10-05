import MapMode from "@/types/map-mode";
import { MapBounds } from "@/hooks/map/use-map-bounds";

export interface MapModeRendererProps {
    mode: MapMode;
    bounds: MapBounds | null;
    zoom: number | null;
    theme: "light" | "dark";
    isMapLoaded: boolean;
}

export function MapModeRenderer({
    mode: _mode,
    bounds: _bounds,
    zoom: _zoom,
    theme: _theme,
    isMapLoaded: _isMapLoaded,
}: MapModeRendererProps) {
    return null;
}
