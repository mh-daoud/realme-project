import { addMedia, deleteMedia, getMediaDetails, listMedia, updateMedia } from 'src/controllers/mediaController'
import { RouteEndpoint } from 'src/types/RouteEndpoint'
import {Router} from 'express'

const router =  Router()

router.post(RouteEndpoint.MediaList, listMedia)
router.post(RouteEndpoint.MediaAdd, addMedia)
router.post(RouteEndpoint.MediaUpdate, updateMedia)
router.post(RouteEndpoint.MediaDetails, getMediaDetails)
router.post(RouteEndpoint.MediaDelete, deleteMedia)

export default router