import {model, Model, Schema, Document} from 'mongoose'
import { Media, MediaFileType, MediaStatus, MediaTag, MediaType } from '../types/Media'


export interface MediaEntity extends Media, Document {

}

const MediaTagSchema = new Schema<MediaTag>({
    id: { type: String, required: true },
    name: { type: String, required: true },
})

const MediaSchema = new Schema<MediaEntity>({
    name: {
        type: String,
        required: true,
        minLength: [4, 'name should be more than 3 characters.'],
        maxLength: [100, 'name should not exceed 100 characters.']
    },
    fileType: {
        type: String,
        enum: {
            values: Object.values(MediaFileType).map((mediaType) => mediaType.toLowerCase()),
        },
        default: MediaFileType.MP4,
        lowercase: true,
        required: true
    },
    mediaType: {
        type: String,
        enum :{
            values: Object.values(MediaType).map((mediaType) => mediaType.toLowerCase())
        },
        default: MediaType.Real,
        lowercase: true,
        required: true
    },
    description: {
        type: String,
        maxLength: [255, 'description should not exceed 255 letter.']
    },
    videoUrl: {
        type: String
    },
    thumbImage: {
        type: String
    },
    tags: {
        type: [MediaTagSchema],
        required: false
     },
    authorProfile: {
        id: Schema.Types.ObjectId,
        name: String,
        avatar: String,
    },
    likesCount: {
        type: Number,
        default: 0,
        required: true
    },
    viewsCount: {
        type: Number,
        default: 0,
        required: true
    },
    status: {
        type: String,
        enum: {
            values: Object.values(MediaStatus).map((mediaStatus) => mediaStatus.toLowerCase())
        },
        required: true,
        lowercase: true,
        default: MediaStatus.Active
    },
    isDeleted: {
        type: Boolean
    },
    allowComments: {
        type: Boolean
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        required: true,
    },
    updatedAt: {
        type: Date,
        default: Date.now(),
        required: true,
    }
})

MediaSchema.index({
    name: 'text',
    description: 'text'
})

const MediaModel: Model<Media> = model<Media>('Media', MediaSchema)

export default MediaModel