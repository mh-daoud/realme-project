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
    media: MediaMetadata,
    videoBase64: string
}