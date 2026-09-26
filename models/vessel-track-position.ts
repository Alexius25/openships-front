import { AisDataLicense } from "./ais-data-license";
import { AisSource } from "./ais-source";
import { NavigationStatus } from "./navigation-status";

export type VesselTrackPosition = {
    source: AisSource;
    license: AisDataLicense;
    messageType: number;
    mmsi: number;
    receivedAt: string;
    eventTimestamp: string;
    latitude: number;
    longitude: number;
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
