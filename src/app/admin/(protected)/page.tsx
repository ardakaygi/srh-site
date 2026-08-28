import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function AdminDashboardPage() {
  const [pendingCount, totalRequests, brandCount, provinceCount, blogCount] = await Promise.all([
    prisma.serviceRequest.count({ where: { status: "RECEIVED" } }),
    prisma.serviceRequest.count(),
    prisma.brand.count(),
    prisma.province.count(),
    prisma.blogPost.count(),
  ]);

  const stats = [
    { label: "Bekleyen Servis Talebi", value: pendingCount, href: "/admin/servis-talepleri" },
    { label: "Toplam Servis Talebi", value: totalRequests, href: "/admin/servis-talepleri" },
    { label: "Marka", value: brandCount, href: "/admin/markalar" },
    { label: "İl", value: provinceCount, href: "/admin/iller" },
    { label: "Blog Yazısı", value: blogCount, href: "/admin/blog" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">Yönetim Paneli</h1>
      <p className="mt-1 text-sm text-slate-500">Genel durum özeti.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="rounded-2xl border border-slate-200 bg-white p-5 hover:border-brand-300 hover:shadow-sm"
          >
            <p className="text-3xl font-bold text-brand-700">{s.value}</p>
            <p className="mt-1 text-sm font-medium text-slate-600">{s.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
