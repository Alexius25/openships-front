import { useCallback, useEffect, useMemo, useState } from "react";
import {
    IconLayer,
    TextLayer,
    ScatterplotLayer,
    PathLayer,
} from "@deck.gl/layers";
import { GenerateVesselIcon } from "@/lib/icons/vessel-icon";
import { Layer } from "@deck.gl/core";
import { svgToDataUrl } from "@/lib/icon-utils";
import { ApiResponse } from "@/models/api-response";
import type { VesselPositionResponse } from "@/models/vessel-position-response";
import { NavigationStatus } from "@/models/navigation-status";
import { PickingInfo } from "@deck.gl/core";
import { sharpTextFontSettings } from "@/lib/config";
import { VesselTrackResponse } from "@/models/vessel-track-response";

const vesselIconCache = new Map<string, string>();
const showVesselTimestamps = false;

function getCachedVesselIcon(
    vesselType: number,
    navigationStatus: NavigationStatus
): string {
    const cacheKey = `${vesselType}:${navigationStatus}`;

    const cachedIcon = vesselIconCache.get(cacheKey);

    if (cachedIcon) return cachedIcon;

    const generatedIcon = svgToDataUrl(
        GenerateVesselIcon(vesselType, navigationStatus)
    );

    vesselIconCache.set(cacheKey, generatedIcon);

    return generatedIcon;
}

const isStationary = (d: VesselPositionResponse) =>
    // d.sog === 0 ||
    d.navigationStatus === NavigationStatus.Moored ||
    d.navigationStatus === NavigationStatus.Anchored;

export function useVesselLayers(
    data: ApiResponse<VesselPositionResponse[]> | null,
    mapTheme: "light" | "dark"
) {
    const [now, setNow] = useState(0);

    useEffect(() => {
        const updateNow = () => setNow(Date.now());

        updateNow();

        const interval = setInterval(updateNow, 30_000);

        return () => clearInterval(interval);
    }, []);

    const [hoveredVesselMmsi, setHoveredVesselMmsi] = useState<number | null>(
        null
    );

    const [selectedVesselMmsi, setSelectedVesselMmsi] = useState<number | null>(
        null
    );

    const onHover = useCallback((info: PickingInfo) => {
        if (info.layer?.id !== "vessels" || !info.object) {
            setHoveredVesselMmsi(null);
            return;
        }

        const vessel = info.object as VesselPositionResponse;

        setHoveredVesselMmsi(vessel.mmsi);
    }, []);

    const onClick = useCallback((info: PickingInfo) => {
        if (info.layer?.id === "vessels" && info.object) {
            const vessel = info.object as VesselPositionResponse;
            setSelectedVesselMmsi(vessel.mmsi);
            return;
        }

        setSelectedVesselMmsi(null);
    }, []);

    const selectedVessel = useMemo(() => {
        if (!selectedVesselMmsi || !data?.data) {
            return null;
        }

        return (
            data.data.find((vessel) => vessel.mmsi === selectedVesselMmsi) ??
            null
        );
    }, [data, selectedVesselMmsi]);

    const hoveredVessel = useMemo(() => {
        if (!hoveredVesselMmsi || !data?.data) {
            return null;
        }

        return (
            data.data.find((vessel) => vessel.mmsi === hoveredVesselMmsi) ??
            null
        );
    }, [data, hoveredVesselMmsi]);

    const clearHover = useCallback(() => {
        setHoveredVesselMmsi(null);
    }, []);

    const layers = useMemo<Layer[]>(() => {
        if (!data?.data) return [];

        const layers: Layer[] = [
            new ScatterplotLayer({
                id: "hovered-vessel-highlight",
                data: hoveredVessel ? [hoveredVessel] : [],
                pickable: false,
                getPosition: (d) => [d.longitude, d.latitude],
                getRadius: 20,
                radiusUnits: "pixels",
                getLineColor: [0, 140, 255, 180],
                lineWidthMinPixels: 2,
                stroked: true,
                filled: false,
            }),
            new ScatterplotLayer({
                id: "selected-vessel-highlight",
                data: selectedVessel ? [selectedVessel] : [],
                pickable: false,
                getPosition: (d) => [d.longitude, d.latitude],
                getRadius: 20,
                radiusUnits: "pixels",
                getLineColor: [0, 140, 255, 180],
                lineWidthMinPixels: 2,
                stroked: true,
                filled: true,
                getFillColor: [0, 140, 255, 70],
            }),
            new IconLayer({
                id: "vessels",
                data: data.data,
                pickable: true,
                getPosition: (d: VesselPositionResponse) => [
                    d.longitude,
                    d.latitude,
                ],
                getIcon: (d: VesselPositionResponse) => ({
                    url: getCachedVesselIcon(
                        d.shipType ?? 0,
                        isStationary(d)
                            ? NavigationStatus.Anchored
                            : (d.navigationStatus ?? NavigationStatus.UnderWay)
                    ),
                    width: 400,
                    height: 400,
                }),
                getAngle: (d: VesselPositionResponse) => {
                    if (d.heading == null) return 0;

                    if (
                        d.navigationStatus === NavigationStatus.Moored ||
                        d.navigationStatus === NavigationStatus.Anchored
                    ) {
                        return 0;
                    }

                    // Correct ais heading to deck.gl
                    return (0 - d.heading + 360) % 360;
                },
                getSize: 30,
            }),
            new TextLayer({
                id: "vessel-labels",
                data: data.data,
                pickable: false,
                getPosition: (d: VesselPositionResponse) => [
                    d.longitude,
                    d.latitude,
                ],
                getText: (d: VesselPositionResponse) =>
                    d.shipName?.trimEnd() ?? "",
                getSize: 14,
                getColor: () =>
                    mapTheme === "light" ? [0, 0, 0] : [255, 255, 255],
                getAngle: () => 0,
                getAlignmentBaseline: "bottom",
                getPixelOffset: [0, -20],
                fontSettings: sharpTextFontSettings,
            }),
        ];

        if (showVesselTimestamps) {
            layers.push(
                new TextLayer({
                    id: "vessel-timestamps",
                    data: data.data,
                    pickable: false,
                    getPosition: (d: VesselPositionResponse) => [
                        d.longitude,
                        d.latitude,
                    ],
                    getText: (d) =>
                        d.eventTimestamp
                            ? new Date(d.eventTimestamp).toLocaleDateString() +
                              " " +
                              new Date(d.eventTimestamp).toLocaleTimeString()
                            : "",
                    getSize: 10,
                    getColor: [255, 0, 0],
                    getAngle: 0,
                    getAlignmentBaseline: "top",
                    getPixelOffset: [0, 20],
                    fontSettings: sharpTextFontSettings,
                })
            );
        }

        return layers;
    }, [data, hoveredVessel, selectedVessel, mapTheme]);

    return {
        layers,
        onHover,
        onClick,
        hoveredVessel,
        selectedVessel,
        clearHover,
    };
}

export function useTrackVesselLayers(
    data: ApiResponse<VesselTrackResponse> | null,
    mapTheme: "light" | "dark"
) {
    const layers = useMemo<Layer[]>(() => {
        if (!data?.data?.positions?.length) return [];

        const positions = data.data.positions;

        const segments = positions.slice(0, -1).map((position, index) => ({
            path: [
                [position.longitude, position.latitude],
                [
                    positions[index + 1].longitude,
                    positions[index + 1].latitude,
                ],
            ],
            sog: position.sog ?? 0,
        }));

        return [
            new PathLayer({
                id: "vessel-track",
                data: segments,

                getPath: (d) => d.path,

                getColor: (d) => {
                    const sog = d.sog;

                    if (sog < 2) return [0, 128, 255];
                    if (sog < 5) return [0, 200, 100];
                    if (sog < 10) return [255, 200, 0];
                    if (sog < 15) return [255, 120, 0];

                    return [255, 0, 0];
                },

                getWidth: 3,
                widthMinPixels: 2,
                jointRounded: true,
                capRounded: true,
                antialiasing: true,
            }),
        ];
    }, [data, mapTheme]);

    return {
        layers,
    };
}