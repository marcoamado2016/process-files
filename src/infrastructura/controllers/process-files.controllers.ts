import { Request, Response } from "express";
import { HTTP_CODES } from "../../compartido/http.codes";
import container from "../config/inversify";
import { FileService } from "../../aplicacion/file.service";
export const _file = container.get<FileService>(FileService);
export const FilesController = async (req: Request, res: Response) => {
  try {
    const respuesta = await _file.processFile(req, res);
    res.status(HTTP_CODES.CREATED).send(respuesta);
  } catch (error: any) {
    res.status(HTTP_CODES.INTERNAL_ERROR).json({ error: error.message });
  }
};
export const ProcessStopController = async (req: Request, res: Response) => {
  try {
    const { process_id } = req.params;
    const respuesta = await _file.ProcessStop(process_id);
    res.status(HTTP_CODES.OK).send(respuesta);
  } catch (error: any) {
    res.status(HTTP_CODES.INTERNAL_ERROR).json({ error: error.message });
  }
};

export const ProcessStatusController = async (req: Request, res: Response) => {
  try {
    const { process_id } = req.params;
    const respuesta = await _file.ProcessStatus(process_id);
    res.status(HTTP_CODES.OK).send(respuesta);
  } catch (error: any) {
    res.status(HTTP_CODES.INTERNAL_ERROR).json({ error: error.message });
  }
};
export const ProcessListController = async (req: Request, res: Response) => {
  try {
    const respuesta = await _file.ProcessList();
    res.status(HTTP_CODES.OK).send(respuesta);
  } catch (error: any) {
    res.status(HTTP_CODES.INTERNAL_ERROR).json({ error: error.message });
  }
};
