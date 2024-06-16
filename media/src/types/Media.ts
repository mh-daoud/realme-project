export interface Media {
    id: string
    name: string
    url: string
    fileType: MediaFileType
    mediaType: MediaType
    tags?: MediaTag[]
    
}


export interface MediaTag {
    id: string,
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