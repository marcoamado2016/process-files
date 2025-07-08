import "dotenv/config";
import express from "express";
import rutas from "./interfaz/file.routes";
import connection from "./infrastructura/db/connection";
import { configurarSwagger } from "./infrastructura/config/swagger";
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
configurarSwagger(app);
app.use(rutas);
connection()
  .then(() => {
    app.listen(port, () => {
      console.log(`Servidor corriendo en http://localhost:${port}`);
      console.log(
        `Documentación Swagger disponible en http://localhost:${port}/api-docs`
      );
    });
  })
  .catch((error) => {
    console.log("Error ", error);
  });
