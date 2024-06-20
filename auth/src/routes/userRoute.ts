import {Router} from 'express'
import { RouteEndpoint } from 'src/types/RouteEndpoint'
import { createUser, getUserInfo, login } from 'src/controllers/userController'
import { authenticationMiddleware } from '@common/middlewares/authenticationMiddleware'


const router =  Router()

router.route(RouteEndpoint.CreateUser).post(createUser)
router.route(RouteEndpoint.Login).post(login)
router.route(RouteEndpoint.UserInfo).post(authenticationMiddleware, getUserInfo)
export default router