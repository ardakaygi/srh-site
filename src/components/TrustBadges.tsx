import { getSiteSettings } from "@/lib/siteSettings";

export async function TrustBadges() {
  const settings = await getSiteSettings();
  const badges = settings.trust_badges as unknown as string[];

  return (
    <ul className="flex flex-wrap justify-center gap-3 text-sm">
      {badges.map((badge) => (
        <li
          key={badge}
          className="rounded-full border border-brand-600/30 bg-brand-50 px-4 py-1.5 font-medium text-brand-800"
        >
          {badge}
        </li>
      ))}
    </ul>
  );
}
