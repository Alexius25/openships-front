import type { VesselTrackPosition } from "./vessel-track-position";

export type VesselTrackResponse = {
    mmsi: number;
    shipType: number | null;
    shipName: string | null;
    positions: VesselTrackPosition[];
};
