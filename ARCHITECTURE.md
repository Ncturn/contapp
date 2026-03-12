# 🏗️ Arquitectura de ContApp

## Tabla de Contenidos

- [Descripción General](#descripción-general)
- [Stack Tecnológico](#stack-tecnológico)
- [Diagrama de Arquitectura](#diagrama-de-arquitectura)
- [Estructura de Directorios](#estructura-de-directorios)
- [Capas de la Aplicación](#capas-de-la-aplicación)
- [Flujo de Datos](#flujo-de-datos)
- [Patrones de Diseño](#patrones-de-diseño)
- [Configuración de Build](#configuración-de-build)

---

## Descripción General

ContApp es una **aplicación de escritorio multiplataforma** desarrollada con Electron para la gestión contable. Permite administrar cuentas contables y pólizas a través de una interfaz gráfica moderna, con un backend REST integrado que persiste los datos en MongoDB.

La aplicación combina tres entornos en uno solo:
- **Electron** como contenedor de escritorio
- **React** como interfaz de usuario
- **Express + MongoDB** como backend de datos

---

## Stack Tecnológico

### Frontend
| Tecnología | Versión | Uso |
|------------|---------|-----|
| React | 17.0.1 | Librería de UI |
| React Router DOM | 5.2.0 | Enrutamiento SPA |
| React Hook Form | 6.14.0 | Gestión de formularios |
| @hookform/error-message | 0.0.5 | Mensajes de error en formularios |
| @fortawesome/react-fontawesome | 0.1.14 | Iconos |
| node-sass | ^5.0.0 | Preprocesador CSS |

### Backend
| Tecnología | Versión | Uso |
|------------|---------|-----|
| Express | 4.17.1 | Framework web |
| Mongoose | 5.11.10 | ODM para MongoDB |
| body-parser | 1.19.0 | Parseo de peticiones HTTP |
| cors | 2.8.5 | Control de acceso CORS |
| node-input-validator | 4.2.1 | Validación de datos |

### Desktop
| Tecnología | Versión | Uso |
|------------|---------|-----|
| Electron | ^11.1.1 | Shell de escritorio |
| electron-is-dev | 1.2.0 | Detección de entorno |
| electron-builder | ^22.9.1 | Empaquetado de la app |

### Herramientas de Build
| Tecnología | Versión | Uso |
|------------|---------|-----|
| Webpack | ^4.44.2 | Empaquetado de módulos |
| Babel | ^7.12.3 | Transpilador JS |
| ESLint (Airbnb) | ^7.13.0 | Linter de código |
| concurrently | ^5.3.0 | Ejecución paralela de scripts |

---

## Diagrama de Arquitectura

```
┌─────────────────────────────────────────────────────────────┐
│                    ELECTRON (Desktop Shell)                  │
│                     electron.js                              │
│                                                              │
│  ┌───────────────────────────────────────────────────────┐  │
│  │              REACT APP (Renderer Process)              │  │
│  │                  Puerto: 8080 (dev)                    │  │
│  │                                                        │  │
│  │  ┌──────────────────────────────────────────────────┐ │  │
│  │  │              containers/App.jsx                   │ │  │
│  │  │            HashRouter + Rutas                     │ │  │
│  │  └────────────────────┬─────────────────────────────┘ │  │
│  │                       │                                │  │
│  │         ┌─────────────┼──────────────┐                 │  │
│  │         ▼             ▼              ▼                 │  │
│  │  ┌────────────┐ ┌──────────┐ ┌────────────┐           │  │
│  │  │  Account   │ │  Policy  │ │   Layout   │           │  │
│  │  │ Component  │ │Component │ │  /Navbar   │           │  │
│  │  └─────┬──────┘ └────┬─────┘ └────────────┘           │  │
│  │        │             │                                 │  │
│  │  ┌─────▼──────┐ ┌────▼─────┐                          │  │
│  │  │AccountForm │ │PolicyForm│                           │  │
│  │  │  /Table    │ │  /Table  │                           │  │
│  │  └────────────┘ └──────────┘                           │  │
│  └───────────────────────┬───────────────────────────────┘  │
│                           │ HTTP Requests (fetch)            │
│  ┌────────────────────────▼──────────────────────────────┐  │
│  │          EXPRESS API (Main Process / Servidor)         │  │
│  │                   Puerto: 3000                         │  │
│  │                                                        │  │
│  │  ┌──────────────────┐    ┌──────────────────────────┐ │  │
│  │  │  /account routes │    │    /policy routes        │ │  │
│  │  │  network.js      │    │    network.js            │ │  │
│  │  └────────┬─────────┘    └────────────┬─────────────┘ │  │
│  │           │                           │               │  │
│  │  ┌────────▼─────────┐    ┌────────────▼─────────────┐ │  │
│  │  │    controller.js │    │      controller.js       │ │  │
│  │  │    (Account)     │    │      (Policy)            │ │  │
│  │  └────────┬─────────┘    └────────────┬─────────────┘ │  │
│  │           │                           │               │  │
│  │  ┌────────▼─────────┐    ┌────────────▼─────────────┐ │  │
│  │  │     store.js     │    │        store.js          │ │  │
│  │  │    (Account)     │    │        (Policy)          │ │  │
│  │  └────────┬─────────┘    └────────────┬─────────────┘ │  │
│  └───────────┼───────────────────────────┼───────────────┘  │
│              │        Mongoose ODM        │                  │
│  ┌───────────▼───────────────────────────▼───────────────┐  │
│  │                 MongoDB (Base de Datos)                 │  │
│  │                 mongodb://localhost:27017/contapp       │  │
│  │                                                        │  │
│  │       ┌──────────────┐    ┌──────────────────┐        │  │
│  │       │  accounts    │    │    policies      │        │  │
│  │       │  collection  │◄───│    collection    │        │  │
│  │       └──────────────┘    └──────────────────┘        │  │
│  └────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## Estructura de Directorios

```
contapp/
│
├── electron.js                    # Punto de entrada de Electron
├── package.json                   # Dependencias y scripts del proyecto
├── .babelrc                       # Configuración de Babel
├── .eslintrc                      # Reglas de ESLint (Airbnb)
│
├── webpack.config.js              # Webpack: frontend React
├── webpack.server.config.js       # Webpack: backend Express
├── webpack.electron.config.js     # Webpack: main process Electron
├── webpack.dll.config.js          # Webpack: DLL de librerías (optimización)
│
├── public/
│   └── index.html                 # Plantilla HTML
│
├── server/                        # Backend REST
│   ├── server.js                  # Servidor Express principal (puerto 3000)
│   ├── mongoDB.js                 # Configuración y conexión a MongoDB
│   │
│   ├── components/                # Módulos de negocio (feature-based)
│   │   ├── Account/
│   │   │   ├── model.js           # Schema Mongoose de Account
│   │   │   ├── controller.js      # Lógica de negocio + validaciones
│   │   │   ├── network.js         # Rutas Express de /account
│   │   │   └── store.js           # Queries a MongoDB
│   │   └── Policy/
│   │       ├── model.js           # Schema Mongoose de Policy
│   │       ├── controller.js      # Lógica de negocio + validaciones
│   │       ├── network.js         # Rutas Express de /policy
│   │       └── store.js           # Queries a MongoDB
│   │
│   ├── network/
│   │   └── routes.js              # Router principal, monta sub-routers
│   │
│   └── utils/
│       ├── CustomValidator.js     # Wrapper de node-input-validator
│       ├── ErrorResponse.js       # Formato estándar de errores
│       └── commonQueries.js       # Queries reutilizables (accountExists, etc.)
│
└── src/                           # Frontend React
    ├── index.js                   # Punto de entrada React (ReactDOM.render)
    │
    ├── containers/
    │   └── App.jsx                # Componente raíz: Router + librería FA
    │
    ├── components/                # Componentes reutilizables
    │   ├── Layout.jsx             # Estructura base (Navbar + children)
    │   ├── Navbar.jsx             # Barra de navegación
    │   ├── Account.jsx            # Lista de cuentas contables
    │   ├── AccountForm.jsx        # Formulario crear/editar cuenta
    │   ├── Policy.jsx             # Lista de pólizas
    │   ├── PolicyForm.jsx         # Formulario crear/editar póliza
    │   ├── PolicyFormRow.jsx      # Fila dinámica de movimiento en póliza
    │   ├── Table.jsx              # Tabla genérica con acciones CRUD
    │   └── TableRow.jsx           # Fila de tabla con botones editar/borrar
    │
    ├── views/                     # Vistas (páginas) de la aplicación
    │   ├── createAccount.jsx      # Vista: crear cuenta
    │   ├── editAccount.jsx        # Vista: editar cuenta
    │   ├── CreatePolicy.jsx       # Vista: crear póliza
    │   └── EditPolicy.jsx         # Vista: editar póliza
    │
    ├── hooks/
    │   └── useAccount.jsx         # Custom hook para obtener cuentas
    │
    └── assets/
        └── styles/
            └── components/
                ├── AccountForm.scss
                ├── AccountTable.scss
                ├── Navbar.scss
                └── PolicyForm.scss
```

---

## Capas de la Aplicación

### Capa 1: Electron (Desktop Shell)
El archivo `electron.js` actúa como el punto de entrada de Electron. En modo desarrollo carga la aplicación desde `http://localhost:8080` (webpack-dev-server). En modo producción carga los archivos estáticos del build.

```javascript
// electron.js - Lógica simplificada
const isDev = require('electron-is-dev');
mainWindow.loadURL(
  isDev ? 'http://localhost:8080' : `file://${path.join(__dirname, 'index.html')}`
);
```

### Capa 2: Frontend React (Renderer Process)
Aplicación SPA con HashRouter. Los componentes se comunican con el backend a través de la API Fetch nativa del navegador. La gestión de formularios está centralizada con `react-hook-form`.

**Rutas disponibles:**
| Ruta | Componente | Descripción |
|------|-----------|-------------|
| `/` | `Account` | Pantalla principal (lista de cuentas) |
| `/account` | `Account` | Lista de cuentas contables |
| `/account/create` | `CreateAccount` | Formulario de creación |
| `/account/edit/:id` | `EditAccount` | Formulario de edición |
| `/policy` | `Policy` | Lista de pólizas |
| `/policy/create` | `CreatePolicy` | Formulario de creación |
| `/policy/edit/:id` | `EditPolicy` | Formulario de edición |

### Capa 3: Backend Express (API REST)
Servidor corriendo en el puerto `3000`. Cada módulo de negocio tiene su propia carpeta con 4 archivos (model, controller, network, store) siguiendo el patrón feature-based.

**Endpoints disponibles:**
- `GET /` — Bienvenida
- `GET|POST|PATCH|DELETE /account` — CRUD de cuentas
- `GET|POST|PATCH|DELETE /policy` — CRUD de pólizas

### Capa 4: MongoDB (Base de Datos)
Base de datos `contapp` en MongoDB local. Se conecta mediante Mongoose ODM con dos colecciones principales: `accounts` y `policies`. La colección `policies` referencia a `accounts` mediante el campo `movements[].account`.

---

## Flujo de Datos

### Operación CRUD típica (ejemplo: crear cuenta)

```
1. Usuario llena el formulario en AccountForm.jsx
           │
           ▼
2. react-hook-form valida los campos en el cliente
           │
           ▼
3. onSubmit() ejecuta fetch('http://localhost:3000/account/', { method: 'POST', body: JSON.stringify(data) })
           │
           ▼
4. Express Router (network.js) recibe la petición POST /account
           │
           ▼
5. controller.createAccount(req.body) valida datos con CustomValidator
           │
           ▼
6. store.save(account) verifica unicidad del identificador
           │
           ▼
7. Mongoose Model.save() persiste el documento en MongoDB
           │
           ▼
8. Response JSON { error: null, body: accountData } con código 201
           │
           ▼
9. Frontend muestra alert() con el mensaje de éxito y redirige a /account
```

### Flujo de edición de póliza (con populate)

```
EditPolicy.jsx
    │── fetch GET /policy?identifier=XX001
    │        └── store.find() → Model.find().populate('movements.account')
    │                └── MongoDB resuelve la referencia ObjectId → Account
    │── getRefactorPolicy(): extrae identifier y description de cada account
    │── PolicyForm recibe los datos pre-llenados
    └── onSubmit() → fetch PATCH /policy → store.edit()
```

---

## Patrones de Diseño

### 1. Feature-Based Architecture (Backend)
Cada módulo de negocio (`Account`, `Policy`) tiene su propia carpeta con todos sus archivos relacionados: model, controller, network, store. Esto facilita el mantenimiento y la escalabilidad.

```
server/components/
├── Account/          ← Un módulo autocontenido
│   ├── model.js      ← Datos
│   ├── store.js      ← Acceso a datos
│   ├── controller.js ← Lógica de negocio
│   └── network.js    ← Interfaz HTTP
└── Policy/           ← Otro módulo autocontenido
```

### 2. Container/Presentational Pattern (Frontend)
- **Containers** (`containers/App.jsx`): Configuran el enrutador y el estado global
- **Components** (`components/`): Componentes de UI reutilizables
- **Views** (`views/`): Páginas que combinan componentes y definen valores iniciales

### 3. Custom Hooks
El directorio `hooks/` contiene lógica reutilizable extraída de los componentes:
- `useAccount`: Obtiene la lista de cuentas desde la API

### 4. Controlled Forms con react-hook-form
Los formularios (`AccountForm`, `PolicyForm`) usan `react-hook-form` para:
- Registro de campos con `register()`
- Validación declarativa en el `ref`
- Reset de valores con `reset(formValues)`
- Lectura de valores en tiempo real con `getValues()`

---

## Configuración de Build

### Webpack (4 configuraciones)

| Archivo | Entrada | Salida | Descripción |
|---------|---------|--------|-------------|
| `webpack.config.js` | `src/index.js` | `build/` | Frontend React (producción) |
| `webpack.server.config.js` | `server/server.js` | `build/` | Backend Express empaquetado |
| `webpack.electron.config.js` | `electron.js` | `build/` | Main process de Electron |
| `webpack.dll.config.js` | Librerías React | `build/` | DLL para optimizar builds |

### Proceso de Build completo

```bash
npm run build
# Equivale a:
# 1. webpack --mode production           (frontend)
# 2. webpack --config webpack.server.config.js --mode production  (backend)
# 3. webpack --config webpack.electron.config.js --mode production (electron)
# 4. electron-builder                    (empaqueta todo el ejecutable)
```

### Entorno de Desarrollo

```bash
npm start
# Ejecuta en paralelo (concurrently):
# 1. webpack serve --mode development    (frontend en localhost:8080)
# 2. wait-on http://localhost:8080       (espera a que el frontend cargue)
#    && electron ./electron.js           (luego abre Electron)
```

> ⚠️ **Nota**: El servidor Express (`server:start`) debe iniciarse por separado con `npm run server:start` durante el desarrollo.
