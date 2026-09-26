export type PortResponse = {
    id: number;
    country: string;
    location: string;

    name: string;
    nameWoDiacritics: string | null;

    subregion: string | null;
    function: string;

    latitude: number | null;
    longitude: number | null;

    remarks: string | null;
    source: string | null;

    timeZone: string | null;

    aliases: string[];
};
