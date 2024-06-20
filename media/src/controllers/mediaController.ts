import { addMediaService, deleteMediaService, getMediaDetailsService, listMediaService, updateMediaService } from "common/services/mediaService"
import { Request, Response } from "express"

export const listMedia = async (req: Request, res: Response) => {
    listMediaService()
    res.json({message: 'ok!'})
}

export const addMedia = async (req: Request, res: Response) => {
    addMediaService()
    res.json({message: 'ok!'})
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