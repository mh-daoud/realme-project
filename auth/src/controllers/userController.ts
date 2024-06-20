import { Request, Response } from "express"
import { createUserService, loginUserService } from "src/services/userService"
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