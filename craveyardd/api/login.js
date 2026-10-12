// POST /api/login  { password }  – sets the admin session cookie
import { checkPassword, readJson, route, sameOrigin, send, sessionCookie } from "./_lib.js"

export default route(async (req, res) => {
  if (req.method !== "POST") return send(res, 405, { error: "Method not allowed" })
  if (!sameOrigin(req)) return send(res, 403, { error: "Forbidden" })
  const { password } = await readJson(req, 10_000)
  if (!checkPassword(password)) {
    await new Promise((r) => setTimeout(r, 800)) // slow down guessing
    return send(res, 401, { error: "Wrong password" })
  }
  return send(res, 200, { ok: true }, { "Set-Cookie": sessionCookie() })
})
