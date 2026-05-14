# Diskrypt

## Descripción del Proyecto

Diskrypt es un sistema de almacenamiento seguro de archivos que implementa cifrado para guardar información de manera protegida en una base de datos local (SQLite). El proyecto está conformado por un **backend** desarrollado en Node.js y un **frontend** ágil empaquetado con Vite.

El sistema, además de soportar operaciones CRUD de archivos, presenta una arquitectura diseñada para manejar un sistema de jerarquía de usuarios empresariales y empleados, priorizando la seguridad y encriptación de extremo a extremo.

## Características Principales

- **Almacenamiento Cifrado:** Los archivos se cargan y encriptan conservando sus vectores de inicialización (IV) y *salts* necesarios. Todo el contenido sensible se almacena de forma segura en formato `BLOB` dentro de SQLite.
- **Protecciones de Seguridad:** El backend implementa `helmet` para proveer encabezados HTTP seguros, `cors` para delimitar accesos de origen cruzado, y `express-rate-limit` para controlar la cantidad de peticiones y prevenir ataques de fuerza bruta o DDoS.
- **Frontend Interactivo:** Herramienta rápida e intuitiva empaquetada con Vite utilizando JavaScript Vanilla.

## Tecnologías Utilizadas

### Backend
- **Node.js** y **Express**: Framework principal para el control y enrutamiento del servidor (API REST).
- **better-sqlite3**: Driver ultra rápido para la gestión síncrona de las bases de datos SQLite locales.
- **Otras librerías**: `dotenv`, `helmet`, `cors`, `express-rate-limit`.

### Frontend
- **Vite**: Entorno de ejecución y construcción (Build tool) de alta velocidad.
- **Desarrollo**: Interfaz web basada en HTML, CSS, y JavaScript, que incluye lógica de criptografía del lado del cliente antes de subir datos.

## Requisitos

- **Node.js**: Se recomienda una versión reciente (v18 o superior).
- **NPM o Yarn**: Como gestor de paquetes.

## Instalación y Configuración

### 1. Clonar el repositorio
```bash
git clone https://github.com/EmilianoBecerra/diskrypt
cd diskrypt
```

### 2. Configurar el Backend
```bash
cd backend
npm install
```
Asegúrate de preparar o configurar las variables de entorno en un archivo `.env` para la carpeta `backend`.
Variables clave a configurar según el código fuente:
- `PORT` (puerto del servidor, por defecto 3000)
- `MAX_FILE_SIZE` (ej. '10mb' para la carga permitida por peticiones de express)
- `URL` (la dirección del punto de origen de tu frontend para CORS, e.g. 'http://localhost:5173')
- `DB_PATH` (la ruta al archivo SQLite, ej. `./storage.db`)

Para iniciar el servidor en modo desarrollo:
```bash
npm run dev
```

### 3. Configurar el Frontend
En una nueva terminal, dirígete al directorio frontend:
```bash
cd ../front
npm install
```

Para levantar el servidor de desarrollo del lado visible:
```bash
npm run dev
```

## Estructura de Directorios

- `backend/`: Contiene toda la lógica del lado del servidor.
  - `config/`: Archivos para el modelo y conexión de la base de datos.
  - `db/`: Entidades de acceso a datos para resolver la recuperación y guardado de archivos.
  - `routes/`: Controladores de ruta para archivos (`files.js`).
- `front/`: Directorio principal del frontend empaquetado con Vite.

## Creado por
Emiliano Becerra.
