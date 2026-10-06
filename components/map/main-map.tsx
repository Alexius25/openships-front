"use client";

import { mapStyles } from "@/lib/map-styles";
import { useCallback, useEffect, useRef, useState } from "react";
import CoreMap, { CoreMapRef } from "@/components/map/core-map";
import { useTheme } from "next-themes";
import MainMapControls from "@/components/map/main-map-controls";
import { useMapBounds } from "@/hooks/map/use-map-bounds";
import type { MapMode } from "@/types/map-mode";
import { useNormalMapLayers } from "@/hooks/map/use-normal-map-layers";
import { useTrackMapLayers } from "@/hooks/map/use-track-map-layers";
import { PickingInfo } from "deck.gl";
import { useLocale } from "next-intl";
import HoverVesselTooltip from "./tooltips/hover-vessel-tooltip";
import HoverPortTooltip from "./tooltips/hover-port-tooltip";
import SelectedVesselTooltip from "./tooltips/selected-vessel-tooltip";
import { AttributionControl } from "react-map-gl/maplibre";
import { usePrimaryInput } from "@/hooks/useIsTouchDevice";
import { useSettings } from "@/lib/settings";
import type { ViewStateChangeEvent } from "react-map-gl/maplibre";

interface MainMapProps {
    mode: MapMode;
}

type TooltipState = {
    x: number;
    y: number;
} | null;

export default function MainMap({ mode }: MainMapProps) {
    const locale = useLocale();

    const [mounted, setMounted] = useState(false);

    const [cursor, setCursor] = useState<"grab" | "crosshair" | "pointer">(
        "grab"
    );

    const { isTouch } = usePrimaryInput();

    useEffect(() => {
        setMounted(true);
    }, []);

    const mapRef = useRef<CoreMapRef | null>(null);
    const [isMapLoaded, setIsMapLoaded] = useState(false);

    const [mapStyle, setMapStyle] = useState(useSettings.getState().mapStyle);
    const activeStyleId = mapStyles.find((s) => s.styleUrl === mapStyle)?.id;

    const [tooltipPosition, setTooltipPosition] = useState<TooltipState>(null);
    const [draggablePosition, setDraggablePosition] = useState({
        x: 100,
        y: 100,
    });

    const handleMoveEnd = useCallback((event: ViewStateChangeEvent) => {
        useSettings.getState().setViewState(event.viewState);
    }, []);

    const vesselMapTheme = mapStyles.find((s) => s.styleUrl === mapStyle)?.dark
        ? "dark"
        : "light";

    const handleStyleChange = (styleUrl: string) => {
        const style = mapStyles.find((s) => s.styleUrl === styleUrl);
        if (!style) return;
        setMapStyle(styleUrl);
        useSettings.getState().setMapStyle(styleUrl);
    };

    const handleLoad = () => {
        setIsMapLoaded(true);
    };

    const { resolvedTheme } = useTheme();
    const unit = useSettings((state) => state.unit);

    const { bounds, zoom } = useMapBounds(mapRef, isMapLoaded);

    const normalLayers = useNormalMapLayers({
        bounds,
        zoom,
        theme: vesselMapTheme,
        isMapLoaded,
    });

    const trackLayers = useTrackMapLayers({
        bounds,
        trackMmsi: mode.type === "track" ? mode.mmsi : null,
        from: mode.type === "track" ? mode.from : null,
        to: mode.type === "track" ? mode.to : null,
        zoom,
        theme: vesselMapTheme,
        isMapLoaded,
    });

    const activeLayers =
        mode.type === "normal"
            ? normalLayers
            : mode.type === "track"
              ? trackLayers
              : null;

    const layers = activeLayers?.layers;

    const handleHover = useCallback(
        (info: PickingInfo) => {
            const isVessel = info.layer?.id === "vessels" && info.object;
            const isPort = info.layer?.id === "ports" && info.object;

            if (isVessel || isPort) {
                setTooltipPosition({
                    x: info.x,
                    y: info.y,
                });
            } else {
                setTooltipPosition(null);
            }

            activeLayers?.onHover(info);
        },
        [activeLayers?.onHover]
    );

    return (
        <div className="h-full min-h-0 w-full">
            <CoreMap
                ref={mapRef}
                style={mapStyle}
                layers={layers}
                initialViewState={useSettings.getState().viewState}
                onLoad={handleLoad}
                cursor={cursor}
                onMoveEnd={handleMoveEnd}
                deckProps={{
                    getCursor: ({ isHovering }) => {
                        if (isHovering) {
                            setCursor("pointer");
                            return "pointer";
                        } else {
                            setCursor("grab");
                            return "grab";
                        }
                    },
                    pickingRadius: 10,
                    onHover: handleHover,
                    onClick:
                        mode.type === "normal"
                            ? normalLayers.onClick
                            : mode.type === "track"
                              ? trackLayers.onClick
                              : undefined,
                }}
            >
                <AttributionControl
                    compact
                    customAttribution={[
                        "© <a href='https://openships.de' target='_blank' rel='noopener noreferrer'>OpenShips</a>",
                        `© <a href='/${locale}/ais/licenses' target='_blank' rel='noopener noreferrer'>AIS Data Sources</a>`,
                    ]}
                />

                {activeLayers?.hoveredVessel && tooltipPosition && (
                    <HoverVesselTooltip
                        normal={activeLayers}
                        tooltipPosition={tooltipPosition}
                        isTouch={isTouch}
                    />
                )}

                {activeLayers?.hoveredPort && tooltipPosition && (
                    <HoverPortTooltip
                        normal={activeLayers}
                        tooltipPosition={tooltipPosition}
                        isTouch={isTouch}
                    />
                )}

                <MainMapControls
                    mapStyle={mapStyle}
                    activeStyleId={activeStyleId}
                    onStyleChange={handleStyleChange}
                    unit={unit}
                    mounted={mounted}
                    resolvedTheme={resolvedTheme}
                />
            </CoreMap>

            {mounted && activeLayers?.selectedVessel && (
                <SelectedVesselTooltip
                    normal={activeLayers}
                    draggablePosition={draggablePosition}
                    setDraggablePosition={setDraggablePosition}
                    isTouch={isTouch}
                />
            )}
        </div>
    );
}
