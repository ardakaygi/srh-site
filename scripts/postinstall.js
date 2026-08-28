/**
 * Runs `prisma generate` with an explicit, absolute --schema path.
 *
 * Plain `"postinstall": "prisma generate"` intermittently failed on the
 * production host with "Could not find Prisma Schema" / "file not found"
 * - npm's postinstall cwd was, on some runs, the Node.js Selector's own
 * nodevenv/lib directory rather than the project root (a flaky symlink-
 * timing issue specific to that hosting setup, not reproducible locally).
 * `npm_config_init_cwd` (the directory `npm install` was actually invoked
 * from) is reliable where `process.cwd()` inside the script isn't, so
 * resolving the schema path from that instead fixes it regardless of
 * which cwd the script itself ends up running with. Written as a plain
 * Node script (not a shell one-liner) so it behaves identically on both
 * Windows (local dev, cmd.exe) and Linux (production, sh) - `$VAR` /
 * `%VAR%` shell-expansion syntax isn't portable between the two.
 */
const { execFileSync, execSync } = require("node:child_process");
const path = require("node:path");

const projectRoot = process.env.INIT_CWD || process.env.npm_config_init_cwd || process.cwd();
const schemaPath = path.join(projectRoot, "prisma", "schema.prisma");

const prismaBin = path.join(
  projectRoot,
  "node_modules",
  ".bin",
  process.platform === "win32" ? "prisma.cmd" : "prisma",
);

if (process.platform === "win32") {
  // .cmd shims need shell interpretation on Windows (EINVAL otherwise);
  // a single quoted command string avoids execFileSync's shell-args
  // deprecation warning (args wouldn't be escaped when shell: true).
  execSync(`"${prismaBin}" generate --schema="${schemaPath}"`, { stdio: "inherit", cwd: projectRoot });
} else {
  execFileSync(prismaBin, ["generate", `--schema=${schemaPath}`], { stdio: "inherit", cwd: projectRoot });
}
