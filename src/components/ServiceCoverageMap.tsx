import { HUB_POINT, SPOKE_POINTS } from "@/lib/serviceMapPoints";
import { TURKEY_MAP_PATH_D, TURKEY_MAP_TRANSFORM, TURKEY_MAP_VIEWBOX } from "@/lib/turkeyMapPath";

/** Gentle arc between the hub and a spoke city, curving toward the top of the map. */
function arcPath(x1: number, y1: number, x2: number, y2: number): string {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const dist = Math.hypot(x2 - x1, y2 - y1);
  const bow = Math.min(dist * 0.18, 30);
  return `M ${x1} ${y1} Q ${mx} ${my - bow} ${x2} ${y2}`;
}

export function ServiceCoverageMap() {
  return (
    <svg
      viewBox={TURKEY_MAP_VIEWBOX}
      role="img"
      aria-label="Samsun merkezli, Türkiye genelindeki hizmet ağını gösteren harita"
      className="w-full"
    >
      <g transform={TURKEY_MAP_TRANSFORM}>
        <path d={TURKEY_MAP_PATH_D} className="fill-brand-100" />
      </g>

      {SPOKE_POINTS.map((p) => (
        <path
          key={p.name}
          d={arcPath(HUB_POINT.x, HUB_POINT.y, p.x, p.y)}
          fill="none"
          className="stroke-brand-300"
          strokeWidth={1}
          strokeDasharray="3 3"
        />
      ))}

      {SPOKE_POINTS.map((p) => (
        <g key={p.name}>
          <circle cx={p.x} cy={p.y} r={4} className="fill-white stroke-brand-500" strokeWidth={1.5} />
        </g>
      ))}

      {/* Hub marker (Samsun) - pulsing ring drawn first so it sits under the solid dot */}
      <circle cx={HUB_POINT.x} cy={HUB_POINT.y} r={7} className="fill-brand-600/30">
        <animate attributeName="r" values="7;16;7" dur="2.4s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.5;0;0.5" dur="2.4s" repeatCount="indefinite" />
      </circle>
      <circle cx={HUB_POINT.x} cy={HUB_POINT.y} r={7} className="fill-brand-700 stroke-white" strokeWidth={2} />
    </svg>
  );
}
