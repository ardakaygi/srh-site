# Samsun Robot Hastanesi — Master Implementation Prompt

## 1. Mission

Build a production-grade, mobile-first web platform for a robot vacuum repair
business ("Samsun Robot Hastanesi") based in Samsun, Turkey, serving all of
Turkey. The platform's core growth engine is a **programmatic SEO (pSEO)
routing system** covering all 81 Turkish provinces and 70+ robot vacuum
brands (with model-level micro-landing pages), combined with a real
technical-service value proposition (board repair, micro-soldering, LiDAR
calibration, custom spot-welded battery pack fabrication) and a
conversion-optimized service request + shipment tracking flow.

This is a **from-scratch build**. Treat this document as the spec; do not
start writing code before running it through proper requirement/task
breakdown as instructed in section 11.

## 2. Non-Negotiable Language Rule

**All user-facing content is Turkish. No exceptions.** This includes, without
limitation:

- Every navigation label, button, link, and menu item
- Every form label, placeholder, helper text, and validation/error message
- Every toast, empty state, success/failure screen, and confirmation message
- Every piece of programmatic SEO content: page titles, meta descriptions,
  H1/H2 headers, body copy, FAQ text, breadcrumb labels
- Every Schema.org/JSON-LD text property (`name`, `description`, `areaServed`
  labels, FAQ `Question`/`Answer` text, etc.)
- Every province landing page's localized description (all 81)
- Every brand and model guide's descriptive copy (all 70+ brands)
- Any sample/seed/placeholder data ever rendered to a real user
- Cookie consent banner and KVKK aydınlatma metni content
- Email/SMS notification templates sent to customers

Write natural, professional Turkish copy — never literal or robotic
translation, never mixed-language strings, never English fallback text
visible to end users.

**English is used only for**: source code, identifiers, file/folder names,
database column/table names, API routes, JSON keys in API payloads, code
comments, commit messages, and internal technical documentation (README,
ADRs, this spec itself).

Before this project is considered content-complete, run an explicit sweep:
grep the rendered output (not just the source) for any English string that
would be visible to a site visitor, and fix every hit.

## 3. Tech Stack (assumed — confirm before deep investment if the user pushes back)

- **Framework:** Next.js (App Router), TypeScript, React Server Components
  by default; Client Components only where interactivity requires it (forms,
  autocomplete, sticky CTA, tracking widget).
- **Styling:** Tailwind CSS, mobile-first breakpoints.
- **Data layer:** PostgreSQL + Prisma ORM. Provinces, brands, models, common
  faults, service requests, and tracking statuses are **database-driven
  content**, not hardcoded strings — the page count (81 × 70+ × N models)
  makes hardcoding unmaintainable and is also why per-page uniqueness (see
  §5) must be data-backed, not template-only.
- **Rendering strategy:** SSG for the highest-traffic/most stable pages
  (homepage, top brand pages); ISR (revalidate on a sane interval, e.g. 1h–24h)
  for the long tail of province/brand/model pages, per the ISR research in
  the accompanying findings (source #31–33).
- **Hosting:** Vercel (native ISR/Next.js support) — confirm with the
  business owner; note actual domain registration (`.com.tr`) is outside
  this prompt's scope and must be confirmed separately.
- **Analytics/SEO tooling:** GA4 + Google Tag Manager + Google Search
  Console, wired via a `dataLayer` (source #53).
- **Cargo integration:** Build against an **abstracted carrier interface**
  (`CarrierProvider` interface with `createShipment`, `getTrackingStatus`,
  `getTrackingUrl`) so the real integrator (Kargo Entegratör / Basit Kargo /
  direct Yurtiçi-Aras-MNG APIs — sources #18–19) can be swapped without
  touching UI code. **Do not hardcode a specific carrier without the business
  owner confirming which one they actually use.**
- **WhatsApp:** `wa.me` click-to-chat links with a pre-filled Turkish message,
  placed per best practices in source #16–17 (bottom-right sticky, contextual
  pre-fill per page e.g. brand/city name).

## 4. Explicitly Unknown — Do Not Guess

The following are **not specified** by the business and must be either
left as clearly-marked configuration placeholders or explicitly asked of
the user before launch — never invented:

- Real business legal name, address, phone number, working hours
- Actual warranty duration and terms (do not assume 6 ay — that number
  appears on the competitor site, not confirmed for this business)
- Actual pricing (if any is shown) and whether payment collection is in
  scope at all — if it is, that is a new capability requiring explicit
  scoping and, per the installed `loop-controller` skill's stop conditions,
  should not proceed without the user's explicit sign-off given it touches
  payment data
- Which cargo carrier(s) are actually contracted
- Whether a live chat / call center exists beyond WhatsApp
- Company's actual KVKK veri sorumlusu (data controller) registration details
  required for a legally valid aydınlatma metni — a lawyer or the business
  owner must supply/approve the final legal text; this prompt only specifies
  where and how it appears structurally

## 5. Programmatic SEO Routing Engine

### 5.1 Province (İl) Pages — `/[il-slug]-robot-supurge-servisi`

One page per province (81 total), e.g. `/samsun-robot-supurge-servisi`,
`/istanbul-robot-supurge-servisi`.

**Anti-thin-content requirement (see findings §4 and sources #45–50):**
templated province pages that only swap a city name are a doorway-page risk
and will not rank. Each province page's data model must include real,
distinct fields, not just a name substitution:

- Province name, official province code (plaka kodu)
- Estimated pickup/delivery lead time from Samsun to that province
  (bucketed, e.g. "1-2 iş günü" / "2-3 iş günü" by region — realistic, not
  fabricated per-province precision)
- The 3–5 brands most requested from that region (data-driven, can start
  from real order data once available; until then, mark as
  editorially-curated rather than fabricated statistics)
- A short, genuinely regional paragraph (climate/usage angle is acceptable
  — e.g. coastal humidity, dust — but must read as written for that place,
  not a mail-merge)
- Locally-relevant FAQ (2–4 items) that differ meaningfully between at least
  a few provinces (e.g. shipping-time questions, not just generic "nasıl
  çalışır" copy repeated everywhere)
- Internal links to: 2–3 geographically nearby province pages, the top
  brand pages for that region, and the general service-request flow

### 5.2 Brand Pages — `/[marka-slug]-robot-supurge-servisi`

One page per brand (70+), e.g. `/roborock-robot-supurge-servisi`. Structure
(informed by direct inspection of the competitor's live Roborock page,
source #3):

- Brand-specific value proposition intro
- 6–8 commonly-solved fault categories for that brand (LiDAR sensor, dock
  charging contacts, mop pump, mapping drift, etc. — brand-differentiated
  where real technical differences exist, e.g. Roborock vs. Dyson repair
  profiles are not identical)
- Model gallery: cards per model with real specs where obtainable (suction
  Pa, battery mAh, runtime minutes) linking to that model's micro-page
- Service breakdown: battery replacement, sensor repair, board repair,
  motor replacement, firmware/software check, mop system repair — each with
  its own short section
- Brand-specific FAQ (schema markup included, but do not expect a Google
  FAQ rich result per source #48 — write it for users, not for a SERP
  feature that no longer exists for this business category)
- Province list / "bu markaya bu illerde hizmet veriyoruz" internal linking
  block

### 5.3 Model Micro-Pages — `/model/[marka-slug]-[model-slug]`

Per notable model, e.g. `/model/roborock-s7`, `/model/xiaomi-mop-pro`:

- Model-specific common issues (not a copy of the brand page's list — the
  differentiator that justifies this page's existence)
- Battery options and part availability for that model
- Spare parts relevant to that specific model
- Breadcrumb: Anasayfa → Marka → Model

### 5.4 Technical Implementation

- Next.js dynamic routes (`app/[il]-robot-supurge-servisi/page.tsx`, etc.)
  driven by the Prisma-backed province/brand/model tables — do not
  file-generate 81+70+N static files by hand.
- `generateStaticParams` for build-time pre-render of top-traffic pages;
  ISR for the rest.
- `sitemap.ts` producing a sitemap index (province, brand, and model
  sitemaps split out) per source #32.
- `generateMetadata` per route producing unique, Turkish, non-duplicate
  `<title>` and meta description per page — never a single shared template
  string with only the entity name swapped in without other varying
  content, per the canonicalization guidance in sources #49–51.
- `rel="canonical"` self-referencing on every pSEO page (not consolidating
  distinct province/brand pages into one canonical — they are not
  duplicates of each other).

## 6. Structured Data (Schema.org / JSON-LD)

Per page type:

- **Organization / LocalBusiness** (or a more specific subtype if
  applicable) on the homepage and contact page — NAP (name/address/phone)
  consistent everywhere (source #8–11).
- **Service**, nested under Organization, on brand and province pages,
  describing the repair service offered.
- **BreadcrumbList** on every non-homepage page (this still produces real
  rich results — source #47).
- **FAQPage** may be included for user value and future-proofing, but do
  not build any UX or KPI around it producing a rich result — it currently
  does not, for this business category (source #48).
- All JSON-LD text content is Turkish, per §2.

## 7. Technical Service & Custom Battery Lab (Content Section)

A dedicated `/atolye` (or similar) page and supporting sections on brand
pages presenting:

- Micro-soldering / anakart (motherboard) repair capability
- LiDAR sensor calibration process (informed by sources #28–30: motor
  failure, dust accumulation, and physical misalignment are the three real
  failure modes — reflect this accurately rather than vague marketing copy)
- Custom spot-welded battery pack fabrication — explicitly describe the
  **spot-welding, not soldering** method (source #24, #26) as a
  differentiator and trust signal; reference relevant safety standards
  (IEC 62133-2 / UL 2054, source #27) in the copy to build credibility
  without overclaiming certifications the business doesn't actually hold —
  **confirm with the business which standards they actually comply with
  before publishing specific certification claims.**

## 8. Interactive Service Request & Shipping Tracking Flow

### 8.1 Multi-Step Service Request Form

Per UX research (sources #40–42): 3–5 steps, 5–6 fields per step, single
column, labeled progress indicator (reduces abandonment 20-25%).

Suggested steps:
1. Brand + model (autocomplete against the brand/model DB tables)
2. Fault selection (multi-select from a curated fault taxonomy per brand
   where available, free-text fallback)
3. Customer info (name, phone, province/city — autocomplete, address)
4. Review + KVKK consent checkbox (explicit, unticked by default — no
   pre-checked consent) + submit

On submit: generate a service request record, and present cargo shipping
instructions (via the abstracted `CarrierProvider`, §3) including a
shipping code/label the user can use.

Form accessibility: WCAG 2.2 compliant labels, error identification, no
CAPTCHA-only verification without an accessible alternative, appropriate
`autocomplete` attributes on every field (source #36–37, #42).

### 8.2 Tracking

A `/servis-takip` page where a customer enters a request ID or phone number
to see current status (received → diagnosed → repairing → testing →
shipped → delivered), following the information-architecture guidance in
source #54 (status prominent, branded, reduces support inquiries).

## 9. Conversion-Driven UX (Mobile-First)

- Sticky mobile CTA bar (call + WhatsApp + "Servis Talebi Oluştur"), bottom
  thumb-zone placement, ≥44px tap targets (sources #16, #55).
- Trust badges near every primary CTA: "Ücretsiz Arıza Tespiti", "6 Ay
  Garanti" (**pending confirmation of actual warranty term, §4**),
  "Anlaşmalı Kargo" — 2-4 badges max, not a wall of icons (source #43–44).
- WhatsApp click-to-chat with page-contextual pre-filled Turkish message
  (e.g. "Merhaba, [Marka] robot süpürgem için Samsun'dan servis talebinde
  bulunmak istiyorum.").

## 10. Non-Functional Requirements

- **Performance:** Core Web Vitals passing thresholds — LCP < 2.5s, and
  INP addressed explicitly (it is the most commonly failed 2026 metric,
  source #35) via image/font preloading, critical CSS, and SSR-first
  rendering for above-the-fold content (source #34–35).
- **Accessibility:** WCAG 2.2 AA (source #36–37).
- **Security:** CSP (nonce-based), HSTS, X-Frame-Options, Referrer-Policy
  via Next.js middleware (source #52); standard input validation/sanitization
  on the service request form; rate limiting on form submission.
- **Privacy/KVKK (Turkish law):**
  - A dedicated Aydınlatma Metni (separate from a generic Gizlilik
    Politikası) — **legal text must be supplied or approved by the business
    /a lawyer, not invented by the coding agent** (source #20–22).
  - A separate Çerez Politikası listing every cookie's name, purpose,
    duration, and provider (source #23).
  - Explicit, non-pre-ticked consent on the service request form.
  - A veri sahibi başvuru (data-subject request) channel/contact, honoring
    the 30-day statutory response window.
- **Analytics:** GA4 + GTM + Search Console wired for pageview and
  service-request-funnel events (source #53).

## 11. Required Execution Process

This build runs under the **`context-loop-brain`** skill already installed
in this Claude Code environment (global, `~/.claude/skills/`). Use it, and
follow its sequence — do not skip straight to implementation:

1. `context-research` — read this document plus the actual codebase state
   before writing anything.
2. `spec-to-acceptance` — turn each section above into explicit, checkable
   acceptance criteria; **stop and ask the user** about every item in §4
   before proceeding past it if it materially affects what gets built.
3. `planning-and-task-breakdown` — break this into small, sequenced,
   independently-verifiable tasks (e.g., "Prisma schema for
   province/brand/model", "province page route + template",
   "generateMetadata uniqueness for province pages", "service request form
   step 1", etc.) — not "build the pSEO engine" as one task.
4. `test-driven-development` for each task.
5. `loop-controller`'s quality gate before marking any task done: narrow
   test, full suite, typecheck, lint, build, and — critically for this
   project — a **thin-content check**: spot-check a sample of generated
   province/brand pages for genuine per-page uniqueness, not just template
   rendering.
6. `webapp-testing` for browser verification of the service request flow
   and tracking page.
7. This environment's `/code-review` and `/security-review` skills before
   considering any milestone complete — security review is mandatory before
   the service request form (which collects personal data) ships.
8. `context-handoff` at the end of every session.

## 12. Definition of Done (initial milestone)

- [ ] Homepage, ≥3 real province pages, ≥3 real brand pages, ≥2 model pages
      live and passing the thin-content spot-check
- [ ] Full 81-province and 70+-brand data model in place (even if initial
      copy is a smaller curated subset, the architecture supports full scale
      without redesign)
- [ ] Service request multi-step form functional end-to-end, KVKK consent
      enforced, WCAG-checked
- [ ] Tracking page functional against at least a stub `CarrierProvider`
- [ ] Schema.org markup validated via Google's Rich Results Test on each
      page type
- [ ] Core Web Vitals measured (Lighthouse or equivalent) and passing
- [ ] `/security-review` run with no unresolved critical/high findings
- [ ] KVKK aydınlatma metni and çerez politikası pages present (content
      flagged as pending legal sign-off if not yet supplied by the business)
- [ ] Full language sweep confirms zero non-Turkish strings in rendered
      user-facing output
