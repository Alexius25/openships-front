declare global {
    interface Window {
        __OPENSHIPS_CONFIG__?: {
            apiUrl?: string;
            vesselsMaxAgeMinutes?: number;
        };
    }
}

const runtimeConfig =
    typeof window !== "undefined"
        ? window.__OPENSHIPS_CONFIG__
        : undefined;

export const API_URL =
    runtimeConfig?.apiUrl || "http://localhost:5018";

export const VESSELS_MAX_AGE_MINUTES =
    Number(runtimeConfig?.vesselsMaxAgeMinutes) || 60;