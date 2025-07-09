import { HTTP_CODES } from "./http.codes";

export class BaseError extends Error {
  httpCode: HTTP_CODES;
  errors: string[] | undefined;
  constructor(
    httpCode = HTTP_CODES.INTERNAL_ERROR,
    message = `Ocurrió un error inesperado. Vuelva a intentarlo por favor`
  ) {
    super();
    this.httpCode = httpCode;
    this.message = message;
  }
}
