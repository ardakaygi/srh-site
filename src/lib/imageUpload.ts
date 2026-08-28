import { randomUUID } from "crypto";
import { mkdir, writeFile } from "fs/promises";
import path from "path";

/**
 * Saves an admin-uploaded image to public/uploads/<subdir>/ and returns
 * its public URL path. Callers MUST have already verified the request is
 * an authenticated admin session (assertAdminSession()) - this function
 * does no auth check itself, only file-safety checks.
 *
 * Writes straight to the local filesystem, which only works when this
 * app runs on a persistent Node.js server (the deployment target assumed
 * throughout this project - see decisions.md's SQLite/Postgres note).
 * It will NOT work on a read-only-filesystem serverless platform; moving
 * to object storage (S3-compatible) would be the fix if that ever changes.
 */

const MAX_BYTES = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/svg+xml": "svg",
};

export class ImageUploadError extends Error {}

export async function saveUploadedImage(file: File, subdir: string): Promise<string> {
  if (!file || file.size === 0) {
    throw new ImageUploadError("Dosya seçilmedi.");
  }
  if (file.size > MAX_BYTES) {
    throw new ImageUploadError("Dosya çok büyük (maksimum 5MB).");
  }
  const ext = ALLOWED_TYPES[file.type];
  if (!ext) {
    throw new ImageUploadError("Desteklenmeyen dosya türü. JPEG, PNG, WebP veya SVG yükleyin.");
  }

  // Never derive the on-disk name from the user-supplied filename - always
  // a fresh random name with a whitelisted extension, so there's no path
  // traversal or extension-spoofing surface.
  if (!/^[a-z0-9_-]+$/.test(subdir)) {
    throw new ImageUploadError("Geçersiz hedef klasör.");
  }
  const filename = `${randomUUID()}.${ext}`;
  const dir = path.join(process.cwd(), "public", "uploads", subdir);
  await mkdir(dir, { recursive: true });

  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(dir, filename), buffer);

  return `/uploads/${subdir}/${filename}`;
}
