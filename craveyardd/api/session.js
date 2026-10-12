// GET /api/session – { loggedIn }
import { isLoggedIn, route, send } from "./_lib.js"

export default route(async (req, res) => send(res, 200, { loggedIn: isLoggedIn(req) }))
