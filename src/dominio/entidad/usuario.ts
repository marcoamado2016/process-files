import { IsNotEmpty, IsString } from "class-validator";

export class UsuarioEntity {
  id: string;
  @IsString()
  @IsNotEmpty()
  usuario: string;
  @IsString()
  @IsNotEmpty()
  password: string;
  constructor() {
    this.id = "";
    this.usuario = "";
    this.password = "";
  }
}
