import { Respuesta } from "../../dominio/entidad/respuesta";
import { IUsuario } from "../../dominio/schema/usuario";

export interface IUsuarioRepositorio {
  crearUsuarioRepositorio(newUsuario: IUsuario): Promise<Respuesta>;
  findUsuario(usuario: string): Promise<Respuesta>;
}
