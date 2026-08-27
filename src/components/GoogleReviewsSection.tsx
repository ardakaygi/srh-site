"use client";

import { useRef } from "react";
import { GOOGLE_PROFILE_URL, GOOGLE_REVIEWS } from "@/lib/googleReviews";

function StarIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 text-amber-400">
      <path d="M10 1.5l2.59 5.25 5.79.84-4.19 4.08.99 5.78L10 14.77l-5.18 2.68.99-5.78L1.62 7.59l5.79-.84L10 1.5z" />
    </svg>
  );
}

function StarRow() {
  return (
    <div className="flex gap-0.5" aria-label="5 üzerinden 5 yıldız">
      {Array.from({ length: 5 }).map((_, i) => (
        <StarIcon key={i} />
      ))}
    </div>
  );
}

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
      <path
        fillRule="evenodd"
        d={
          direction === "left"
            ? "M12.79 5.23a.75.75 0 010 1.06L9.06 10l3.73 3.71a.75.75 0 11-1.06 1.06l-4.25-4.25a.75.75 0 010-1.06l4.25-4.25a.75.75 0 011.06 0z"
            : "M7.21 14.77a.75.75 0 01-.02-1.06L10.94 10 7.19 6.29a.75.75 0 111.06-1.06l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.04-.02z"
        }
        clipRule="evenodd"
      />
    </svg>
  );
}

export function GoogleReviewsSection() {
  const trackRef = useRef<HTMLDivElement>(null);

  function scrollByCard(direction: 1 | -1) {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>("[data-review-card]");
    const step = card ? card.offsetWidth + 16 : 320;
    track.scrollBy({ left: direction * step, behavior: "smooth" });
  }

  return (
    <section className="bg-white px-4 py-14">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-200 bg-brand-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-brand-800">
            Google Yorumları
          </span>
          <h2 className="mt-4 text-3xl font-bold text-slate-900">
            Müşterilerimiz Bizi Anlatıyor
          </h2>
          <div className="mt-2 flex items-center gap-2">
            <StarRow />
            <span className="text-sm font-semibold text-slate-700">5.0</span>
          </div>
        </div>

        <div className="relative mt-10">
          <div
            ref={trackRef}
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {GOOGLE_REVIEWS.map((review) => (
              <div
                key={review.name}
                data-review-card
                className="flex w-[260px] shrink-0 snap-start flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:w-[300px]"
              >
                <StarRow />
                <p className="mt-3 flex-1 text-sm text-slate-700">
                  &ldquo;{review.text}&rdquo;
                </p>
                <p className="mt-4 text-sm font-semibold text-slate-900">
                  {review.name}
                </p>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => scrollByCard(-1)}
            aria-label="Önceki yorumlar"
            className="absolute left-0 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white p-2 text-slate-600 shadow-md transition-colors hover:bg-brand-50 hover:text-brand-700 sm:flex"
          >
            <ArrowIcon direction="left" />
          </button>
          <button
            type="button"
            onClick={() => scrollByCard(1)}
            aria-label="Sonraki yorumlar"
            className="absolute right-0 top-1/2 hidden -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full border border-slate-200 bg-white p-2 text-slate-600 shadow-md transition-colors hover:bg-brand-50 hover:text-brand-700 sm:flex"
          >
            <ArrowIcon direction="right" />
          </button>
        </div>

        <div className="mt-8 flex justify-center">
          <a
            href={GOOGLE_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-800 transition-colors hover:border-brand-300 hover:bg-brand-50"
          >
            Google&apos;da Tüm Yorumları Gör
          </a>
        </div>
      </div>
    </section>
  );
}
