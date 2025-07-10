import { ISchemaUsuario, IUsuario } from "../../dominio/schema/usuario";

export interface IUsuarioRepositorio {
  crearUsuarioRepositorio(newUsuario: IUsuario): Promise<ISchemaUsuario>;
  findUsuario(usuario: string): Promise<ISchemaUsuario>;
}
