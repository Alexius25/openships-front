import type { AisSource } from "./ais-source";
import type { AisDataLicense } from "./ais-data-license";
import type { NavigationStatus } from "./navigation-status";

export type VesselPositionResponse = {
    source: AisSource;
    license: AisDataLicense;
    messageType: number;
    mmsi: number;
    receivedAt: string;
    eventTimestamp: string;
    latitude: number;
    longitude: number;

    shipName: string | null;
    shipType: number | null;
    sog: number | null;
    cog: number | null;
    heading: number | null;
    navigationStatus: NavigationStatus | null;
    rateOfTurn: number | null;
    positionAccuracy: boolean | null;

    repeatIndicator: number;
    valid: boolean;
    specialManoeuvreIndicator: number;
    spare: number;
    raim: boolean;
    communicationState: number;
};
