"use client";

import type { Layer } from "deck.gl";
import type { MapRef, ViewState } from "react-map-gl/maplibre";
import type { DeckProps } from "@deck.gl/core";
import { Map } from "react-map-gl/maplibre";
import { forwardRef, useRef, useCallback } from "react";
import type { ReactNode, ComponentProps, RefObject } from "react";
import { mapStyles } from "@/lib/map-styles";
import { DeckGLOverlay } from "@/lib/deckgl-utils";
import { setWorkerUrl } from "maplibre-gl";
//import "maplibre-theme/icons.default.css";
//import "maplibre-theme/modern.css";
import "maplibre-gl/dist/maplibre-gl.css";

setWorkerUrl("/maplibre/maplibre-gl-worker.mjs");

export type CoreMapConfig = {
    layers?: Layer[];
    style?: string;
    initialViewState?: ViewState;
    children?: ReactNode;
    deckProps?: DeckProps;
    onMove?: ComponentProps<typeof Map>["onMove"];
    onMoveEnd?: ComponentProps<typeof Map>["onMoveEnd"];
    onLoad?: ComponentProps<typeof Map>["onLoad"];
    onClick?: ComponentProps<typeof Map>["onClick"];
    cursor?: string;
};

export type CoreMapRef = MapRef;

const CoreMap = forwardRef<CoreMapRef, CoreMapConfig>(
    function CoreMap(config, ref) {
        const {
            layers = [],
            style = mapStyles[0].styleUrl,
            initialViewState,
            children,
            deckProps,
            onMove,
            onMoveEnd,
            onLoad,
            onClick,
            cursor,
        } = config;

        const innerRef = useRef<CoreMapRef | null>(null);

        const setMapRef = useCallback(
            (instance: CoreMapRef | null) => {
                innerRef.current = instance;

                if (typeof ref === "function") {
                    ref(instance);
                } else if (ref) {
                    (ref as RefObject<CoreMapRef | null>).current = instance;
                }

                try {
                    const map = instance?.getMap?.();

                    if (map?.touchZoomRotate?.disableRotation) {
                        map.touchZoomRotate.disableRotation();
                    }
                } catch {
                    // MapLibre may not be initialized yet.
                }
            },
            [ref]
        );

        return (
            <Map
                ref={setMapRef}
                reuseMaps
                projection="mercator"
                initialViewState={initialViewState}
                mapStyle={style}
                dragRotate={false}
                maxPitch={0}
                touchPitch={false}
                keyboard={false}
                onMove={onMove}
                onMoveEnd={onMoveEnd}
                onLoad={onLoad}
                onClick={onClick}
                cursor={cursor}
                attributionControl={false}
            >
                <DeckGLOverlay {...deckProps} layers={layers} />
                {children}
            </Map>
        );
    }
);

export default CoreMap;
