import { useControl } from "react-map-gl/maplibre";
import { MapLibreOverlay, MapLibreOverlayProps } from "@deck.gl/maplibre";

export function DeckGLOverlay(props: MapLibreOverlayProps) {
    const overlay = useControl<MapLibreOverlay>(() => new MapLibreOverlay({}));

    overlay.setProps(props);

    return null;
}
