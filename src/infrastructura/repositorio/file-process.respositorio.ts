import { Respuesta } from "../../dominio/entidad/respuesta";
import { IFileSchemma } from "../../dominio/schema/file";

export interface IFileRespositorio {
  processFile(newFile: IFileSchemma): Promise<Respuesta>;
  ProcessStop(process_id: string): Promise<IFileSchemma>;
  ProcessStatus(process_id: string): Promise<IFileSchemma>;
  ProcessList(): Promise<IFileSchemma[]>;
}
