import Manager from "./Manager"
import Router from "./Router"

import ShortsRoute from "./ShortsRoute"
import PlaylistRoute from "./PlaylistRoute"


const manager = new Manager()
console.log(await manager.getAll())

const router = new Router()

const shortsRoute = new ShortsRoute(manager)
const playlistRoute = new PlaylistRoute(manager)

router.add("/shorts" , shortsRoute)
router.add("/playlist" , playlistRoute)
router.runRoutes()


