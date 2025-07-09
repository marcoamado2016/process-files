import { IFileRespositorio } from "../../infrastructura/repositorio/file-process.respositorio";
import File, { IFileSchemma } from "../schema/file";
import { Status } from "../enum/status";
import { Respuesta } from "../entidad/respuesta";
import { BaseError } from "../../compartido/base-error";
import { HTTP_CODES } from "../../compartido/http.codes";

export class FilesRepositorio implements IFileRespositorio {
  async processFile(newFile: IFileSchemma) {
    try {
      const respuesta = await newFile.save();
      return new Respuesta("EL archivo se proceso", respuesta);
    } catch (error) {
      throw new BaseError(HTTP_CODES.INTERNAL_ERROR, "Internal Server Error");
    }
  }
  async Process(process_id: string) {
    let file;
    try {
      file = await File.findOne({ process_id });
    } catch (error) {
      throw new BaseError(HTTP_CODES.INTERNAL_ERROR, "Internal Server Error");
    }
    if (!file) throw new BaseError(HTTP_CODES.NOT_FOUND, "File not found");
    return file;
  }
  async ProcessList(): Promise<IFileSchemma[]> {
    try {
      return await File.find();
    } catch (error) {
      throw new BaseError(HTTP_CODES.INTERNAL_ERROR, "Internal Server Error");
    }
  }
  async updateProcess(process: IFileSchemma) {
    try {
      process.status = Status.STOPPED;
      return await process.save();
    } catch (error) {
      throw new BaseError(HTTP_CODES.INTERNAL_ERROR, "Internal Server Error");
    }
  }
}
