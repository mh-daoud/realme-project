import {Router} from 'express'
import { RouteEndpoint } from '../types/RouteEndpoint'
import { createUser, login, logout } from '../controllers/userController'


const router =  Router()

router.route(RouteEndpoint.CreateUser).post(createUser)
router.route(RouteEndpoint.Login).post(login)
router.route(RouteEndpoint.Logout).post(logout)

export default router