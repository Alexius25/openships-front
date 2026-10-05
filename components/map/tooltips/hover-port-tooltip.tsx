import { useTranslations } from "next-intl";

export default function HoverPortTooltip({
    normal,
    tooltipPosition,
    isTouch,
}: {
    normal: any;
    tooltipPosition: { x: number; y: number };
    isTouch: boolean;
}) {
    const t = useTranslations("Map");

    if (isTouch) {
        return null;
    }

    const port = normal.hoveredPort;

    if (!port) {
        return null;
    }

    const portName =
        port.nameWoDiacritics?.trim() ||
        port.name?.trim() ||
        t("General.UnknownPort");

    return (
        <div
            className="pointer-events-none absolute z-50"
            style={{
                left: tooltipPosition.x + 12,
                top: tooltipPosition.y + 12,
            }}
        >
            <div className="w-64 rounded-xl bg-white/90 px-3 py-2 text-sm dark:bg-black/90 dark:text-white">
                <div className="mb-2 font-semibold">
                    {portName}
                </div>

                <div className="space-y-2">
                    {(port.country || port.location) && (
                        <div className="grid grid-cols-2 gap-4">
                            {port.country && (
                                <div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400">
                                        {t("Port.Country")}
                                    </div>
                                    <div className="font-medium">
                                        {port.country}
                                    </div>
                                </div>
                            )}

                            {port.location && (
                                <div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400">
                                        {t("Port.Location")}
                                    </div>
                                    <div className="font-medium wrap-break-words">
                                        {port.location}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {port.subregion && (
                        <div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                                {t("Port.Subregion")}
                            </div>
                            <div className="font-medium wrap-break-words">
                                {port.subregion}
                            </div>
                        </div>
                    )}

                    {(port.latitude != null || port.longitude != null) && (
                        <>
                            <hr className="my-1" />

                            <div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                    {t("Port.Coordinates")}
                                </div>

                                <div className="font-medium tabular-nums">
                                    {port.latitude != null &&
                                        port.longitude != null
                                        ? `${port.latitude.toFixed(5)}, ${port.longitude.toFixed(5)}`
                                        : port.latitude != null
                                          ? port.latitude.toFixed(5)
                                          : port.longitude?.toFixed(5)}
                                </div>
                            </div>
                        </>
                    )}

                    {port.timeZone && (
                        <div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                                {t("Port.TimeZone")}
                            </div>
                            <div className="font-medium wrap-break-words">
                                {port.timeZone}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}