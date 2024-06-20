import { ObjectId } from "mongoose"

export interface Media {
    name: string
    fileType: MediaFileType
    mediaType: MediaType
    description: string,
    videoUrl?: string,
    thumbImage?: string,
    tags?: MediaTag[],
    authorProfile: {
        id: ObjectId,
        name?: String,
        avatar?: String
    }
    likesCount: number,
    viewsCount: number,
    status: MediaStatus,
    isDeleted: boolean,
    allowComments: boolean,
    createdAt: Date,
    updatedAt: Date
}


export interface MediaTag {
    id: ObjectId,
    name: string,
}

export enum MediaType {
    Real = 'Real',
    Ad = 'Ad',
    
}

export enum MediaFileType {
    MP4 = 'mp4',
    M3U8 = 'm3u8'
}

export enum MediaStatus {
    Active = 'active',
    Inactive = 'inactive'
}