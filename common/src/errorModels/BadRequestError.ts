import CustomAPIError from "./CustomAPIError";
import {StatusCodes} from 'http-status-codes'

export default class BadRequestError extends CustomAPIError {
  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}
