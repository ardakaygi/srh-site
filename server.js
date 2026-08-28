/**
 * Custom entrypoint for cPanel's "Setup Node.js App" (Phusion Passenger).
 * Passenger doesn't run `next start` directly - it requires a plain Node
 * script that listens on the port it assigns via process.env.PORT and
 * proxies HTTP traffic to it. This is the standard workaround documented
 * for running Next.js under Passenger/cPanel; `next build` must still be
 * run once before starting (see the deployment guide).
 */
const { createServer } = require("http");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const port = process.env.PORT || 3000;

app.prepare().then(() => {
  createServer((req, res) => handle(req, res)).listen(port, () => {
    console.log(`Ready on port ${port}`);
  });
});
