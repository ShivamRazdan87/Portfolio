// POST /api/logout – clears the admin session cookie
import { clearCookie, route, send } from "./_lib.js"

export default route(async (req, res) => {
  if (req.method !== "POST") return send(res, 405, { error: "Method not allowed" })
  return send(res, 200, { ok: true }, { "Set-Cookie": clearCookie() })
})
