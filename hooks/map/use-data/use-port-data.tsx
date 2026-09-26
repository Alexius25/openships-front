import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { API_URL } from "@/lib/config";
import { ApiResponse } from "@/models/api-response";
import { PortResponse } from "@/models/port-response";

export function usePortData(
    enabled: boolean,
    bounds: { minLat: number; minLng: number; maxLat: number; maxLng: number },
    zoom: number
) {
    return useQuery<ApiResponse<PortResponse[]>>({
        queryKey: ["portData", bounds, zoom],
        queryFn: async () => {
            const params = new URLSearchParams();

            params.set("minLat", bounds.minLat.toString());
            params.set("maxLat", bounds.maxLat.toString());
            params.set("minLon", bounds.minLng.toString());
            params.set("maxLon", bounds.maxLng.toString());

            const res = await fetch(
                `${API_URL}/api/v1/ports/box?${params.toString()}`
            );

            if (!res.ok) {
                throw new Error("Failed to fetch port data");
            }

            return (await res.json()) as ApiResponse<PortResponse[]>;
        },
        enabled: enabled && zoom >= 8,
        staleTime: 1000 * 60 * 5, // 5 minutes
        refetchInterval: 1000 * 60 * 5, // 5 minutes
        refetchOnWindowFocus: true,
        placeholderData: zoom >= 8 ? keepPreviousData : undefined,
    });
}
