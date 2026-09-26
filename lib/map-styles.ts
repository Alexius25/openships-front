import type { StyleItem } from "map-gl-style-switcher/react-map-gl";

type MapStyle = StyleItem & {
    dark: boolean;
};

export const mapStyles: MapStyle[] = [
    {
        id: "versatiles_colorful",
        name: "Colorful",
        styleUrl: "/map/styles/versatiles_colorful.json",
        image: "https://raw.githubusercontent.com/muimsd/map-gl-style-switcher/refs/heads/main/public/voyager.png",
        dark: false,
    },
    {
        id: "versatiles_graybeard",
        name: "Light",
        styleUrl: "/map/styles/versatiles_graybeard.json",
        image: "https://raw.githubusercontent.com/muimsd/map-gl-style-switcher/refs/heads/main/public/voyager.png",
        dark: false,
    },
    {
        id: "versatiles_graybeard_inverted",
        name: "Dark",
        styleUrl: "/map/styles/versatiles_graybeard_inverted.json",
        image: "https://raw.githubusercontent.com/muimsd/map-gl-style-switcher/refs/heads/main/public/voyager.png",
        dark: true,
    },
    {
        id: "versatiles_satellite",
        name: "Satellite (Experimental)",
        styleUrl: "/map/styles/versatiles_satellite.json",
        image: "https://raw.githubusercontent.com/muimsd/map-gl-style-switcher/refs/heads/main/public/voyager.png",
        dark: true,
    },

    {
        id: "carto_free_positron",
        name: "Carto Positron",
        styleUrl:
            "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json",
        image: "https://raw.githubusercontent.com/muimsd/map-gl-style-switcher/refs/heads/main/public/voyager.png",
        dark: false,
    },
    {
        id: "carto_free_positron_nolabels",
        name: "Carto Positron (No Labels)",
        styleUrl:
            "https://basemaps.cartocdn.com/gl/positron-nolabels-gl-style/style.json",
        image: "https://raw.githubusercontent.com/muimsd/map-gl-style-switcher/refs/heads/main/public/voyager.png",
        dark: false,
    },
    {
        id: "carto_free_darkmatter",
        name: "Carto Dark Matter",
        styleUrl:
            "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json",
        image: "https://raw.githubusercontent.com/muimsd/map-gl-style-switcher/refs/heads/main/public/voyager.png",
        dark: true,
    },
    {
        id: "carto_free_darkmatter_nolabels",
        name: "Carto Dark Matter (No Labels)",
        styleUrl:
            "https://basemaps.cartocdn.com/gl/dark-matter-nolabels-gl-style/style.json",
        image: "https://raw.githubusercontent.com/muimsd/map-gl-style-switcher/refs/heads/main/public/voyager.png",
        dark: true,
    },
    {
        id: "carto_free_voyager",
        name: "Carto Voyager",
        styleUrl:
            "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json",
        image: "https://raw.githubusercontent.com/muimsd/map-gl-style-switcher/refs/heads/main/public/voyager.png",
        dark: false,
    },
    {
        id: "carto_free_voyager_nolabels",
        name: "Carto Voyager (No Labels)",
        styleUrl:
            "https://basemaps.cartocdn.com/gl/voyager-nolabels-gl-style/style.json",
        image: "https://raw.githubusercontent.com/muimsd/map-gl-style-switcher/refs/heads/main/public/voyager.png",
        dark: false,
    },
];
