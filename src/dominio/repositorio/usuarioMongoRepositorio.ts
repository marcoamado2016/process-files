import { BaseError } from "../../compartido/base-error";
import { HTTP_CODES } from "../../compartido/http.codes";
import { IUsuarioRepositorio } from "../../infrastructura/repositorio/usuario.repositorio";
import { Respuesta } from "../entidad/respuesta";
import Usuario, { ISchemaUsuario } from "../schema/usuario";

export class UsuarioMongoRepositorio implements IUsuarioRepositorio {
  async crearUsuarioRepositorio(
    newUsuario: ISchemaUsuario
  ): Promise<Respuesta> {
    try {
      const usuarioSave = await newUsuario.save();
      const usuario = usuarioSave.toObject();
      return new Respuesta("Usuario creado OK", usuario);
    } catch (error) {
      throw new BaseError(HTTP_CODES.INTERNAL_ERROR, "Internal Server Error");
    }
  }
  async findUsuario(usuario: string): Promise<Respuesta> {
    let usuarioEncontrado;
    try {
      usuarioEncontrado = await Usuario.findOne({ usuario });
    } catch (error: any) {
      throw new BaseError(HTTP_CODES.INTERNAL_ERROR, "Internal Server Error");
    }
    if (usuarioEncontrado)
      throw new BaseError(
        HTTP_CODES.NOT_FOUND,
        "No se puede registrar, por que ya existe"
      );
    return new Respuesta("Busqueda de usuario ", usuarioEncontrado);
  }
}
