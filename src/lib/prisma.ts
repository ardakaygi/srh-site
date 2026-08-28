import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

// Driver adapter instead of Prisma's default native (Rust) query engine
// (2026-08-28): the production host's container can't spawn the OS
// threads that engine's Tokio runtime needs ("OS can't spawn worker
// thread: Resource temporarily unavailable") - it crash-loops the whole
// app, not just the build. The mariadb adapter is a pure-JS MySQL driver
// (protocol-compatible with MariaDB and MySQL) with no native threading
// of its own, so it runs fine under the same constraint. See
// decisions.md for the full trail of things tried before this.
const adapter = new PrismaMariaDb(process.env.DATABASE_URL as string);

// Standard Next.js dev-mode singleton: avoids exhausting DB connections
// from hot-reload creating a new PrismaClient on every module reload.
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
