import { useTranslations } from "next-intl";
import { convertSpeed } from "@/lib/unit-utils";
import { NavigationStatus } from "@/models/navigation-status";
import { useFormatDate } from "@/hooks/useFormatDate";

export default function HoverVesselTooltip({
    normal,
    tooltipPosition,
    isTouch,
}: {
    normal: any;
    tooltipPosition: any;
    isTouch: boolean;
}) {
    const t = useTranslations("Map");
    const tAis = useTranslations("AIS");
    const formatDate = useFormatDate();

    if (isTouch) {
        return null;
    }

    return (
        <div
            className="pointer-events-none absolute z-50"
            style={{
                left: tooltipPosition.x + 12,
                top: tooltipPosition.y + 12,
            }}
        >
            <div className="w-64 rounded-lg bg-white/90 px-3 py-2 text-sm dark:bg-black/90">
                {/* Vessel name */}
                <div className="mb-2 font-semibold">
                    {normal.hoveredVessel.shipName?.trimEnd() ||
                        t("General.UnknownVessel")}
                </div>

                {/* Speed + Course */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex min-w-0 flex-col">
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                            {t("General.Speed")}
                        </span>
                        <span className="font-medium">
                            {convertSpeed(
                                Number(normal.hoveredVessel.sog),
                                "knot",
                                "kmph"
                            ).toFixed(1)}{" "}
                            km/h
                        </span>
                    </div>

                    <div className="flex min-w-0 flex-col">
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                            {t("General.Course")}
                        </span>
                        <span className="font-medium">
                            {normal.hoveredVessel.cog?.toFixed(1)}°
                        </span>
                    </div>
                </div>

                <hr className="my-2" />

                {/* Navigation Status */}
                <div className="flex min-w-0 flex-col">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                        {t("General.NavigationStatus")}
                    </span>
                    <span className="break-words font-medium">
                        {tAis(
                            "NavigationStatus." +
                                NavigationStatus[
                                    normal.hoveredVessel.navigationStatus ?? 0
                                ]
                        )}
                    </span>
                </div>

                {/* Timestamp */}
                <div className="mt-2 flex min-w-0 flex-col">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                        {t("General.Timestamp")}
                    </span>
                    <span className="font-medium">
                        {normal.hoveredVessel.eventTimestamp
                            ? formatDate(normal.hoveredVessel.eventTimestamp)
                            : "N/A"}
                    </span>
                </div>
            </div>
        </div>
    );
}