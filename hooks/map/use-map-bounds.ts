import { CoreMapRef } from "@/components/map/core-map";
import type { RefObject } from "react";
import { useEffect, useState } from "react";
import debounce from "lodash/debounce";

export type MapBounds = {
    minLat: number;
    minLng: number;
    maxLat: number;
    maxLng: number;
};

export function useMapBounds(
    mapRef: RefObject<CoreMapRef | null>,
    isMapLoaded: boolean
) {
    const [bounds, setBounds] = useState<MapBounds | null>(null);
    const [zoom, setZoom] = useState<number | null>(null);

    useEffect(() => {
        if (!isMapLoaded || !mapRef.current) return;

        const map = mapRef.current.getMap();

        const updateBounds = () => {
            const mapBounds = map.getBounds();

            setBounds({
                minLat: mapBounds._sw.lat,
                minLng: mapBounds._sw.lng,
                maxLat: mapBounds._ne.lat,
                maxLng: mapBounds._ne.lng,
            });

            setZoom(map.getZoom());
        };

        const debouncedUpdateBounds = debounce(updateBounds, 250);

        // Initial state
        updateBounds();

        // Updates after moving
        map.on("moveend", debouncedUpdateBounds);

        return () => {
            map.off("moveend", debouncedUpdateBounds);
            debouncedUpdateBounds.cancel();
        };
    }, [isMapLoaded, mapRef]);

    return { bounds, zoom };
}