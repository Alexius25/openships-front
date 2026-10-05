"use client";

import { useTranslations } from "next-intl";
import { ChevronUp, Ship } from "lucide-react";

interface SelectedVesselPreviewProps {
    vessel: any;
    onClick: () => void;
}

export default function SelectedVesselPreview({
    vessel,
    onClick,
}: SelectedVesselPreviewProps) {
    const t = useTranslations("Map");

    return (
        <button
            type="button"
            onClick={onClick}
            className="fixed right-4 bottom-4 left-4 z-40 flex items-center gap-3 rounded-xl border bg-background/95 px-4 py-3 text-left shadow-lg backdrop-blur"
        >
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent">
                <Ship className="size-5" />
            </div>

            <div className="min-w-0 flex-1">
                <div className="truncate font-semibold">
                    {vessel.shipName?.trimEnd() || t("General.UnknownVessel")}
                </div>

                <div className="text-xs text-muted-foreground">
                    MMSI {vessel.mmsi}
                </div>
            </div>

            <ChevronUp className="size-5 shrink-0 text-muted-foreground" />
        </button>
    );
}
