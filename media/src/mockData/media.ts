import { Media, MediaFileType, MediaType } from "../types/Media";

export const mockMedias: Media[] = [{
    id: '10',
    name: 'Sample 001',
    url: 'https://google.com',
    fileType: MediaFileType.MP4,
    mediaType: MediaType.Real,
    tags: [{name: 'action2024', id: '20'}]
},
{
    id: '20',
    name: 'Sample 002',
    url: 'https://google.com',
    fileType: MediaFileType.MP4,
    mediaType: MediaType.Real,
    tags: [{name: 'drama', id: '10'}]
},
{
    id: '30',
    name: 'Sample 003',
    url: 'https://google.com',
    fileType: MediaFileType.MP4,
    mediaType: MediaType.Real,
    tags: [{name: 'comedy', id: '30'}]
},
{
    id: '40',
    name: 'Sample 004',
    url: 'https://google.com',
    fileType: MediaFileType.MP4,
    mediaType: MediaType.Real,
    tags: [{name: 'crime', id: '40'}]
}
]