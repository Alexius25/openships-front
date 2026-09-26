import { useTranslations } from "next-intl";
import { convertSpeed } from "@/lib/unit-utils";
import { NavigationStatus } from "@/models/navigation-status";
import { AisSource } from "@/models/ais-source";
import { AisDataLicense } from "@/models/ais-data-license";
import Draggable from "@/components/map/draggable";

export default function SelectedVesselTooltip({
    normal,
    draggablePosition,
    setDraggablePosition,
}: {
    normal: any;
    draggablePosition: { x: number; y: number };
    setDraggablePosition: (pos: { x: number; y: number }) => void;
}) {
    const t = useTranslations("Map");
    const tAis = useTranslations("AIS");

    return (
        <Draggable
            position={draggablePosition}
            onPositionChange={setDraggablePosition}
            handle=".drag-handle"
        >
            <div className="w-80 rounded-xl bg-black/80 text-sm text-white">
                {/* DRAG HANDLE */}
                <div className="drag-handle cursor-grab border-b border-white/10 px-3 py-2">
                    <div className="font-semibold">
                        {normal.selectedVessel.shipName?.trimEnd() ||
                            t("General.UnknownVessel")}
                    </div>
                </div>

                {/* NOT DRAGGABLE */}
                <div className="px-3 py-2">
                    <div>
                        {t("General.MMSI")}: {normal.selectedVessel.mmsi}
                    </div>

                    <div>
                        {t("General.Speed")}:{" "}
                        {convertSpeed(
                            Number(normal.selectedVessel.sog),
                            "knot",
                            "kmph"
                        ).toFixed(1)}{" "}
                        km/h
                    </div>

                    <div>
                        {t("General.Course")}:{" "}
                        {normal.selectedVessel.cog?.toFixed(1)}°
                    </div>

                    <div>
                        {t("General.NavigationStatus")}:{" "}
                        {tAis(
                            "NavigationStatus." +
                                NavigationStatus[
                                    normal.selectedVessel.navigationStatus ?? 0
                                ]
                        )}
                    </div>

                    <div>
                        {t("General.AISSource")}:{" "}
                        {AisSource[normal.selectedVessel.source ?? 0]}
                    </div>

                    <div>
                        {t("General.AISDataLicense")}:{" "}
                        {AisDataLicense[normal.selectedVessel.license ?? 0]}
                    </div>
                </div>
            </div>
        </Draggable>
    );
}
