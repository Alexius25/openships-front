import { useCallback, useMemo, useState } from "react";
import { IconLayer, TextLayer } from "@deck.gl/layers";
import { Layer } from "@deck.gl/core";
import { svgToDataUrl } from "@/lib/icon-utils";
import { ApiResponse } from "@/models/api-response";
import { PortResponse } from "@/models/port-response";
import { generatePortIcon } from "@/lib/icons/port-icon";
import { PickingInfo } from "@deck.gl/core";
import { sharpTextFontSettings } from "@/lib/config";

export function usePortLayers(
    data: ApiResponse<PortResponse[]> | null,
    mapTheme: "light" | "dark"
) {
    const [hoveredPort, setHoveredPort] = useState<PortResponse | null>(null);

    const onHover = useCallback((info: PickingInfo) => {
        if (info.layer?.id !== "ports" || !info.object) {
            setHoveredPort(null);
            return;
        }

        setHoveredPort(info.object as PortResponse);
    }, []);

    const clearHover = useCallback(() => {
        setHoveredPort(null);
    }, []);

    const layers = useMemo<Layer[]>(() => {
        if (!data || !data.data) return [];

        const portsWithPosition = data.data.filter(
            (
                port
            ): port is PortResponse & {
                latitude: number;
                longitude: number;
            } => port.latitude !== null && port.longitude !== null
        );

        const layers: Layer[] = [
            new IconLayer({
                id: "ports",
                data: portsWithPosition,
                pickable: true,
                getPosition: (d) => [d.longitude, d.latitude],
                getIcon: () => ({
                    url: svgToDataUrl(generatePortIcon()),
                    width: 400,
                    height: 400,
                }),
                getSize: 30,
                onHover: onHover,
            }),
            new TextLayer({
                id: "port-labels",
                data: portsWithPosition,
                pickable: false,
                getPosition: (d) => [d.longitude, d.latitude],
                getText: (d) => d.nameWoDiacritics.trimEnd(),
                getSize: 14,
                getColor: () =>
                    mapTheme === "light" ? [0, 0, 0] : [255, 255, 255],
                getAngle: () => 0,
                getAlignmentBaseline: "bottom",
                getPixelOffset: [0, -20],
                fontSettings: sharpTextFontSettings,
            }),
        ];
        return layers;
    }, [data, mapTheme, onHover]);

    return {
        layers,
        onHover,
        hoveredPort,
        clearHover,
    };
}
