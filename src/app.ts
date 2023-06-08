import Router from "./Router"
import Manager from "./Manager"
import ShortsRoute from "./ShortsRoute"
import PlaylistRoute from "./PlaylistRoute"

const manager = new Manager()
const shortsRoute = new ShortsRoute(manager)
const playlistRoute = new PlaylistRoute(manager)
const router = new Router(shortsRoute,playlistRoute)