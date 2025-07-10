
import { IFileSchemma } from "../../dominio/schema/file";
export interface IFileRespositorio {
  processFileRepository(newFile: IFileSchemma): Promise<IFileSchemma>;
  ProcessRepository(process_id: string): Promise<IFileSchemma>;
  ProcessListRepository(): Promise<IFileSchemma[]>;
  updateProcessRepository(process: IFileSchemma): Promise<IFileSchemma>;
}
