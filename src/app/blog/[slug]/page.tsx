import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { BLOG_POSTS } from "@/lib/blogPosts";
import { articleNode } from "@/lib/schema";
import { siteConfig } from "@/lib/site-config";

export const revalidate = 3600;

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
  };
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      articleNode({
        headline: post.title,
        description: post.excerpt,
        datePublished: post.publishedAt,
        url: `${siteConfig.siteUrl}/blog/${post.slug}`,
      }),
    ],
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <JsonLd data={jsonLd} />
      <Breadcrumbs
        items={[
          { label: "Anasayfa", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: post.title, href: `/blog/${post.slug}` },
        ]}
      />

      <span className="mt-4 inline-block text-xs font-semibold uppercase tracking-wide text-brand-600">
        {post.category}
      </span>
      <h1 className="mt-2 text-3xl font-bold text-slate-900">{post.title}</h1>
      <div className="mt-2 flex items-center gap-3 text-sm text-slate-500">
        <span>{formatDate(post.publishedAt)}</span>
        <span>·</span>
        <span>{post.readMinutes} dk okuma</span>
      </div>

      <div className="prose prose-slate mt-8 max-w-none">
        {post.sections.map((section) => (
          <div key={section.heading}>
            <h2>{section.heading}</h2>
            <p>{section.body}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-2xl border border-brand-200 bg-brand-50 p-6 text-center">
        <p className="font-semibold text-brand-900">
          Robot süpürgenizde bu yazıda bahsedilen bir arızayla mı
          karşılaştınız?
        </p>
        <Link
          href="/servis-talep"
          className="mt-4 inline-block rounded-full bg-brand-700 px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-800"
        >
          Ücretsiz Arıza Tespiti İçin Servis Talebi Oluşturun
        </Link>
      </div>

      <Link
        href="/blog"
        className="mt-8 inline-block text-sm font-semibold text-brand-700 hover:underline"
      >
        ← Tüm blog yazıları
      </Link>
    </div>
  );
}
