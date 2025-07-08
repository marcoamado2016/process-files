import { Container } from "inversify";
import { IFileRespositorio } from "../repositorio/file-process.respositorio";
import { TYPES } from "../../compartido/types";
import { FilesRepositorio } from "../../dominio/repositorio/fileMongoRepositorio";
import { FileService } from "../../aplicacion/file.service";
import { UsuarioServise } from "../../aplicacion/usuario.service";
import { IUsuarioRepositorio } from "../repositorio/usuario.repositorio";
import { UsuarioMongoRepositorio } from "../../dominio/repositorio/usuarioMongoRepositorio";

const container = new Container();

container.bind<IFileRespositorio>(TYPES.FilesRepositorio).to(FilesRepositorio);
container.bind<FileService>(FileService).toSelf();

container
  .bind<IUsuarioRepositorio>(TYPES.UsuarioRepositorio)
  .to(UsuarioMongoRepositorio);
container.bind<UsuarioServise>(UsuarioServise).toSelf();
export default container;
