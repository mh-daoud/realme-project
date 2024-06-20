import UnauthenticatedError from "@common/errorModels/UnauthenticatedError"
import { AuthenticatedRequest } from "@common/types/AuthenticatedRequest"
import { Request, Response } from "express"
import { createUserService, getUserInfoService, loginUserService } from "src/services/userService"
import { CreateUserRouteResponse } from "src/types/UserRouteTypes"

export const createUser =  async (req: Request, res: Response<CreateUserRouteResponse> ) => {
    const {
    username,
    password,
    displayName,
    nickname} = req?.body ?? {}

    const input = {username, password, displayName, nickname}
  
    const createUserPayload = await createUserService(input)
   
    res.json({...createUserPayload, success: true})
}


export const login = async (req: Request, res: Response) => {
    const {username, password} = req?.body ?? {}

    const loginUserPayload = await loginUserService({username, password})
    res.json({...loginUserPayload, success: true})
}

export const getUserInfo = async (req: AuthenticatedRequest, res: Response<CreateUserRouteResponse>) => {
    const {user} = req ?? {}
    const {userId, email} = user ?? {}
    if(!userId || !email) {
        throw new UnauthenticatedError("you are unauthorized")
    }
    const getUserInfoPayload = await getUserInfoService({userId, email})
    res.json({...getUserInfoPayload, success: true})
}