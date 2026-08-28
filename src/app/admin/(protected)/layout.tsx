import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_SESSION_COOKIE, verifySessionToken } from "@/lib/adminAuth";
import { logoutAction } from "../logout/actions";

const navItems = [
  { href: "/admin", label: "Panel" },
  { href: "/admin/servis-talepleri", label: "Servis Talepleri" },
  { href: "/admin/markalar", label: "Markalar" },
  { href: "/admin/iller", label: "İller" },
  { href: "/admin/modeller", label: "Modeller" },
  { href: "/admin/blog", label: "Blog" },
  { href: "/admin/sss", label: "SSS" },
  { href: "/admin/site-ayarlari", label: "Site Ayarları" },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // Defense in depth alongside proxy.ts (see adminAuth.ts's header comment)
  // - a layout re-check that doesn't depend on the proxy matcher at all.
  const cookieStore = await cookies();
  if (!verifySessionToken(cookieStore.get(ADMIN_SESSION_COOKIE)?.value)) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="flex flex-col lg:flex-row">
        <aside className="shrink-0 border-b border-slate-200 bg-slate-950 text-white lg:min-h-screen lg:w-60 lg:border-b-0 lg:border-r">
          <div className="px-5 py-5">
            <p className="text-sm font-bold">Samsun Robot Hastanesi</p>
            <p className="text-xs text-slate-400">Yönetim Paneli</p>
          </div>
          <nav className="flex flex-wrap gap-1 px-3 pb-4 lg:flex-col">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-300 hover:bg-white/10 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <form action={logoutAction} className="border-t border-white/10 px-3 py-3">
            <button
              type="submit"
              className="w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-slate-400 hover:bg-white/10 hover:text-white"
            >
              Çıkış Yap
            </button>
          </form>
        </aside>

        <main className="min-w-0 flex-1 p-4 sm:p-8">{children}</main>
      </div>
    </div>
  );
}
