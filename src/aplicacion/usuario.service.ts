import { inject, injectable } from "inversify";
import { TYPES } from "../compartido/types";
import { IUsuarioRepositorio } from "../infrastructura/repositorio/usuario.repositorio";
import { UsuarioEntity } from "../dominio/entidad/usuario";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Usuario, { ISchemaUsuario, IUsuario } from "../dominio/schema/usuario";
import { Respuesta } from "../dominio/entidad/respuesta";
import { BaseError } from "../compartido/base-error";
import { HTTP_CODES } from "../compartido/http.codes";
import { Validator } from "../compartido/validar.error";
@injectable()
export class UsuarioServise {
  constructor(
    @inject(TYPES.UsuarioRepositorio)
    private usuarioRepositorio: IUsuarioRepositorio
  ) {}
  async crearUsuarioService(usuarioEntity: UsuarioEntity) {
    if (usuarioEntity) await Validator.validar(usuarioEntity, UsuarioEntity);
    let { password, usuario } = usuarioEntity;
    password = await bcrypt.hash(password, 10);
    const newUsuario: IUsuario = new Usuario({
      usuario,
      password,
    });
    const respuesta = await this.usuarioRepositorio.findUsuario(usuario);
    if (respuesta.data)
      throw new BaseError(HTTP_CODES.NOT_FOUND, "Usuario ya esta registrado");
    return await this.usuarioRepositorio.crearUsuarioRepositorio(newUsuario);
  }
  async loginService(usuarioParams?: UsuarioEntity) {
    if (usuarioParams) await Validator.validar(usuarioParams, UsuarioEntity);
    const secret = process.env.SECRET_KEY;
    if (!secret) {
      throw new Error("SECRET_KEY no definida en variables de entorno");
    }
    if (usuarioParams?.usuario) {
      let { password, usuario } = usuarioParams;
      const usuarioFind = await this.usuarioRepositorio.findUsuario(usuario);
      if (!usuarioFind)
        throw new BaseError(
          HTTP_CODES.NOT_FOUND,
          "No se encontro el usuario registrado"
        );
      const usuarioLogin = await bcrypt.compare(
        password,
        usuarioFind.data.password
      );
      if (!usuarioLogin)
        throw new BaseError(
          HTTP_CODES.NOT_FOUND,
          "Usuario y/o contraseña no valida"
        );
      const token = await jwt.sign(
        { id: usuarioFind.data._id, usuario: usuarioFind.data.usuario },
        secret,
        { expiresIn: "1h" }
      );

      return new Respuesta("TOKEN", token);
    }
  }
}
