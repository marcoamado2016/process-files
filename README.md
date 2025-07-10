# 📂 API de Procesamiento de Archivos - Documentación Técnica

## Descripción General:
Este proyecto es una API REST desarrollada en **Node.js con TypeScript**
Toda la información procesada se almacena en una base de datos **No Relacional (MongoDB en la nube)** y es accesible mediante endpoints.

---

### Arquitectura Hexagonal (Ports & Adapters):
Elegí la arquitectura hexagonal porque:
- Aísla el dominio del negocio de las tecnologías externas (base de datos, Express, JWT, etc.).
- Facilita pruebas unitarias y futuras integraciones.
- Permite que el core de la aplicación NO dependa de frameworks externos.
- Reduce el acoplamiento

**Componentes clave:**
- **Controladores**: Reciben las solicitudes HTTP.
- **Servicios**: Contienen la lógica del negocio.
- **Repositorios**: Acceso abstracto a la base de datos.
- **Inversify**: Inyección de dependencias para desacoplar componentes.

---

### Base de Datos No Relacional:(MongoDB Atlas Cloud)
- Flexibilidad para almacenar documentos JSON complejos.
- Ideal para almacenar los resultados de procesamiento (archivos y estadísticas).
- Fácil integración con Node.js mediante **Mongoose**.

---

## Librerías Instaladas y Justificación:

| Librería              | Justificación                                                                                        |
|-----------------------|------------------------------------------------------------------------------------------------------|
| **bcrypt**            | Para encriptar contraseñas de forma segura.                                                          |
| **class-transformer** | Para transformar y mapear objetos, ideal para deserializar solicitudes y respuestas.                 |
| **class-validator**   | Validación robusta de datos en DTOs, asegurando integridad antes de procesar.                        |
| **dotenv**            | Manejo de variables de entorno (clave secreta, URL DB, etc.).                                        |
| **express**           | Framework web minimalista para construir la API REST.                                                |
| **inversify**         | Inyección de dependencias para un código desacoplado y testeable.                                    |
| **jsonwebtoken**      | Autenticación mediante tokens JWT.                                                                   |
| **mongoose**          | ODM para MongoDB, para modelar y gestionar datos de forma sencilla.                                  |
| **morgan**            | Middleware de logs HTTP para monitorear solicitudes.                                                 |
| **multer**            | Middleware para la carga de archivos en endpoints (subida de archivos).                              |
| **reflect-metadata**  | Necesaria para el funcionamiento de decorators y la inyección de dependencias.                       |
| **swagger-jsdoc**     | Generación automática de documentación Swagger (OpenAPI) desde anotaciones en el código.             |
| **swagger-ui-express**| Interfaz web para visualizar la documentación Swagger de la API.                                     |
| **uuid**              | Generación de identificadores únicos para los procesos de análisis de archivos.                      |

---

## Patrones Aplicados:
- **Inyección de Dependencias (Inversify)**: Facilita el desacoplamiento y las pruebas unitarias.
- **Repositorio**: Abstrae el acceso a datos, permitiendo cambiar MongoDB sin afectar el negocio.
- **Controlador-Servicio-Repositorio**: Separación clara entre:
  - Controladores (entrada HTTP)
  - Servicios (lógica del negocio)
  - Repositorios (persistencia de datos)
- **Middleware Global de Errores**: Manejador de errores centralizado para respuestas uniformes.

---

## Documentación API:
- **Swagger (swagger-jsdoc + swagger-ui-express)**:
  - Documentación automática, mantenida en el mismo código fuente.
  - Permite explorar y probar los endpoints desde un navegador.

---

## Herramientas de Desarrollo:
- **Visual Studio Code**: Entorno de desarrollo.
- **Postman**: Pruebas manuales de la API.
- **MongoDB Atlas**: Base de datos MongoDB en la nube, segura y escalable.

---

##  Ejecutar:
```bash
npm install
npm run dev
