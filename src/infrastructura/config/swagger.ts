import { Express } from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
const swaggeerOptions: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "DOcumentacion APIS para el manejo de archivos",
      version: "1.0.0",
      description: "DOcumentacion APIS para el manejo de archivos",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        Usuarios: {
          type: "object",
          properties: {
            usuario: { type: "string" },
            password: { type: "string" },
          },
          required: ["usuario", "password"],
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ["./src/interfaz/*.ts"],
};
const swaggerSpec = swaggerJSDoc(swaggeerOptions);

export const configurarSwagger = (app: Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
