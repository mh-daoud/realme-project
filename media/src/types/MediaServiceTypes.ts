import {MediaStatus} from '@common/types/Media'
interface MediaMetadata {
    name: string
    description: string,
    tagsIds: String[],
    authorId: String
    status: MediaStatus,
    allowComments: boolean,
}

export interface  AddMediaServiceInput {
    jwtToken: string
    media: MediaMetadata,
    videoBase64: string
    extension: string
}


export interface ListMediaServiceInput {
    filter: {
        authorId?: string,
        search?: string
    },
    page: number
    pageSize: number
}