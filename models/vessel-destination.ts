export enum DestinationType {
  Single,
  Directed,
  RoundTrip,
}

export type VesselDestination = {
  id: number;
  destinationType: DestinationType;
  toName: string;
  toPortId: number | null;
  fromName: string | null;
  fromPortId: number | null;
  firstSeen: string;
  lastSeen: string;
}