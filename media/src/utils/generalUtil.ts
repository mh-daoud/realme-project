import { MediaFileType } from '@common/types/Media';
import path from 'path'

export const  cleanFilename = (input: string) => {
    // Replace invalid characters with underscores
    const cleaned = input.replace(/[<>:"\/\\|?*\x00-\x1F\x7F]/g, '_')
                        // Replace multiple spaces or underscores with a single underscore
                         .replace(/[\s_]+/g, '_')
                         // Trim leading and trailing underscores or spaces
                         .replace(/^_+|_+$/g, '');

    // Enforce a maximum length
    const MAX_LENGTH = 255;
    if (cleaned.length > MAX_LENGTH) {
        const extension = path.extname(cleaned);
        const baseName = path.basename(cleaned, extension);
        return baseName.slice(0, MAX_LENGTH - extension.length) + extension;
    }

    return cleaned;
}


export const  getMediaFileType = (input: string): MediaFileType => {
    // Check if the input string is a valid enum value
    if (Object.values(MediaFileType).includes(input.toLowerCase() as MediaFileType)) {
        return input?.toLowerCase() as MediaFileType;
    }
    // Default to BASE if the input is not a valid enum value
    return MediaFileType.MP4;
}