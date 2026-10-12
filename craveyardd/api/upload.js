// POST /api/upload  { name, type, data }  – admin only; data is a base64 image (resized in the browser first)
import { isLoggedIn, readJson, route, sameOrigin, saveImage, send } from "./_lib.js"

const TYPES = { "image/webp": "webp", "image/jpeg": "jpg", "image/png": "png" }
const MAX_BYTES = 3_000_000

export default route(async (req, res) => {
  if (req.method !== "POST") return send(res, 405, { error: "Method not allowed" })
  if (!sameOrigin(req)) return send(res, 403, { error: "Forbidden" })
  if (!isLoggedIn(req)) return send(res, 401, { error: "Please log in again" })
  const { name, type, data } = await readJson(req, 4_200_000)
  const ext = TYPES[type]
  if (!ext || typeof data !== "string") return send(res, 400, { error: "Please upload a JPG, PNG or WebP image" })
  const buffer = Buffer.from(data, "base64")
  if (!buffer.length || buffer.length > MAX_BYTES) return send(res, 413, { error: "Image is too large (max 3 MB)" })
  const base = String(name || "photo").replace(/\.[a-z0-9]+$/i, "")
  const url = await saveImage(`${base}.${ext}`, buffer, type)
  return send(res, 200, { url })
})
