import { inject, injectable } from "inversify";
import { TYPES } from "../compartido/types";
import { IFileRespositorio } from "../infrastructura/repositorio/file-process.respositorio";
import { Request, Response } from "express";
import fs from "fs";
import readline from "readline";
import File, { IFileSchemma } from "../dominio/schema/file";
import { Status } from "../dominio/enum/status";
import { v4 as uuidv4 } from "uuid";
import { BaseError } from "../compartido/base-error";
import { Respuesta } from "../dominio/entidad/respuesta";
@injectable()
export class FileService {
  constructor(
    @inject(TYPES.FilesRepositorio) private _filesRepositorio: IFileRespositorio
  ) {}
  async processFileService(req: Request, res: Response): Promise<any> {
    let respuesta;
    try {
      if (req.file) {
        const filePath = req.file?.path;
        const fileStream = fs.createReadStream(filePath);
        const rl = readline.createInterface({
          input: fileStream,
          crlfDelay: Infinity,
        });
        let wordCount: number = 0;
        let lineCount: number = 0;
        let charCount: number = 0;
        for await (const line of rl) {
          lineCount = lineCount + 1;
          wordCount += line.trim().split(/\s+/).filter(Boolean).length;
          charCount += line.length;
        }
        const totalWord = await this.totalWord(filePath);
        const newFile: IFileSchemma = new File({
          process_id: uuidv4(),
          status: Status.RUNNING,
          progress: {
            total_files: lineCount,
            processed_files: totalWord.lineCount,
            percentage: 100,
          },
          started_at: new Date(),
          estimated_completion: new Date(),
          results: {
            total_words: wordCount,
            total_lines: lineCount,
            total_charts: charCount,
            files_processed: [req.file?.originalname],
          },
        });
        respuesta = await this._filesRepositorio.processFileRepository(newFile);
        return new Respuesta("EL archivo se proceso", respuesta);
      }
    } catch (error: any) {
      throw new BaseError(error.httpCode, error.message);
    }
  }
  async totalWord(filePath: string) {
    const fileStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });
    let wordCount: number = 0;
    let lineCount: number = 0;
    for await (const line of rl) {
      lineCount = lineCount + 1;
      wordCount += line.trim().split(/\s+/).filter(Boolean).length;
    }
    return { lineCount, wordCount };
  }
  async ProcessStopService(process_id: string) {
    try {
      const process = await this._filesRepositorio.ProcessRepository(
        process_id
      );
      const respuesta = await this._filesRepositorio.updateProcessRepository(
        process
      );
      return new Respuesta("Proceso detenido", respuesta);
    } catch (error: any) {
      throw new BaseError(error.httpCode, error.message);
    }
  }
  async ProcessResultService(process_id: string) {
    try {
      const respuesta = await this._filesRepositorio.ProcessRepository(
        process_id
      );
      return new Respuesta("Analisis de resultado ", respuesta);
    } catch (error: any) {
      throw new BaseError(error.httpCode, error.message);
    }
  }
  async ProcessListService() {
    try {
      const respuesta = await this._filesRepositorio.ProcessListRepository();
      return new Respuesta(`Listado de procesos de archivos`, respuesta);
    } catch (error: any) {
      throw new BaseError(error.httpCode, error.message);
    }
  }
  async ProcessStatusService(process_id: string) {
    try {
      const respuesta = await this._filesRepositorio.ProcessRepository(
        process_id
      );
      const {
        status,
        results: { files_processed },
      } = respuesta;
      return new Respuesta(`El archivo ${files_processed[0]}`, {
        status: status,
      });
    } catch (error: any) {
      throw new BaseError(error.httpCode, error.message);
    }
  }
}
