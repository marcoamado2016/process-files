# Sistema de procesamiento de archivos

Este proyecto es un **Sistema de Procesamiento de archivos** que permite cargar, procesar y analizar archivos de texto mediante una **API REST**.

---

### Para ejecutar los enpoinds :

- Se crea un archivo **.env** fuera de la carpeta scr
  Dentro del archivo agregar estas credenciales

**PORT**=3000
**MONGODB_URL**=mongodb+srv://marcos242016:FI20KADeNak4xtf6@jovenesmedeacluster.w764l.mongodb.net/?retryWrites=true&w=majority&appName=jovenesMedeaCluster
**SECRET_KEY**="clave_secreta"

---

### API REST de Control de Procesos:

- **POST `/process/start`** → Iniciar un nuevo proceso de importacíon de archivo.
- **POST `/process/stop/{process_id}`** → Detener un proceso en ejecución.
- **GET `/process/status/{process_id}`** → Consultar el estado de un proceso.
- **GET `/process/list`** → Listar todos los procesos y sus estados.
- **GET `/process/results/{process_id}`** → Obtener los resultados del análisis de un proceso.

---

### Detalles de las Funcionalidades de cada API:

### Para ejecutar cada endpoind se usa el swagger que se levanta al arrancar el proyecto con npm run dev ejecutada en la terminal. Tambien se puede ejecutar usando postman, importando el archivo exercise_file

- **POST `/login`** → Todos los enpoinds tienen seguridad y se valida el token generado por este.Para ejecutar el login el usuario = jose , password = 1234
- **POST `/process/start`** → Para ejecutar se tiene que importar un archivo desde swaggwer presionando try it out => Elegir archivo.

- **POST `/process/stop/{process_id}`** → Para detener el proceso se debe colocar el process_id de un archivo que exista ejemplo 08dae850-cc67-4b76-a2b2-a1da30352b2d.Para saber cuales son los procesos ejecutar este enpoind `/process/list`

- **GET `/process/status/{process_id}`** → Consultar el estado de un proceso colocando el process_id.
- **GET `/process/list`** → Listar todos los procesos y sus estados.
- **GET `/process/results/{process_id}`** → Obtener los resultados del análisis de un proceso colocando el process_id.

---

### Estados de los Procesos:

- `PENDING`: Proceso creado pero aún no iniciado.
- `RUNNING`: Procesamiento en progreso.
- `PAUSED`: Proceso pausado temporalmente.
- `COMPLETED`: Proceso finalizado exitosamente.
- `FAILED`: Proceso finalizado con errores.
- `STOPPED`: Proceso detenido manualmente.

---

## Instalación se usa npm install

1. Clonar el repositorio:

```bash
git clone https://github.com/marcoamado2016/process-files.git
```

2. npm install
3. Archivo para importar

```bash
 Link:  https://drive.google.com/drive/folders/1ufT6fAQu7pMcWP3C3xvDWYLs8BtzYali?usp=drive_link
```
