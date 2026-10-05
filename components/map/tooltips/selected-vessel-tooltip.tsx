import { useTranslations } from "next-intl";
import VesselImage from "@/components/vessel/vessel-image";
import Draggable from "@/components/map/draggable";
import { Move } from "lucide-react";
import { MainIcon } from "@/lib/icons/main-icon";
import { useVesselDetailsData } from "@/hooks/map/use-data/use-vessel-data";
import { DestinationType } from "@/models/vessel-destination";
import { useFormatDate } from "@/hooks/useFormatDate";
import SelectedVesselPreview from "./selected-vessel-preview";
import { useState } from "react";
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer";
import VesselDetails from "./vessel-details";

export default function SelectedVesselTooltip({
    normal,
    draggablePosition,
    setDraggablePosition,
    isTouch,
}: {
    normal: any;
    draggablePosition: { x: number; y: number };
    setDraggablePosition: (pos: { x: number; y: number }) => void;
    isTouch: boolean;
}) {
    const tMap = useTranslations("Map");
    const tAis = useTranslations("AIS");
    const formatDate = useFormatDate();

    const { data: vesselDetailsData } = useVesselDetailsData(
        !!normal.selectedVessel?.mmsi,
        normal.selectedVessel?.mmsi ?? 0
    );

    const flagClass = `fi fi-${vesselDetailsData?.data?.flag?.code.toLowerCase()}`;

    const destination = vesselDetailsData?.data?.destination;

    const destinationText = destination
        ? destination.destinationType === DestinationType.RoundTrip
            ? tAis("Destination.roundTrip", {
                  from: destination.fromName ?? tMap("General.Unknown"),
                  to: destination.toName,
              })
            : destination.destinationType === DestinationType.Directed
              ? destination.fromName
                  ? tAis("Destination.directed", {
                        from: destination.fromName,
                        to: destination.toName,
                    })
                  : tAis("Destination.directedWithoutFrom", {
                        to: destination.toName,
                    })
              : tAis("Destination.single", {
                    to: destination.toName,
                })
        : tMap("General.Unknown");

    const [drawerOpen, setDrawerOpen] = useState(false);

    if (isTouch) {
        return (
            <>
                <SelectedVesselPreview
                    vessel={normal.selectedVessel}
                    onClick={() => setDrawerOpen(true)}
                />

                <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
                    <DrawerContent>
                        <DrawerHeader>
                            <DrawerTitle>
                                {normal.selectedVessel?.shipName?.trimEnd() ||
                                    tMap("General.UnknownVessel")}
                            </DrawerTitle>
                        </DrawerHeader>

                        <div className="px-4 pb-6">
                            <VesselImage vessel={normal.selectedVessel} t={tMap} />

                            <VesselDetails
                                normal={normal}
                                vesselDetailsData={vesselDetailsData}
                                destinationText={destinationText}
                            />
                        </div>
                    </DrawerContent>
                </Drawer>
            </>
        );
    }

    return (
        <Draggable
            position={draggablePosition}
            onPositionChange={setDraggablePosition}
            handle=".drag-handle"
        >
            <div className="w-80 rounded-lg bg-white/90 text-sm dark:bg-black/90 dark:text-white">
                <div className="flex h-10 items-center justify-between px-3">
                    <div className="font-semibold">
                        {normal.selectedVessel.shipName?.trimEnd() ||
                            tMap("General.UnknownVessel")}
                    </div>

                    <div className="drag-handle cursor-move text-gray-500 dark:text-gray-400">
                        <Move size={16} />
                    </div>
                </div>

                <hr className="mx-2" />

                {/* Bild */}
                <VesselImage vessel={normal.selectedVessel} t={tMap} />

                <VesselDetails
                    normal={normal}
                    vesselDetailsData={vesselDetailsData}
                    destinationText={destinationText}
                />
            </div>
        </Draggable>
    );
}
