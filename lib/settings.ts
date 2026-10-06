import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ViewState, PaddingOptions } from "react-map-gl/maplibre";

type Settings = {
    mapStyle: string;
    setMapStyle: (style: string) => void;

    unit: "metric" | "imperial" | "nautical";
    setUnit: (unit: "metric" | "imperial" | "nautical") => void;

    viewState: ViewState;
    setViewState: (v: ViewState) => void;

    showVesselNames: boolean;
    setShowVesselNames: (show: boolean) => void;
};

export const useSettings = create<Settings>()(
    persist(
        (set, get) => ({
            mapStyle: "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json",
            setMapStyle: (style: string) =>
                set({
                    mapStyle: style,
                }),

            unit: "nautical",
            setUnit: (unit: "metric" | "imperial" | "nautical") =>
                set({
                    unit,
                }),

            viewState: {
                longitude: 0,
                latitude: 0,
                zoom: 3,
                pitch: 0,
                bearing: 0,
                padding: {
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                },
            },
            setViewState: (v) =>
                set({
                    viewState: {
                        ...get().viewState,
                        ...v,
                    },
                }),

            showVesselNames: true,
            setShowVesselNames: (show) =>
                set({
                    showVesselNames: show,
                }),
        }),
        {
            name: "settings",
        }
    )
);