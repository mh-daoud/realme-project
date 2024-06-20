import {  Response } from "express"
import UnauthenticatedError from "../errorModels/UnauthenticatedError"
import BadRequestError from "../errorModels/BadRequestError"
import jwt from 'jsonwebtoken'
import { UserDecodedJWT } from "../types/User"
import { AuthenticatedRequest } from "../types/AuthenticatedRequest"

export const authenticationMiddleware = (req: AuthenticatedRequest, res: Response, next?: () => void) => {
    const {authorization} = req.headers ?? {}

    if(!authorization || !authorization.startsWith('Bearer ')) {
        throw new UnauthenticatedError("you are unauthorized to continue")
    }
    const jwtSecret = process.env.JWT_SECRET
    if(!jwtSecret) {
        throw new BadRequestError("Something went wrong, server unable to authenticate you")
    }
    try {
        const jwtToken = authorization.split('Bearer ')?.[1]
        const decodedToken =  jwt.verify(jwtToken, jwtSecret) as UserDecodedJWT 

        req.user = { userId: decodedToken.userId , email: decodedToken.email}
        if(next) {
            return next()
        }
        return decodedToken
    }

    catch {
        throw new UnauthenticatedError("Authentication invalid")
    }
    
}