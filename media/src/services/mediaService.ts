import { AddMediaServiceInput, ListMediaServiceInput } from "src/types/MediaServiceTypes"
import fs from 'fs'
import path from 'path'
import BadRequestError from "@common/errorModels/BadRequestError";
import { randomUUID } from "crypto";
import { cleanFilename, getMediaFileType } from "src/utils/generalUtil";
import ffmpeg from 'fluent-ffmpeg'
import MediaModel from '@common/models/Media.model'
import { MediaStatus, MediaType } from "@common/types/Media";
import  { getUserInfo } from "src/ApiService";
import configUtil from "@common/utils/configUtil";


export const listMediaService = async (input: ListMediaServiceInput) => {
    const {page, pageSize, filter} = input ?? {}
    const {search, authorId} = filter ?? {}
    let query: Record<string, any> = {} 

    if(authorId) {
        query.authorProfile = {
            id: authorId
        } 
    }
    if(search) {
        query['$text'] = {
            $search: search
        }
    }

    if(!page || !pageSize) {
        throw new BadRequestError("page or/and page size must be provided")
    }
    const mediaList = await MediaModel.find(query,{}, {skip: (page - 1) * pageSize, limit: pageSize})
    return {
        mediaList: mediaList.map((media) => media.toJSON()),
        page,
        pageSize
    }    
}

export const addMediaService = async (input: AddMediaServiceInput) => {
    const {videoBase64, media, jwtToken, extension} = input ?? {}
    const {name, tagsIds, authorId,  ...mediaRest} = media ?? {}

    if (!videoBase64 || !name || !extension) {
        throw new BadRequestError("No video data/name/extension provided.")
    }

    try {
        const getUserResponse = await getUserInfo({jwtToken, userId: authorId.toString() })
        if(!getUserResponse.success) {
            throw new BadRequestError(`something went wrong ${getUserResponse}`)
        }

        const {user} = getUserResponse
        const {videoPath, thumbnailPath} = await encodeVideoAndGenerateScreenShots({name, videoBase64, extension})
        const newMedia = await MediaModel.create({
            name,
            fileType: getMediaFileType(extension),
            mediaType: MediaType.Real,
            ...mediaRest,
            videoUrl: videoPath,
            thumbImage: thumbnailPath,
            // tags?: MediaTag[], to do get tags using tags ids
            authorProfile: {
                id: authorId,
                name: user?.displayName,
                avatar: user?.avatar
            },
            likesCount: 0,
            viewsCount: 0,
            status: MediaStatus.Active,
            createdAt: Date.now(),
            updatedAt: Date.now()
        })
        return {media: newMedia.toJSON()}
    }
    catch(err) {
        console.log('err' , err)
        throw new BadRequestError(`Something went wrong, could not parse your request ${err}`)
    }
}


export const encodeVideoAndGenerateScreenShots = ( {name, videoBase64, extension}:{name: string,videoBase64: string, extension: string}) : Promise<{videoPath: string, thumbnailPath: string}> => {
    return new Promise((resolve,reject) => {
        try {
            // Decode base64 video
            const fileName = cleanFilename(name)
            const videoBuffer = Buffer.from(videoBase64, 'base64');

            const videoFileName = `${fileName}.${extension}`
            const screenshotFileName = `${fileName}_screenshot.png`
            const  projectRoot = configUtil.getRoot()
            const basePath = path.join('uploads',  randomUUID())
            const fullPath = path.resolve(projectRoot, '../', basePath)
            const videoPath = path.resolve(fullPath,videoFileName)
            const screenshotPath = path.resolve(fullPath, screenshotFileName)

            if(!fs.existsSync(fullPath)) {
                fs.mkdirSync(fullPath, { recursive: true });
            }

            // Save video to disk
            fs.writeFileSync(videoPath, videoBuffer);
            // Extract screenshot from the video
            ffmpeg(videoPath)
            .screenshots({
                timestamps: ['00:00:00.000'],
                filename: path.basename(screenshotPath),
                folder: path.dirname(screenshotPath),
                size: '1280x720' // High quality size
            })
            .on('end', () => {
                resolve({
                    videoPath: path.join(basePath, videoFileName),
                    thumbnailPath: path.join(basePath,screenshotFileName)
                })
            })
            .on('error', (err: Error) => {
                console.log('mediaService > encodeVideoAndGenerateScreenShots error : ', err)
                reject(err)
            });
        }
        catch(error) {
            console.log('mediaService > encodeVideoAndGenerateScreenShots try catch error : ', error)
            reject(error)
        }
    })
}

export const updateMediaService = async () => {
    console.log('updateMediaService LOG ======')
}

export const getMediaDetailsService = async () => {
    console.log('getMediaDetails LOG ========')
}

export const deleteMediaService = async () => {
    console.log('deleteMediaService LOG =======')
}