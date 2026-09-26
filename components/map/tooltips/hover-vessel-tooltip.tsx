import { useTranslations } from "next-intl";
import { convertSpeed } from "@/lib/unit-utils";
import { NavigationStatus } from "@/models/navigation-status";
import { AisSource } from "@/models/ais-source";
import { AisDataLicense } from "@/models/ais-data-license";

export default function HoverVesselTooltip({
    normal,
    tooltipPosition,
}: {
    normal: any;
    tooltipPosition: any;
}) {
    const t = useTranslations("Map");
    const tAis = useTranslations("AIS");

    return (
        <div
            className="pointer-events-none absolute z-50"
            style={{
                left: tooltipPosition.x + 12,
                top: tooltipPosition.y + 12,
            }}
        >
            <div className="rounded-xl bg-black/80 px-3 py-2 text-sm text-white">
                <div className="font-semibold">
                    {normal.hoveredVessel.shipName?.trimEnd() ||
                        t("General.UnknownVessel")}
                </div>

                <div>
                    {t("General.MMSI")}: {normal.hoveredVessel.mmsi}
                </div>

                <div>
                    {t("General.Speed")}:{" "}
                    {convertSpeed(
                        Number(normal.hoveredVessel.sog),
                        "knot",
                        "kmph"
                    ).toFixed(1)}{" "}
                    km/h
                </div>

                <div>
                    {t("General.Course")}:{" "}
                    {normal.hoveredVessel.cog?.toFixed(1)}°
                </div>

                <div>
                    {t("General.NavigationStatus")}:{" "}
                    {tAis(
                        "NavigationStatus." +
                            NavigationStatus[
                                normal.hoveredVessel.navigationStatus ?? 0
                            ]
                    )}
                </div>

                <div>
                    {t("General.AISSource")}:{" "}
                    {AisSource[normal.hoveredVessel.source ?? 0]}
                </div>

                <div>
                    {t("General.AISDataLicense")}:{" "}
                    {AisDataLicense[normal.hoveredVessel.license ?? 0]}
                </div>

                <div>
                    {t("General.Timestamp")}:{" "}
                    {normal.hoveredVessel.eventTimestamp
                        ? new Date(
                              normal.hoveredVessel.eventTimestamp
                          ).toLocaleString()
                        : "N/A"}
                </div>
            </div>
        </div>
    );
}
