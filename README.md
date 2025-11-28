# Taller Final NestJS - Sistema de Gestión Educativa

### Realizado por: Carlos Alfonso Niño Perdomo

Sistema completo de gestión educativa desarrollado con NestJS, TypeORM y PostgreSQL. Incluye gestión de usuarios, profesores, estudiantes, cursos e inscripciones con autenticación JWT.

## Tecnologías Utilizadas

### Backend
- **NestJS** v11.0.1 - Framework de Node.js
- **TypeORM** v0.3.27 - ORM para TypeScript
- **PostgreSQL** - Base de datos
- **JWT** - Autenticación
- **Passport** - Estrategias de autenticación
- **bcrypt** - Encriptación de contraseñas
- **class-validator** - Validación de DTOs
- **class-transformer** - Transformación de objetos

### Frontend
- HTML5
- CSS3
- JavaScript (Vanilla)

## 🚀 Instalación

### 1. Clonar el repositorio

```powershell
git clone https://github.com/KhinzWasTaken/TallerFinalNestJS.git
cd TallerFinalNestJS
```

### 2. Configurar la base de datos PostgreSQL

#### Opción A: Usando pgAdmin o cualquier cliente PostgreSQL
1. Abre pgAdmin u otro cliente de PostgreSQL
2. Crea una nueva base de datos llamada `taller_nestjs` (o el nombre que prefieras)

#### Opción B: Usando la línea de comandos
```powershell
# Conectar a PostgreSQL
psql -U postgres

# Crear la base de datos
CREATE DATABASE taller_nestjs;

# Salir de psql
\q
```

### 3. Configurar variables de entorno

Crea un archivo `.env` en la carpeta `backend`:

```powershell
cd backend
New-Item -Path .env -ItemType File
```

Edita el archivo `.env` y agrega las siguientes variables (ajusta según tu configuración):

```env
# Configuración de Base de Datos
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=tu_contraseña
DB_NAME=taller_nestjs
```


### 4. Instalar dependencias

#### Backend
```powershell
# Desde la carpeta backend
cd backend
npm install
```

Esto instalará todas las dependencias listadas en el `package.json`.

## Configuración

### Estructura de la base de datos

Las tablas se crearán automáticamente gracias a la configuración `synchronize: true` en TypeORM. El sistema creará las siguientes entidades:

- **usuarios** - Usuarios del sistema con roles
- **profesores** - Información de profesores
- **estudiantes** - Información de estudiantes
- **cursos** - Cursos disponibles
- **inscripciones** - Relación estudiantes-cursos

## 🏃 Ejecución del Proyecto

### Backend (Servidor NestJS)

#### Modo desarrollo (recomendado para desarrollo)
```powershell
cd backend
npm run start:dev
```

Este comando inicia el servidor en modo watch, reiniciándose automáticamente cuando detecta cambios.


### Frontend

El frontend es una aplicación estática. Puedes abrirla de la siguiente manera:

### Abrir directamente
Navega a la carpeta `frontend` y abre `index.html` en tu navegador.



## 📚 Uso de la API

### Endpoints Principales

#### Autenticación
```http
POST /auth/login
Content-Type: application/json

{
  "correo": "usuario@example.com",
  "contrasena": "password123"
}
```

#### Usuarios
```http
GET    /usuarios           # Listar todos los usuarios
GET    /usuarios/:id       # Obtener un usuario
POST   /usuarios           # Crear un usuario
PATCH  /usuarios/:id       # Actualizar un usuario
DELETE /usuarios/:id       # Eliminar un usuario
```

#### Profesores
```http
GET    /profesores         # Listar todos los profesores
GET    /profesores/:id     # Obtener un profesor
POST   /profesores         # Crear un profesor
PATCH  /profesores/:id     # Actualizar un profesor
DELETE /profesores/:id     # Eliminar un profesor
```

#### Estudiantes
```http
GET    /estudiantes        # Listar todos los estudiantes
GET    /estudiantes/:id    # Obtener un estudiante
POST   /estudiantes        # Crear un estudiante
PATCH  /estudiantes/:id    # Actualizar un estudiante
DELETE  /estudiantes/:id   # Eliminar un estudiante
```

#### Cursos
```http
GET    /cursos             # Listar todos los cursos
GET    /cursos/:id         # Obtener un curso
POST   /cursos             # Crear un curso
PATCH  /cursos/:id         # Actualizar un curso
DELETE /cursos/:id         # Eliminar un curso
```

#### Inscripciones
```http
GET    /inscripciones      # Listar todas las inscripciones
GET    /inscripciones/:id  # Obtener una inscripción
POST   /inscripciones      # Crear una inscripción
PATCH  /inscripciones/:id  # Actualizar una inscripción
DELETE /inscripciones/:id  # Eliminar una inscripción
```

### Autenticación con JWT

Para acceder a rutas protegidas, incluye el token JWT en el header:

```http
Authorization: Bearer tu_token_jwt_aqui
```

## Capturas de funcionamiento

<img width="1084" height="911" alt="{A2C24CCE-1F58-42A0-8143-6F8DCF7C6E8A}" src="https://github.com/user-attachments/assets/c492cb54-34db-44c6-82c4-75e27d6ffc16" />

<img width="1023" height="932" alt="{AAB336EB-50A3-4C36-B2BE-82E680430079}" src="https://github.com/user-attachments/assets/01dca211-96ae-493c-9fee-2a212912587e" />

<img width="978" height="882" alt="{02EE9A97-6C1D-4268-A468-F1D7C133C1F7}" src="https://github.com/user-attachments/assets/eb8f865b-b360-49dc-a3e7-8e8c28a99068" />

<img width="529" height="650" alt="{F468E87D-AD72-4232-8FC5-2856E93CD107}" src="https://github.com/user-attachments/assets/e9129c72-c09b-4d9a-a455-03d89fd7eab8" />

<img width="558" height="889" alt="{763F042A-707D-439A-838C-1E0AE9C26825}" src="https://github.com/user-attachments/assets/0e12ae17-e394-443e-83c8-56c1db02e669" />






