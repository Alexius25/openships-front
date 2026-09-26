import { CoreMapRef } from "@/components/map/core-map";
import { RefObject } from "react";
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
    const [zoom, setZoom] = useState<number | null>(0);

    useEffect(() => {
        if (!isMapLoaded || !mapRef.current) return;

        const map = mapRef.current.getMap();

        const updateBounds = debounce((map) => {
            const bounds = map.getBounds();
            setBounds({
                minLat: bounds._sw.lat,
                minLng: bounds._sw.lng,
                maxLat: bounds._ne.lat,
                maxLng: bounds._ne.lng,
            });
            setZoom(map.getZoom());
        }, 250);

        map.on("moveend", () => updateBounds(map));

        return () => {
            map.off("moveend", () => updateBounds(map));
        };
    }, [isMapLoaded, mapRef]);

    return { bounds, zoom };
}
