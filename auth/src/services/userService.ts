import BadRequestError from "@common/errorModels/BadRequestError";
import UserModel from "@common/models/User.model";
import configUtil from "@common/utils/configUtil";
import { CreateUserServiceInput, CreateUserServiceOutput, GetUserInfoServiceInput, GetUserInfoServiceOutput, LoginUserServiceInput, LoginUserServiceOutput } from "src/types/UserServiceTypes";

export const createUserService = async (input: CreateUserServiceInput) : Promise<CreateUserServiceOutput> => {
    const {username, nickname, password, displayName} = input ?? {}
    const jwtTokenSecret = configUtil.getJwtSecret()

    if(!username || !password || !displayName) {
        throw new BadRequestError('invalid create user request')
    }
    try {
        const user = await UserModel.create({
            email: username,
            password,
            displayName,
            nickname,
            countryIso: 'JOR'
        })
    
        const jwtToken = user.createJwt(jwtTokenSecret)
    
        return {
            user: user.toJSON(),
            jwtToken
        }
    }
    catch {
        throw new BadRequestError("username is already in use")
    }
    
}

export const loginUserService = async (input: LoginUserServiceInput): Promise<LoginUserServiceOutput> => {
    const {username, password} = input ?? {}
    const user = await UserModel.findOne({email: username}).select('+password')
    const jwtTokenSecret = configUtil.getJwtSecret()
    
    if(!user) {
        throw new BadRequestError("username or password are invalid")
    }

    const isValid = user.comparePassword(password)
    if(!isValid) {
        throw new BadRequestError("username or password are invalid")
    }
    return {
        user: user.toJSON(),
        jwtToken: user.createJwt(jwtTokenSecret)
    }
}


export const getUserInfoService = async (input: GetUserInfoServiceInput) : Promise<GetUserInfoServiceOutput> => {
    const {userId, email} = input ?? {}
    const jwtTokenSecret = configUtil.getJwtSecret()

    if(!userId && !email) {
        throw new BadRequestError("user id or email required")
    }
    if(userId) {
        const user = await UserModel.findById(userId)
        return {
            user: user?.toJSON() ?? null,
            jwtToken: user?.createJwt(jwtTokenSecret) ?? null
        }
    }
    else {
        const user = await UserModel.findOne({email: email})
        return {
            user: user?.toJSON() ?? null,
            jwtToken: user?.createJwt(jwtTokenSecret) ?? null
        }
    }
}