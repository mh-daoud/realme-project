import axios, { AxiosResponse } from 'axios'
import configUtil from '@common/utils/configUtil'
import { GetUserInfoApiResponse } from 'src/types/ApiServiceTypes'
const ApiService = axios.create()

const ApiEndpoints = {
    Auth: {
        GetUserInfo: 'api/auth/v1/userInfo'
    }
}

export const getUserInfo = async ({jwtToken, userId}: {jwtToken: string, userId: string}) => {
    const authHostname = configUtil.getAuthHostname()
    const url = `${authHostname}${ApiEndpoints.Auth.GetUserInfo}`
    const response: AxiosResponse<GetUserInfoApiResponse>  = await ApiService.post(url,{userId}, {
        headers: {
            Authorization: `Bearer ${jwtToken}`
        }
    }).catch()
   return response.data
}

