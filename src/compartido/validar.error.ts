import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { BaseError } from "./base-error";
import { HTTP_CODES } from "./http.codes";

export class Validator {
  public static async validar<T>(entity: T, type: new () => T) {
    const instacia = plainToInstance(type, entity);
    const errors = await validate(instacia as any);
    let detalleError = [];
    if (errors.length > 0) {
      detalleError = errors.map((e) => {
        return {
          property: e.property,
          mesaage: e.constraints?.isString,
        };
      });

      throw new BaseError(
        HTTP_CODES.BAD_REQUEST,
        detalleError.map((d) => `${d.property} => ${d.mesaage}`).join(",")
      );
    }
  }
}
