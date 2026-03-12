# ContApp

![Versión](https://img.shields.io/badge/versión-1.0.0-blue.svg)
![Licencia](https://img.shields.io/badge/licencia-ISC-green.svg)
![Node](https://img.shields.io/badge/node-%3E%3D10.0.0-brightgreen.svg)
![Electron](https://img.shields.io/badge/electron-11-9cf.svg)

> Aplicación de escritorio para la gestión de contabilidad: administra cuentas contables y pólizas de manera sencilla y eficiente.

---

## Tabla de Contenidos

- [Características](#-características)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación](#-instalación)
- [Scripts Disponibles](#-scripts-disponibles)
- [Guía Rápida de Inicio](#-guía-rápida-de-inicio)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Tecnologías Utilizadas](#-tecnologías-utilizadas)
- [Documentación](#-documentación)
- [Contribuciones](#-contribuciones)
- [Licencia](#-licencia)

---

## ✨ Características

- 📒 **Gestión de Cuentas Contables** — Crear, editar, listar y eliminar cuentas con validaciones de nivel, tipo y llave de control
- 📄 **Gestión de Pólizas** — Administrar pólizas contables con movimientos dinámicos (cargos y abonos)
- ✅ **Validación en tiempo real** — Formularios con validaciones del lado del cliente y del servidor
- 🖥️ **Aplicación de escritorio** — Empaquetada con Electron para Windows, Mac y Linux
- 🔗 **API REST integrada** — Backend Express con MongoDB para persistencia de datos
- 🎨 **Interfaz moderna** — UI construida con React y estilos en SCSS

---

## 📋 Requisitos Previos

Asegúrate de tener instalado:

| Herramienta | Versión mínima | Descarga |
|-------------|---------------|---------|
| Node.js | 10.x | [nodejs.org](https://nodejs.org) |
| npm | 6.x | Incluido con Node.js |
| MongoDB | 4.x | [mongodb.com](https://www.mongodb.com/try/download/community) |

---

## ⚙️ Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/Ncturn/contapp.git
cd contapp
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar MongoDB

Inicia MongoDB y crea la base de datos:

```bash
# Iniciar el servicio de MongoDB
mongod

# En otra terminal, crear la base de datos
mongo
> use contapp
```

> La aplicación se conecta automáticamente a `mongodb://localhost:27017/contapp`

### 4. Iniciar la aplicación

```bash
# Iniciar el servidor Express (en una terminal)
npm run server:start

# Iniciar la aplicación Electron + React (en otra terminal)
npm start
```

---

## 📜 Scripts Disponibles

| Script | Descripción |
|--------|-------------|
| `npm start` | Inicia el entorno de desarrollo: Webpack Dev Server + Electron |
| `npm run server:start` | Inicia el servidor Express con nodemon (puerto 3000) |
| `npm run webpack:start` | Solo inicia el Webpack Dev Server (puerto 8080) |
| `npm run webpack:build` | Compila el frontend para producción |
| `npm run webpack:server:build` | Compila el backend para producción |
| `npm run webpack:electron:build` | Compila el main process de Electron |
| `npm run webpack:dll:react` | Genera el DLL de React para optimizar builds |
| `npm run electron:build` | Empaqueta la aplicación con electron-builder |
| `npm run build` | Build completo de producción (todos los pasos anteriores) |

---

## 🚀 Guía Rápida de Inicio

### Desarrollo

```bash
# Terminal 1: Servidor API
npm run server:start
# → Servidor en http://localhost:3000

# Terminal 2: Aplicación Electron + React
npm start
# → Frontend en http://localhost:8080
# → Electron se abre automáticamente
```

### Producción

```bash
# Generar el ejecutable de la aplicación
npm run build
# → Genera el instalador en la carpeta dist/
```

### Flujo básico de uso

1. **Cuentas**: Ve a la sección "Cuentas" y crea las cuentas contables con su identificador (máx. 8 dígitos), nivel (1-5), tipo (resumen/detalle) y tipo de saldo (deudor/acreedor)
2. **Pólizas**: Ve a "Pólizas" y crea una póliza con su identificador (formato: 2 letras + 3 números, ej: `AB001`), fecha y movimientos
3. **Movimientos**: Cada movimiento en una póliza referencia una cuenta contable y debe especificar concepto, importe y tipo (cargo/abono)
4. **Validación**: Los abonos totales deben ser iguales a los cargos totales para guardar una póliza

---

## 📁 Estructura del Proyecto

```
contapp/
├── electron.js              # Punto de entrada de Electron
├── package.json             # Dependencias y scripts
├── webpack.config.js        # Build del frontend
├── webpack.server.config.js # Build del backend
├── webpack.electron.config.js # Build del proceso principal
├── webpack.dll.config.js    # DLL de librerías
│
├── server/                  # Backend (Express + MongoDB)
│   ├── server.js            # Servidor principal (puerto 3000)
│   ├── mongoDB.js           # Conexión a MongoDB
│   ├── components/          # Módulos de negocio
│   │   ├── Account/         # CRUD de cuentas
│   │   └── Policy/          # CRUD de pólizas
│   ├── network/             # Rutas principales
│   └── utils/               # Validador, manejo de errores
│
└── src/                     # Frontend (React)
    ├── index.js             # Punto de entrada React
    ├── containers/          # App.jsx: Router principal
    ├── components/          # Componentes reutilizables
    ├── views/               # Páginas de la aplicación
    ├── hooks/               # Custom hooks
    └── assets/              # Estilos SCSS
```

> Para una descripción detallada de la arquitectura, consulta [ARCHITECTURE.md](./ARCHITECTURE.md)

---

## 🛠️ Tecnologías Utilizadas

**Frontend**
- [React 17](https://reactjs.org/) — Librería de interfaz de usuario
- [React Router DOM 5](https://reactrouter.com/) — Enrutamiento SPA
- [React Hook Form 6](https://react-hook-form.com/) — Gestión de formularios
- [Font Awesome](https://fontawesome.com/) — Iconos
- [SCSS](https://sass-lang.com/) — Estilos

**Backend**
- [Express 4](https://expressjs.com/) — Framework web
- [Mongoose 5](https://mongoosejs.com/) — ODM para MongoDB
- [node-input-validator](https://www.npmjs.com/package/node-input-validator) — Validación de datos

**Desktop**
- [Electron 11](https://www.electronjs.org/) — Framework de escritorio
- [electron-builder](https://www.electron.build/) — Empaquetado multiplataforma

**Build & Dev Tools**
- [Webpack 4](https://webpack.js.org/) — Empaquetado de módulos
- [Babel 7](https://babeljs.io/) — Transpilación JS
- [ESLint (Airbnb)](https://eslint.org/) — Linting de código

---

## 📚 Documentación

| Documento | Descripción |
|-----------|-------------|
| [ARCHITECTURE.md](./ARCHITECTURE.md) | Arquitectura del sistema, capas y flujo de datos |
| [CONTRIBUTING.md](./CONTRIBUTING.md) | Guía de contribución y estándares de código |
| [docs/API.md](./docs/API.md) | Documentación completa de la API REST |
| [docs/COMPONENTS.md](./docs/COMPONENTS.md) | Documentación de componentes React |
| [docs/DATABASE.md](./docs/DATABASE.md) | Esquemas y modelos de MongoDB |

---

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor, lee [CONTRIBUTING.md](./CONTRIBUTING.md) para conocer el proceso de pull requests y los estándares de código del proyecto.

---

## 📄 Licencia

Este proyecto está bajo la licencia **ISC**. Consulta el archivo `package.json` para más detalles.

---

## 👤 Contacto

**Ncturn** — [@Ncturn](https://github.com/Ncturn)

Proyecto: [https://github.com/Ncturn/contapp](https://github.com/Ncturn/contapp)

