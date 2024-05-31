// types.ts
export interface LatLng {
  lat: number;
  lng: number;
}

export interface MarkerInfo {
  position: LatLng;
  type: "supplier" | "risk" | "port";
  info: string;
}
