import dotenv from "dotenv";
dotenv.config();

import { Request, Response } from "express";
import { HTTP_CODES } from "../../compartido/http.codes";
import jwt from "jsonwebtoken";
export const middlewareVerifyToken = (
  req: Request,
  res: Response,
  next: any
) => {
  try {
    const secret = process.env.SECRET_KEY;
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer")) {
      res.status(HTTP_CODES.FORBIDDEN).json({ mensagge: "Formato no valido" });
      return;
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      res.status(HTTP_CODES.FORBIDDEN).json({ mensagge: "No hay token" });
      return;
    }

    const verify = jwt.verify(token, secret as string);
    (req as any).user = verify;
    next();
    return;
  } catch (error) {
    res
      .status(HTTP_CODES.FORBIDDEN)
      .json({ error: "Token inválido o expirado" });
    return;
  }
};
