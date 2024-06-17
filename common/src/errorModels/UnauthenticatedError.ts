import { StatusCodes } from "http-status-codes";
import CustomAPIError from "./CustomAPIError";

export default class UnauthenticatedError extends CustomAPIError {
    constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}