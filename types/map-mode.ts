export type MapMode =
    | {
          type: "normal";
      }
    | {
          type: "history";
          mmsi: number;
      }
    | {
          type: "track";
          mmsi: number;
          from: Date;
          to: Date;
      };

export default MapMode;
