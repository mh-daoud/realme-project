import { User } from "@common/types/User"

export interface CreateUserServiceInput {
    username: string
    password: string
    nickname: string
    displayName: string,
}

export interface CreateUserServiceOutput {
    user: User
    jwtToken: string
}


export interface LoginUserServiceInput {
    username: string
    password: string
}

export interface LoginUserServiceOutput {
    user:User
    jwtToken: string
}