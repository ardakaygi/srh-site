import type { NextConfig } from "next";

// No CSP nonce here on purpose: nonce-based CSP forces every page to render
// dynamically per request (see Next.js docs, "How nonces work in Next.js"),
// which would break the static/ISR generation this project's pSEO scale
// depends on (see MASTER_PROMPT.md §5.4). Using the config-level,
// non-nonce CSP pattern Next.js documents as the alternative instead.
// Tracked as a residual risk in known-issues.md — 'unsafe-inline' in
// script-src is required for Next.js's own inline hydration data without a
// nonce, which nonce-based CSP would have closed.
const isDev = process.env.NODE_ENV === "development";

const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""};
  style-src 'self' 'unsafe-inline';
  img-src 'self' blob: data:;
  font-src 'self';
  connect-src 'self';
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  upgrade-insecure-requests;
`;

const nextConfig: NextConfig = {
  // The production host (a resource-constrained shared/cPanel container)
  // rejects the extra child-process spawns Next.js's build normally uses
  // to parallelize static-page generation across CPU cores ("spawn ...
  // EAGAIN" - the container's process/thread ceiling is lower than what
  // `os.cpus()` reports). Forcing a single worker avoids that entirely;
  // this project's page count is small enough that build time is still
  // only single-digit seconds either way.
  experimental: {
    cpus: 1,
    // This is the actual fix for the "spawn .../node EAGAIN" crash seen
    // on this host during `next build` (traced to next/dist/build/index.js:
    // by default, with no custom `webpack()` config, Next.js runs the
    // webpack compile step in a separate child process via jest-worker
    // regardless of `cpus`, which only governs the *static-generation*
    // worker pool, a different code path). Forcing it off keeps
    // compilation in the main process, so nothing tries to spawn a node
    // subprocess the container's process/thread ceiling then rejects.
    webpackBuildWorker: false,
    // Same root cause, different spawn: this Next.js version's default
    // type-checking step shells out to the project-local `tsc` CLI as a
    // subprocess (`spawn .../typescript/bin/tsc --showConfig ...`), which
    // the host also rejects. `false` switches back to the TypeScript
    // JS compiler API in-process - type-checking still runs and still
    // fails the build on real errors, it just never spawns anything.
    useTypeScriptCli: false,
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: cspHeader.replace(/\s{2,}/g, " ").trim(),
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
