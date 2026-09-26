"use client";

import MainMap from "@/components/map/main-map";
import "map-gl-style-switcher/dist/map-gl-style-switcher.css";
import { useState } from "react";
import { useParams } from "next/navigation";

export default function Page() {

    const { mmsi } = useParams<{ mmsi: string }>();

    const factor = 60 * 60 * 1000; // 1 hour in milliseconds

    const [from] = useState(
        () => new Date(Date.now() - factor * 24 * 7) // 24 hours ago
    );

    const [now] = useState(() => new Date());

    return (
        <div className="h-dvh">
            <MainMap
                mode={{
                    type: "track",
                    mmsi: Number(mmsi),
                    from,
                    to: now,
                }}
            />
        </div>
    );
}
