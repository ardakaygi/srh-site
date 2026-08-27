/**
 * Approximate positions of Samsun (the service hub) and a representative
 * spread of other provinces on the TURKEY_MAP_PATH_D coordinate space
 * (0 0 613.60187 295.83316), derived from each city's real latitude/
 * longitude via simple linear interpolation (not a true map projection -
 * good enough for a decorative illustration, verified visually against
 * the rendered outline so every point actually falls on the landmass).
 */
export interface MapPoint {
  name: string;
  x: number;
  y: number;
}

export const HUB_POINT: MapPoint = { name: "Samsun", x: 342.6, y: 35.0 };

export const SPOKE_POINTS: MapPoint[] = [
  { name: "İstanbul", x: 98.8, y: 48.8 },
  { name: "Trabzon", x: 455.0, y: 49.3 },
  { name: "Ankara", x: 227.2, y: 102.0 },
  { name: "İzmir", x: 47.8, y: 171.5 },
  { name: "Van", x: 561.4, y: 168.1 },
  { name: "Antalya", x: 155.9, y: 251.4 },
  { name: "Adana", x: 309.1, y: 246.5 },
  { name: "Şanlıurfa", x: 424.6, y: 218.6 },
];
