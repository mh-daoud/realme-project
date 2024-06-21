import { AuthenticatedRequest } from "@common/types/AuthenticatedRequest"
import { addMediaService, deleteMediaService, getMediaDetailsService, listMediaService, updateMediaService } from "src/services/mediaService"
import { AddMediaServiceInput } from "src/types/MediaServiceTypes"
import { Request, Response } from "express"
import path from 'path'

export const listMedia = async (req: Request, res: Response) => {
    const {page, pageSize, filter} = req.body
    const listMedia = await listMediaService({filter, page, pageSize})
    res.json({...listMedia, success: true})
}

export const addMedia = async (req: AuthenticatedRequest, res: Response) => {
    const {  name,
        description,
        tagsIds,
        authorId,
        status,
        allowComments,
        videoBase64,
        extension
    } = req.body ?? {}

    const {jwtToken} = req.user ?? {}
    
    const addMediaInput: AddMediaServiceInput  = {
        jwtToken: jwtToken ?? "",
        media: {
        name,
        description,
        tagsIds,
        authorId,
        status,
        allowComments
        },
        videoBase64,
        extension
    }
    
    const media = await addMediaService(addMediaInput)
    res.json({media, success: true})
}

export const updateMedia = async (req: Request, res: Response) => {
   
    updateMediaService()
    res.json({message: 'ok!'})
}

export const getMediaDetails = async (req: Request, res: Response) => {
    getMediaDetailsService()
    res.json({message: 'ok!'})
}

export const deleteMedia = async (req: Request, res: Response) => {
    deleteMediaService()
    res.json({message: 'ok!'})
}