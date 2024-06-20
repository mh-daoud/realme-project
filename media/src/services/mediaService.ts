import { AddMediaServiceInput } from "common/types/MediaServiceTypes"
import multer, { Multer } from "multer";
import fs from 'fs'
import path from 'path'
import BadRequestError from "@common/errorModels/BadRequestError";
import { randomUUID } from "crypto";
import { cleanFilename } from "common/utils/generalUtil";

export const listMediaService = async () => {
    console.log('listMediaService LOG =========')
}


// Set up Multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = 'uploads/';
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload: Multer = multer({ storage });

export const addMediaService = async (input: AddMediaServiceInput) => {
    const {videoBase64, media} = input ?? {}
    const {name} = media ?? {}
    if (!videoBase64) {
        throw new BadRequestError("No video data provided.")
    }

    // Decode base64 video
    const videoFolder = randomUUID()
    const fileName = cleanFilename(name)
    const videoBuffer = Buffer.from(videoBase64, 'base64');
    const videoPath = path.join('uploads', videoFolder, `${fileName}`);
    const screenshotPath = path.join('uploads', videoFolder, `${fileName}_screenshot.png`);

    // Save video to disk
    fs.writeFileSync(videoPath, videoBuffer);

    console.log('addMediaService LOG =======')
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