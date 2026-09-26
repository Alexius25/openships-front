import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { API_URL, VESSELS_MAX_AGE_MINUTES } from "@/lib/config";
import { ApiResponse } from "@/models/api-response";
import type { VesselPositionResponse } from "@/models/vessel-position-response";
import { VesselTrackResponse } from "@/models/vessel-track-response";

export function useVesselData(
    enabled: boolean,
    bounds: { minLat: number; minLng: number; maxLat: number; maxLng: number },
    typeFilter: number[]
) {
    return useQuery<ApiResponse<VesselPositionResponse[]>>({
        queryKey: ["vesselData", bounds, typeFilter],
        queryFn: async () => {
            const params = new URLSearchParams();

            params.set("minLat", bounds.minLat.toString());
            params.set("maxLat", bounds.maxLat.toString());
            params.set("minLon", bounds.minLng.toString());
            params.set("maxLon", bounds.maxLng.toString());

            typeFilter.forEach((t) => params.append("typeFilter", String(t)));

            params.set("maxAgeMinutes", VESSELS_MAX_AGE_MINUTES.toString());

            const res = await fetch(
                `${API_URL}/api/v1/vessels/position/current/box?${params.toString()}`
            );

            if (!res.ok) {
                throw new Error("Failed to fetch vessel data");
            }

            return (await res.json()) as ApiResponse<VesselPositionResponse[]>;
        },
        enabled: enabled,
        staleTime: 1000 * 30, // 30 seconds
        refetchInterval: 1000 * 30, // 30 seconds
        refetchOnWindowFocus: true,
        placeholderData: keepPreviousData,
    });
}

export function useVesselTrackData(
    enabled: boolean,
    mmsi: number,
    startTime: Date,
    endTime: Date
) {
    return useQuery<ApiResponse<VesselTrackResponse>>({
        queryKey: [
            "vesselTrackData",
            mmsi,
            startTime.toISOString(),
            endTime.toISOString(),
        ],

        queryFn: async () => {
            const params = new URLSearchParams({
                from: startTime.toISOString(),
                to: endTime.toISOString(),
                limit: "1000",
                minIntervalSeconds: "60",
            });

            const res = await fetch(
                `${API_URL}/api/v1/vessels/position/track/${mmsi}?${params}`
            );

            if (!res.ok) {
                throw new Error("Failed to fetch vessel track data");
            }

            return (await res.json()) as ApiResponse<VesselTrackResponse>;
        },

        enabled,
        staleTime: 1000 * 30,
        refetchInterval: 1000 * 30,
        refetchOnWindowFocus: true,
        placeholderData: keepPreviousData,
    });
}
