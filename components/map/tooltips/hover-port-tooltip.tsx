import { useTranslations } from "next-intl";

export default function HoverPortTooltip({
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
                    {normal.hoveredPort.nameWoDiacritics}
                </div>

                {normal.hoveredPort.country && normal.hoveredPort.location && (
                    <div>
                        {normal.hoveredPort.country}{" "}
                        {normal.hoveredPort.location}
                    </div>
                )}
            </div>
        </div>
    );
}
