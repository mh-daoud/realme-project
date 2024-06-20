import {Router} from 'express'
import { RouteEndpoint } from 'src/types/RouteEndpoint'
import { createUser, login } from 'src/controllers/userController'


const router =  Router()

router.route(RouteEndpoint.CreateUser).post(createUser)
router.route(RouteEndpoint.Login).post(login)

export default router