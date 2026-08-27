// Minimal, hand-drawn outline icons (24x24, stroke=currentColor) for the
// service category grid - kept in one file since they're only used there.
// Deliberately simple geometric shapes rather than a full icon library
// dependency, styled consistently with the rest of the icon usage on site.

type IconProps = { className?: string };
const base = "h-6 w-6";

export function BatteryIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className={className}>
      <rect x="2.5" y="7" width="16" height="10" rx="2" />
      <rect x="20" y="10" width="1.8" height="4" rx="0.6" fill="currentColor" stroke="none" />
      <rect x="5.5" y="10" width="4" height="4" rx="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function ChipIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className={className}>
      <rect x="6" y="6" width="12" height="12" rx="1.5" />
      <rect x="9.5" y="9.5" width="5" height="5" rx="0.5" />
      {[4, 8, 12, 16].map((y) => (
        <line key={`l${y}`} x1="2.5" y1={y} x2="6" y2={y} />
      ))}
      {[4, 8, 12, 16].map((y) => (
        <line key={`r${y}`} x1="18" y1={y} x2="21.5" y2={y} />
      ))}
      {[4, 8, 12, 16].map((x) => (
        <line key={`t${x}`} x1={x} y1="2.5" x2={x} y2="6" />
      ))}
      {[4, 8, 12, 16].map((x) => (
        <line key={`b${x}`} x1={x} y1="18" x2={x} y2="21.5" />
      ))}
    </svg>
  );
}

export function RadarIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className={className}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function MapIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinejoin="round" className={className}>
      <path d="M9 4 4 6v14l5-2 6 2 5-2V4l-5 2-6-2Z" />
      <path d="M9 4v14M15 6v14" />
    </svg>
  );
}

export function DockIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinejoin="round" className={className}>
      <path d="M13 3 6 13h5l-1 8 8-11h-5l1-7Z" />
    </svg>
  );
}

export function WheelIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className={className}>
      <circle cx="12" cy="12" r="7.5" />
      <circle cx="12" cy="12" r="2.2" fill="currentColor" stroke="none" />
      {[0, 60, 120, 180, 240, 300].map((deg) => (
        <line
          key={deg}
          x1="12"
          y1="12"
          x2={12 + 7.5 * Math.cos((deg * Math.PI) / 180)}
          y2={12 + 7.5 * Math.sin((deg * Math.PI) / 180)}
        />
      ))}
    </svg>
  );
}

export function MonitorIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinejoin="round" className={className}>
      <rect x="3" y="4.5" width="18" height="12" rx="1.5" />
      <path d="M9 20h6M12 16.5V20" />
    </svg>
  );
}

export function DropletIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinejoin="round" className={className}>
      <path d="M12 3s6.5 7.2 6.5 11.5a6.5 6.5 0 11-13 0C5.5 10.2 12 3 12 3Z" />
    </svg>
  );
}

export function FanIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="1.6" />
      <path d="M12 10.5c0-3 1.5-6 4-6.5 2 1 2 4-1.5 6.5" />
      <path d="M13.3 13c2.6 1.3 4.7 3.7 4.2 6.2-2 .6-3.9-1.6-4.9-5.4" />
      <path d="M10.7 13c-2.6 1.3-4.7 3.7-4.2 6.2 2 .6 3.9-1.6 4.9-5.4" />
    </svg>
  );
}

export function TrayIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinejoin="round" className={className}>
      <path d="M3 13 6 5h12l3 8" />
      <rect x="3" y="13" width="18" height="6" rx="1" />
      <path d="M9 13a3 3 0 006 0" />
    </svg>
  );
}

export function WifiIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" className={className}>
      <path d="M4 9.5a12 12 0 0116 0" />
      <path d="M7 13a7.5 7.5 0 0110 0" />
      <path d="M10 16.3a3 3 0 014 0" />
      <circle cx="12" cy="19" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function CameraIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinejoin="round" className={className}>
      <path d="M4 8h3l1.5-2h7L17 8h3a1 1 0 011 1v9a1 1 0 01-1 1H4a1 1 0 01-1-1V9a1 1 0 011-1Z" />
      <circle cx="12" cy="13" r="3.2" />
    </svg>
  );
}
