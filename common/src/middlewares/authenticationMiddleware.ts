import { Request, Response } from "express"
import UnauthenticatedError from "../errorModels/UnauthenticatedError"
import BadRequestError from "../errorModels/BadRequestError"
import jwt from 'jsonwebtoken'
import { UserDecodedJWT } from "../types/User"

export const authenticationMiddleware = (req: Request, res: Response) => {
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
        const decodedToken =  jwt.verify(jwtToken, jwtSecret)  
        
        return decodedToken as UserDecodedJWT
    }

    catch {
        throw new UnauthenticatedError("Authentication invalid")
    }
    
}