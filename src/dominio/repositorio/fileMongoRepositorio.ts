import { IFileRespositorio } from "../../infrastructura/repositorio/file-process.respositorio";
import File, { IFileSchemma } from "../schema/file";
import { Status } from "../enum/status";
import { Respuesta } from "../entidad/respuesta";

export class FilesRepositorio implements IFileRespositorio {
  async processFile(newFile: IFileSchemma) {
    try {
      const respuesta = await newFile.save();
      return new Respuesta("EL archivo se proceso", respuesta);
    } catch (error) {
      throw new Error("Error al guardar el archivo " + error);
    }
  }
  async ProcessStop(process_id: string) {
    try {
      const file = await File.findOne({ process_id });
      file.status = Status.STOPPED;
      return await file.save();
    } catch (error) {
      throw new Error("Error al detener el proceso del archivo " + error);
    }
  }

  async ProcessStatus(process_id: string): Promise<IFileSchemma> {
    try {
      const file = await File.findOne({ process_id });
      return file;
    } catch (error) {
      throw new Error("Error al obtener el stado del archivo " + error);
    }
  }
  async ProcessList(): Promise<IFileSchemma[]> {
    try {
      return await File.find();
    } catch (error) {
      throw new Error("Error al obtener el listado" + error);
    }
  }
}
