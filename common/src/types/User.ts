export interface User {
    _id: string
    email: string
    displayName: string,
    avatar?: string,
    bio?: string,
    nickname: string,
    countryIso: string,
    status: UserStatus,
    isDeleted: boolean,
    isWatchListPublic: boolean,
    isFollowerListPublic: boolean,
    isFolloweeListPublic: boolean,
    followerCount: number,
    followeeCount: number,
    createdAt: Date,
    updatedAt: Date
    
}

export enum UserStatus {
    Active = 'Active',
    Banned = 'Banned'
}

export interface UserDecodedJWT {
    userId: string
    email: string
}