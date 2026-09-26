export const Length = {
    meter: 1,
    foot: 0.3048,
    kilometer: 1000,
    mile: 1609.344,
    nauticalMile: 1852,
} as const;

export const Speed = {
    mps: 1,
    kmph: 1 / 3.6,
    mph: 0.44704,
    knot: 0.514444,
} as const;

export function convertLength(
    value: number,
    fromUnit: keyof typeof Length,
    toUnit: keyof typeof Length
): number {
    const valueInMeters = value * Length[fromUnit];
    return valueInMeters / Length[toUnit];
}

export function convertSpeed(
    value: number,
    fromUnit: keyof typeof Speed,
    toUnit: keyof typeof Speed
): number {
    const valueInMps = value * Speed[fromUnit];
    return valueInMps / Speed[toUnit];
}
