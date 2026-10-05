import { useTranslations } from "next-intl";
import { convertSpeed } from "@/lib/unit-utils";
import { NavigationStatus } from "@/models/navigation-status";
import { AisSource } from "@/models/ais-source";
import { AisDataLicense } from "@/models/ais-data-license";
import { useFormatDate } from "@/hooks/useFormatDate";

export default function VesselDetails({
    normal,
    vesselDetailsData,
    destinationText,
}: {
    normal: any;
    vesselDetailsData: any;
    destinationText: string;
}) {
    const tMap = useTranslations("Map");
    const tAis = useTranslations("AIS");
    const formatDate = useFormatDate();

    const flagClass = `fi fi-${vesselDetailsData?.data?.flag?.code?.toLowerCase()}`;

    return (
        <div className="space-y-2 px-3 py-2">
            {/* MMSI + FLAG */}
            <div className="flex items-center justify-between">
                <div className="flex flex-col">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                        {tMap("General.MMSI")}
                    </span>
                    <span className="font-medium">
                        {normal.selectedVessel.mmsi}
                    </span>
                </div>

                {vesselDetailsData?.data?.flag && (
                    <span
                        className={`${flagClass} mr-3 scale-200 rounded-xs`}
                        title={vesselDetailsData.data.flag.name}
                    />
                )}
            </div>

            {/* IMO + CALL SIGN */}
            <div className="grid grid-cols-2 gap-4">
                <div className="flex min-w-0 flex-col">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                        {tMap("General.IMO")}
                    </span>
                    <span className="truncate font-medium">
                        {vesselDetailsData?.data?.imoNumber ??
                            tMap("General.Unknown")}
                    </span>
                </div>

                <div className="flex min-w-0 flex-col">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                        {tMap("General.CallSign")}
                    </span>
                    <span className="truncate font-medium">
                        {vesselDetailsData?.data?.callSign ??
                            tMap("General.Unknown")}
                    </span>
                </div>
            </div>

            <hr className="mx-2 my-1" />

            {/* DESTINATION + ETA */}
            <div className="grid grid-cols-2 gap-4">
                <div className="flex min-w-0 flex-col">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                        {tMap("General.Destination")}
                    </span>
                    <span className="wrap-break-words font-medium">
                        {destinationText}
                    </span>
                </div>

                <div className="flex min-w-0 flex-col">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                        {tMap("General.ETA")}
                    </span>
                    <span className="font-medium wrap-break-word">
                        {vesselDetailsData?.data?.eta
                            ? formatDate(vesselDetailsData.data.eta)
                            : tMap("General.Unknown")}
                    </span>
                </div>
            </div>

            <hr className="mx-2 my-1" />

            {/* DIMENSIONS */}
            <div className="grid grid-cols-3 gap-4">
                <div className="flex min-w-0 flex-col">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                        {tMap("General.Draught")}
                    </span>
                    <span className="font-medium">
                        {vesselDetailsData?.data?.draught
                            ? `${(vesselDetailsData.data.draught / 10).toFixed(1)} m`
                            : tMap("General.Unknown")}
                    </span>
                </div>

                <div className="flex min-w-0 flex-col">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                        {tMap("General.Length")}
                    </span>
                    <span className="font-medium">
                        {vesselDetailsData?.data?.length
                            ? `${vesselDetailsData.data.length} m`
                            : tMap("General.Unknown")}
                    </span>
                </div>

                <div className="flex min-w-0 flex-col">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                        {tMap("General.Width")}
                    </span>
                    <span className="font-medium">
                        {vesselDetailsData?.data?.beam
                            ? `${vesselDetailsData.data.beam} m`
                            : tMap("General.Unknown")}
                    </span>
                </div>
            </div>

            <hr className="mx-2 my-1" />

            {/* SPEED + COURSE */}
            <div className="grid grid-cols-2 gap-4">
                <div className="flex min-w-0 flex-col">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                        {tMap("General.Speed")}
                    </span>
                    <span className="font-medium">
                        {convertSpeed(
                            Number(normal.selectedVessel.sog),
                            "knot",
                            "kmph"
                        ).toFixed(1)}{" "}
                        km/h
                    </span>
                </div>

                <div className="flex min-w-0 flex-col">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                        {tMap("General.Course")}
                    </span>
                    <span className="font-medium">
                        {normal.selectedVessel.cog?.toFixed(1)}°
                    </span>
                </div>
            </div>

            <hr className="mx-2 my-1" />

            {/* NAVIGATION STATUS + AIS SOURCE */}
            <div className="grid grid-cols-2 gap-4">
                <div className="flex min-w-0 flex-col">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                        {tMap("General.NavigationStatus")}
                    </span>
                    <span className="wrap-break-words font-medium">
                        {tAis(
                            "NavigationStatus." +
                                NavigationStatus[
                                    normal.selectedVessel.navigationStatus ?? 0
                                ]
                        )}
                    </span>
                </div>

                <div className="flex min-w-0 flex-col">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                        {tMap("General.AISSource")}
                    </span>
                    <span className="truncate font-medium">
                        {AisSource[normal.selectedVessel.source ?? 0]}
                    </span>
                </div>
            </div>

            {/* AIS DATA LICENSE */}
            <div className="flex min-w-0 flex-col">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                    {tMap("General.AISDataLicense")}
                </span>
                <span className="truncate font-medium">
                    {AisDataLicense[normal.selectedVessel.license ?? 0]}
                </span>
            </div>
        </div>
    );
}
