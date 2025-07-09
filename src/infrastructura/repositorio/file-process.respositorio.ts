import { Respuesta } from "../../dominio/entidad/respuesta";
import { IFileSchemma } from "../../dominio/schema/file";

export interface IFileRespositorio {
  processFile(newFile: IFileSchemma): Promise<Respuesta>;
  Process(process_id: string): Promise<IFileSchemma>;
  ProcessList(): Promise<IFileSchemma[]>;
  updateProcess(process: IFileSchemma): Promise<IFileSchemma>;
}
