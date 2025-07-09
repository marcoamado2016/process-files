# Document Processing System

Este proyecto es un **Sistema de Procesamiento de Documentos** que permite cargar, procesar y analizar archivos de texto de manera **asíncrona** mediante una **API REST**.

---

### API REST de Control de Procesos:

- **POST `/process/start`** → Iniciar un nuevo proceso de análisis de archivos.
- **POST `/process/stop/{process_id}`** → Detener un proceso en ejecución.
- **GET `/process/status/{process_id}`** → Consultar el estado de un proceso.
- **GET `/process/list`** → Listar todos los procesos y sus estados.
- **GET `/process/results/{process_id}`** → Obtener los resultados del análisis de un proceso.

---

### Funcionalidades del Sistema:

- Procesamiento **por lotes** de archivos de texto desde una carpeta específica.
- Generación de estadísticas básicas:
  - Conteo de palabras.
  - Cantidad de líneas.
  - Cantidad de caracteres.
- Identificación de las **palabras más frecuentes**.
- Creación de un **resumen de contenido**.

---

###  Estados de los Procesos:

- `PENDING`: Proceso creado pero aún no iniciado.
- `RUNNING`: Procesamiento en progreso.
- `PAUSED`: Proceso pausado temporalmente.
- `COMPLETED`: Proceso finalizado exitosamente.
- `FAILED`: Proceso finalizado con errores.
- `STOPPED`: Proceso detenido manualmente.

---

## 📦 Instalación

1. Clonar el repositorio:

```bash
git clone <URL-del-repo>
```
