import { Request, Response } from "express";
import { HTTP_CODES } from "../../compartido/http.codes";
import container from "../config/inversify";
import { UsuarioServise } from "../../aplicacion/usuario.service";
export const _usuario = container.get<UsuarioServise>(UsuarioServise);

export const crearUsuarioController = async (req: Request, res: Response) => {
  try {
    const respuesta = await _usuario.crearUsuarioService(req.body);
    res.status(HTTP_CODES.CREATED).send(respuesta);
  } catch (error: any) {
    res.status(error.httpCode).json({ error: error.message });
  }
};

export const loginController = async (req: Request, res: Response) => {
  try {
    const respuesta = await _usuario.loginService(req.body);
    res.status(HTTP_CODES.CREATED).send(respuesta);
  } catch (error: any) {
    res.status(error.httpCode).json({ error: error.message });
  }
};
