import type { Metadata } from "next";
import Link from "next/link";
import { BlogCoverImage } from "@/components/BlogCoverImage";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BLOG_POSTS } from "@/lib/blogPosts";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Robot süpürge bakımı, arıza tespiti ve onarımı hakkında pratik bilgiler ve rehberler.",
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function BlogIndexPage() {
  const posts = [...BLOG_POSTS].sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <Breadcrumbs
        items={[
          { label: "Anasayfa", href: "/" },
          { label: "Blog", href: "/blog" },
        ]}
      />
      <h1 className="mt-4 text-3xl font-bold text-slate-900">Blog</h1>
      <p className="mt-2 max-w-2xl text-slate-600">
        Robot süpürgenizin bakımı, sık karşılaşılan arızalar ve onarım süreci
        hakkında pratik, teknik bilgiler.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 transition-shadow hover:shadow-md"
          >
            <BlogCoverImage src={post.coverImage} alt={post.title} />
            <div className="flex flex-1 flex-col p-5">
              <span className="text-xs font-semibold uppercase tracking-wide text-brand-600">
                {post.category}
              </span>
              <h2 className="mt-2 text-lg font-bold text-slate-900">{post.title}</h2>
              <p className="mt-2 flex-1 text-sm text-slate-600">{post.excerpt}</p>
              <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
                <span>{formatDate(post.publishedAt)}</span>
                <span>{post.readMinutes} dk okuma</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
