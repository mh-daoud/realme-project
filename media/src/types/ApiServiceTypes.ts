import {CustomResponse} from '@common/responseModel/CustomResponse'
import { User } from '@common/types/User'

export interface GetUserInfoApiResponse extends CustomResponse {
    user: User | null
    jwtToken: string | null
}