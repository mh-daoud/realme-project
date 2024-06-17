export interface SocialMediaChannel {
    type: SocialMediaType
    url: string
    label?: string
}

export enum SocialMediaType {
    Facebook = 'facebook',
    Twitter_X = 'twitter-x',
    Youtube = 'youtube'
}