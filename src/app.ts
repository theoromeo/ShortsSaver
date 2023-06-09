import Manager from "./Manager"
import ShortsRoute from "./ShortsRoute"
import PlaylistRoute from "./PlaylistRoute"
import Router from "./Router"

const manager = new Manager()
const shortsRoute = new ShortsRoute(manager)
const playlistRoute = new PlaylistRoute(manager)
const router = new Router()

router.add("/shorts" , shortsRoute)
router.add("/playlist" , playlistRoute)
router.runRoutes()