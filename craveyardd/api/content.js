// GET  /api/content  – public: the current site content (404 until the first save; the site then uses data.js)
// PUT  /api/content  – admin only: validate and save new content
import { cleanContent, isLoggedIn, readContent, readJson, route, sameOrigin, send, writeContent } from "./_lib.js"

export default route(async (req, res) => {
  if (req.method === "GET") {
    const content = await readContent()
    if (!content) return send(res, 404, { error: "No saved content yet" })
    return send(res, 200, content, { "Cache-Control": "public, max-age=0, s-maxage=10, stale-while-revalidate=60" })
  }
  if (req.method === "PUT") {
    if (!sameOrigin(req)) return send(res, 403, { error: "Forbidden" })
    if (!isLoggedIn(req)) return send(res, 401, { error: "Please log in again" })
    const content = cleanContent(await readJson(req))
    await writeContent(content)
    return send(res, 200, { ok: true, content })
  }
  res.setHeader("Allow", "GET, PUT")
  return send(res, 405, { error: "Method not allowed" })
})
