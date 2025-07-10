import { Router } from "express";
import {
  FilesController,
  ProcessListController,
  ProcessResultsController,
  ProcessStatusController,
  ProcessStopController,
} from "../infrastructura/controllers/process-files.controllers";
import uploadFile from "../infrastructura/config/middleware";
import {
  crearUsuarioController,
  loginController,
} from "../infrastructura/controllers/usuario.controllers";
import { middlewareVerifyToken } from "../infrastructura/config/auth.middleware";
const rutas = Router();
/**
 * @openapi
 * /login:
 *  post:
 *    summary: Login usuario
 *    tags:
 *      -Usuario:
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              password:
 *                type: string
 *                dscription: "Contraseña del usuario"
 *                example:  "111111"
 *              usuario:
 *                type: string
 *                description: "Usuario registrado"
 *                example: "mariano"
 *    responses:
 *      200:
 *        description:  Login OK
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                mensaje:
 *                  type: string
 *                  example: "Login ok"
 *                  description: "Mensaje de login"
 *                data:
 *                  type: string
 *                  example:  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NmNhZDZlMmVmNTE0NDk3NmQ1MjIwOCIsInVzdWFyaW8iOiJqb3NlIiwiaWF0IjoxNzUxOTkzMzMyLCJleHAiOjE3NTE5OTY5MzJ9.W6ftoim-hPb01BA8LpWz_Cv-gEkm6-G6YsU9mnGb2c8"
 *                  description: "TOKEN"
 *      500:
 *        descripcion:  Error login
 *
 *
 */
rutas.post("/login", loginController);
/**
 * @openapi
 * /crearUsuario:
 *  post:
 *    summary: Crear un nuevo usuario validando que no esté creado anteriormente
 *    tags:
 *      - Usuarios
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Usuarios'
 *    responses:
 *      201:
 *        description: Usuario creado correctamente
 *      400:
 *        description: Error en los datos enviados
 */
rutas.post("/crearUsuario", middlewareVerifyToken, crearUsuarioController);

/**
 * @openapi
 * /process/start:
 *  post:
 *    summary: Inicia el procesamiento de un archivo subido
 *    tags:
 *      - Procesos
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *          schema:
 *            type: object
 *            properties:
 *              file:
 *                type: string
 *                format: binary
 *    responses:
 *      200:
 *        description: Procesamiento iniciado correctamente
 *      400:
 *        description: Error en la subida o en el procesamiento del archivo
 */
rutas.post(
  "/process/start",
  middlewareVerifyToken,
  uploadFile.single("file"),
  FilesController
);
/**
 * @openapi
 * /process/stop/{process_id}:
 *  post:
 *    summary: Detiene un proceso en ejecución
 *    tags:
 *      - Procesos
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: process_id
 *        required: true
 *        example:  0a2c79d2-c660-4555-a8d9-d839264dc4d7
 *        schema:
 *          type: string
 *        description: ID del proceso a detener
 *    responses:
 *      200:
 *        description: Proceso detenido correctamente
 *      404:
 *        description: Proceso no encontrado
 *      400:
 *        description: Error en la solicitud
 */
rutas.post(
  "/process/stop/:process_id",
  middlewareVerifyToken,
  ProcessStopController
);
/**
 * @openapi
 * /process/results/{process_id}:
 *  get:
 *    summary: Obtener el estado del proceso de un archivo
 *    tags:
 *      - Procesos
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: process_id
 *        required: true
 *        example: 08dae850-cc67-4b76-a2b2-a1da30352b2d
 *        schema:
 *          type: string
 *        description: ID del proceso a consultar
 *    responses:
 *      200:
 *        description: Estado del proceso obtenido correctamente
 *      404:
 *        description: Proceso no encontrado
 *      400:
 *        description: Error al obtener el estado del proceso
 */
rutas.get(
  "/process/results/:process_id",
  middlewareVerifyToken,
  ProcessResultsController
);
/**
 * @openapi
 * /process/list:
 *  get:
 *    summary: Obtener el resultado  del archivo
 *    tags:
 *      - Procesos
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        description: Obtener el resultado  del archivo
 *      404:
 *        description: Proceso no encontrado
 *      400:
 *        description: Error al obtener el estado del proceso
 */
rutas.get("/process/list", middlewareVerifyToken, ProcessListController);
/**
 * @openapi
 * /process/status/{process_id}:
 *  get:
 *    summary: Obtener el estado del proceso seleccionado
 *    tags:
 *      - Procesos
 *    security:
 *    parameters:
 *      - in: path
 *        name: process_id
 *        requerid: true
 *        example: 0a2c79d2-c660-4555-a8d9-d839264dc4d7
 *        schema:
 *          type: string
 *        descripcion: ID del proceso a consultar
 *    responses:
 *      200:
 *        description: El archivo tiene el siguiente estado
 * 
 */
rutas.get("/process/status/:process_id", middlewareVerifyToken, ProcessStatusController);
export default rutas;
