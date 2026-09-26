export function colorForVesselType(type: number | null): string {
    if (type === null) {
        return "#383838";
    }

    if (type == 0) return "#383838"; // not available
    if (type >= 20 && type <= 29) return "#86ffeb"; // WIG
    if (type == 31 || type == 32) return "#9752ec"; // towing
    if (type == 35) return "#224119"; // military ops
    if (type == 36) return "#3ef5f5"; // sailing
    if (type >= 40 && type <= 49) return "#d62480"; // high speed craft
    if (type >= 60 && type <= 69) return "#5fc94f"; // passenger
    if (type >= 70 && type <= 79) return "#e3a92d"; // cargo
    if (type >= 80 && type <= 89) return "#426ff5"; // tanker

    return "#383838"; // default
}
