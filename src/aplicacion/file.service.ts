import { inject, injectable } from "inversify";
import { TYPES } from "../compartido/types";
import { IFileRespositorio } from "../infrastructura/repositorio/file-process.respositorio";
import { Request, Response } from "express";
import fs from "fs";
import readline from "readline";
import File, { IFileSchemma } from "../dominio/schema/file";
import { Status } from "../dominio/enum/status";
import { v4 as uuidv4 } from "uuid";
import { Worker } from "worker_threads";
import path from "path";
@injectable()
export class FileService {
  constructor(
    @inject(TYPES.FilesRepositorio) private _filesRepositorio: IFileRespositorio
  ) {}
  async processFile(req: Request, res: Response): Promise<any> {
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
        respuesta = await this._filesRepositorio.processFile(newFile);
        if (respuesta) return respuesta;
      }
    } catch (error) {
      throw new Error(error as string);
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
  async ProcessStop(process_id: string) {
    try {
      return await this._filesRepositorio.ProcessStop(process_id);
    } catch (error) {
      throw new Error(error as string);
    }
  }
  async ProcessStatus(process_id: string) {
    try {
      return await this._filesRepositorio.ProcessStatus(process_id);
    } catch (error) {
      throw new Error(error as string);
    }
  }
  async ProcessList() {
    try {
      return await this._filesRepositorio.ProcessList();
    } catch (error) {
      throw new Error(error as string);
    }
  }
}
