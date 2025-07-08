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
      throw new Error(error as string);
    }
  }
  async findUsuario(usuario: string): Promise<Respuesta> {
    try {
      const usuarioEncontrado = await Usuario.findOne({ usuario });
      return new Respuesta("Busqueda de usuario ", usuarioEncontrado);
    } catch (error) {
      throw new Error(error as string);
    }
  }
}
