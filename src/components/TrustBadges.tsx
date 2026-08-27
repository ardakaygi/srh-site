const badges = [
  "Ücretsiz Arıza Tespiti",
  "Orijinal Yedek Parça",
  "Anlaşmalı Kargo",
];

export function TrustBadges() {
  return (
    <ul className="flex flex-wrap justify-center gap-3 text-sm">
      {badges.map((badge) => (
        <li
          key={badge}
          className="rounded-full border border-emerald-600/30 bg-emerald-50 px-4 py-1.5 font-medium text-emerald-800"
        >
          {badge}
        </li>
      ))}
    </ul>
  );
}
