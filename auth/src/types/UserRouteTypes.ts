import { CustomResponse } from "@common/responseModel/CustomResponse";
import { User } from "@common/types/User";

export interface CreateUserRouteResponse extends CustomResponse {
    user: User
    jwtToken: string
}