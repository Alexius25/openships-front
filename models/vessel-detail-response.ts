import type { AisDataLicense } from "@/models/ais-data-license";
import type { AisSource } from "@/models/ais-source";
import type { VesselDestination } from "@/models/vessel-destination";
import type { Flag } from "@/models/flag";

export type VesselDetailResponse = {
  mmsi: number;
  source: AisSource;
  license: AisDataLicense;
  messageType: number;
  receivedAt: string;
  eventTimestamp: string;
  shipName: string | null;
  shipType: number | null;
  imoNumber: number | null;
  callSign: string | null;
  rawDestination: string | null;
  destination: VesselDestination | null;
  flag: Flag | null;
  draught: number | null;
  eta: string | null;
  dim_A: number | null;
  dim_B: number | null;
  dim_C: number | null;
  dim_D: number | null;
  length: number | null;
  beam: number | null;
}