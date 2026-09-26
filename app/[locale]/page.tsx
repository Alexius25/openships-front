"use client";

import MainMap from "@/components/map/main-map";
import "map-gl-style-switcher/dist/map-gl-style-switcher.css";

export default function Page() {
    return (
        <div className="h-dvh">
            <MainMap mode={{type: "normal"}} />
        </div>
    );
}