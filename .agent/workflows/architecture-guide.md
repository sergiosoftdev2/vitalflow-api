---
description: Guía de arquitectura y creación de estructuras para Vyntal API
---

# Guía de Estructura de Proyecto Vyntal API

Esta guía detalla cómo está construido el proyecto y las reglas a seguir al crear nuevos módulos, controladores, servicios o cualquier otra estructura.

## Arquitectura General
El proyecto utiliza **NestJS** con **Mongoose (MongoDB)**. Se sigue una estructura modular donde cada funcionalidad principal reside en su propio directorio dentro de `src/`.

## Estructura de Directorios (src/)
Cada nuevo módulo debe seguir este patrón:

```text
src/
└── [nombre-del-modulo]/
    ├── dto/                    # Objetos de Transferencia de Datos (Validación)
    │   └── [accion].dto.ts
    ├── schemas/                # Esquemas de Mongoose
    │   └── [nombre].schema.ts
    ├── strategies/             # Estrategias de Passport (si aplica)
    │   └── [nombre].strategy.ts
    ├── [nombre].controller.ts  # Endpoints y lógica de rutas
    ├── [nombre].service.ts     # Lógica de negocio y acceso a datos
    └── [nombre].module.ts      # Definición del módulo NestJS
```

## Convenciones de Código

### 1. Módulos (.module.ts)
- Siempre exportar los servicios que puedan ser usados por otros módulos.
- Importar `MongooseModule.forFeature` para registrar esquemas.

### 2. Servicios (.service.ts)
- Usar `@Injectable()`.
- Inyectar modelos usando `@InjectModel(Nombre.name)`.
- Usar `bcryptjs` para el manejo de contraseñas (NUNCA `bcrypt` nativo por compatibilidad con Docker).

### 3. Controladores (.controller.ts)
- Usar decoradores `@Controller('ruta')`.
- Manejar validaciones a través de DTOs.
- Usar `@UseGuards()` para proteger rutas (ej. `AuthGuard('google')`).

### 4. Esquemas (.schema.ts)
- Usar decoradores `@Schema({ timestamps: true })`.
- Definir propiedades con `@Prop()`.
- Exportar tanto la clase como el `SchemaFactory.createForClass()`.

## Rutas Definidas
- **Auth**:
  - `POST /auth/register`: Registro de nuevos usuarios.
  - `POST /auth/login`: Login tradicional.
  - `GET /auth/google`: Inicia el flujo de Google OAuth.
  - `GET /auth/google/redirect`: Callback de Google OAuth.
- **App**:
  - `GET /`: Endpoint de saludo (AppController).

## Base de Datos
- **URL**: `mongodb://mongodb:27017/vyntal` (en Docker).
- **Puertos**: `27018` mapeado a `27017` localmente.

## Docker y Despliegue
- La API corre en el puerto `3000`.
- Se usa `pnpm` dentro del Dockerfile, pero el proyecto mantiene un `package-lock.json` (usar `npm` para instalaciones locales).
- **Importante**: Al añadir dependencias que requieran compilación nativa, preferir alternativas en JS puro (como `bcryptjs`).

## Pasos para crear un nuevo Módulo
1. Crear el directorio en `src/`.
2. Definir el esquema en `schemas/` si requiere persistencia.
3. Crear el Service con la lógica necesaria.
4. Crear el Controller para exponer los endpoints.
5. Definir el Module y registrarlo en `app.module.ts`.
