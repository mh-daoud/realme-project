import { StatusCodes } from "http-status-codes";
import CustomAPIError from "./CustomAPIError";

export default class NotFoundError extends CustomAPIError {
    constructor(message: string) {
        super(message);
        this.statusCode = StatusCodes.NOT_FOUND;
    }
}
