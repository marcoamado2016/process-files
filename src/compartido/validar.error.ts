import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { BaseError } from "./base-error";
import { HTTP_CODES } from "./http.codes";

export class Validator {
  public static async validar<T>(entity: T, type: new () => T) {
    const instacia = plainToInstance(type, entity);
    const errors = await validate(instacia as any);
    let detalleErros = [];
    if (errors.length > 0) {
      detalleErros = errors.map((e) => {
        return {
          property: e.property,
          mesaage: e.constraints?.isString,
        };
      });
      console.log("error", detalleErros);
      throw new BaseError(
        HTTP_CODES.BAD_REQUEST,
        detalleErros.map((d) => `${d.property} => ${d.mesaage}`).join(",")
      );
    }
  }
}
