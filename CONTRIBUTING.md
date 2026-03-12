# 🤝 Guía de Contribución — ContApp

## Tabla de Contenidos

- [Configuración del Entorno de Desarrollo](#-configuración-del-entorno-de-desarrollo)
- [Estándares de Código](#-estándares-de-código)
- [Convenciones de Nombres](#-convenciones-de-nombres)
- [Estructura de Commits](#-estructura-de-commits)
- [Proceso de Pull Requests](#-proceso-de-pull-requests)
- [Cómo Reportar Bugs](#-cómo-reportar-bugs)
- [Cómo Proponer Nuevas Características](#-cómo-proponer-nuevas-características)

---

## 🔧 Configuración del Entorno de Desarrollo

### Requisitos previos

- **Node.js** >= 10.0.0
- **npm** >= 6.x
- **MongoDB** >= 4.x (corriendo localmente)
- **Git** instalado

### Pasos para configurar el entorno

#### 1. Fork y clonar el repositorio

```bash
# Hacer fork desde GitHub, luego:
git clone https://github.com/TU_USUARIO/contapp.git
cd contapp

# Agregar el repositorio original como remote
git remote add upstream https://github.com/Ncturn/contapp.git
```

#### 2. Instalar dependencias

```bash
npm install
```

#### 3. Verificar que ESLint funciona

```bash
npx eslint src/
npx eslint server/
```

#### 4. Iniciar el entorno de desarrollo

```bash
# Terminal 1: Servidor API Express
npm run server:start

# Terminal 2: Webpack + Electron
npm start
```

#### 5. Verificar la instalación

- El servidor Express debe responder en `http://localhost:3000`
- La ventana de Electron debe abrirse mostrando la lista de cuentas

---

## 📐 Estándares de Código

El proyecto usa **ESLint con la configuración Airbnb**. El archivo `.eslintrc` en la raíz define las reglas. Antes de hacer un commit, asegúrate de que tu código pasa el linter:

```bash
npx eslint src/           # Verificar frontend
npx eslint server/        # Verificar backend
```

### Reglas principales (Airbnb Style Guide)

| Regla | Descripción |
|-------|-------------|
| Indentación | 2 espacios |
| Comillas | Simples `'` para strings |
| Punto y coma | Requerido al final de sentencias |
| `const` / `let` | Preferir `const`, evitar `var` |
| Arrow functions | Usar para funciones anónimas |
| Destructuring | Usar cuando sea posible |
| Template literals | Usar en lugar de concatenación |
| `async/await` | Preferir sobre `.then()/.catch()` |

### Ejemplo de código correcto

```javascript
// ✅ Correcto
const getAccount = async (identifier) => {
  const response = await fetch(`http://localhost:3000/account/?identifier=${identifier}`);
  const { body, error } = await response.json();
  return { body, error };
};

// ❌ Incorrecto
var getAccount = function(identifier) {
  return fetch("http://localhost:3000/account/?identifier=" + identifier)
    .then(function(response) { return response.json(); });
}
```

### Componentes React

```jsx
// ✅ Correcto: componente funcional con props desestructuradas
const AccountForm = ({ title, httpMethod, formValues, history }) => {
  // lógica del componente
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* JSX */}
    </form>
  );
};

export default AccountForm;
```

---

## 📝 Convenciones de Nombres

### Archivos

| Tipo | Convención | Ejemplo |
|------|-----------|---------|
| Componentes React | PascalCase | `AccountForm.jsx` |
| Vistas React | PascalCase | `CreatePolicy.jsx` |
| Custom Hooks | camelCase con `use` | `useAccount.jsx` |
| Archivos de servidor | camelCase | `controller.js`, `store.js` |
| Estilos SCSS | PascalCase (igual al componente) | `AccountForm.scss` |

### Variables y funciones

| Tipo | Convención | Ejemplo |
|------|-----------|---------|
| Variables | camelCase | `accountData`, `policyList` |
| Constantes | camelCase | `const maxLength = 8` |
| Funciones | camelCase | `getAccount()`, `handleSubmit()` |
| Componentes React | PascalCase | `AccountForm`, `PolicyFormRow` |
| Modelos Mongoose | camelCase | `accountModel`, `policyModel` |

### Rutas de la API

- Usar sustantivos en singular en inglés: `/account`, `/policy`
- Parámetros de query para filtros: `GET /account?identifier=10000001`
- Sin versioning en la URL por ahora

---

## 📦 Estructura de Commits

El proyecto sigue la convención de **Conventional Commits**:

```
<tipo>(<ámbito>): <descripción breve>

[cuerpo opcional]

[footer opcional]
```

### Tipos de commits

| Tipo | Descripción | Ejemplo |
|------|-------------|---------|
| `feat` | Nueva funcionalidad | `feat(account): agregar filtro por tipo` |
| `fix` | Corrección de bug | `fix(policy): corregir validación de fecha` |
| `docs` | Cambios en documentación | `docs: actualizar README` |
| `style` | Cambios de formato sin lógica | `style: corregir indentación en PolicyForm` |
| `refactor` | Refactorización sin nuevo comportamiento | `refactor(store): simplificar función find` |
| `test` | Agregar o modificar pruebas | `test(account): agregar test de creación` |
| `chore` | Cambios en configuración/build | `chore: actualizar webpack a v5` |

### Ejemplos de buenos commits

```bash
git commit -m "feat(policy): agregar campo de notas al movimiento"
git commit -m "fix(account): corregir error al borrar cuenta con llave de control"
git commit -m "docs(api): documentar endpoint de pólizas"
git commit -m "refactor(controller): extraer validaciones a función separada"
```

---

## 🔄 Proceso de Pull Requests

### Antes de crear un PR

1. **Sincroniza** tu fork con el repositorio original:
   ```bash
   git fetch upstream
   git checkout main
   git merge upstream/main
   ```

2. **Crea una rama** descriptiva desde `main`:
   ```bash
   git checkout -b feat/nombre-de-la-caracteristica
   # o
   git checkout -b fix/descripcion-del-bug
   ```

3. **Haz tus cambios** siguiendo los estándares de código

4. **Verifica el linter**:
   ```bash
   npx eslint src/ server/
   ```

5. **Prueba manualmente** que los cambios funcionan correctamente

6. **Commit** siguiendo la convención de commits

7. **Push** a tu fork:
   ```bash
   git push origin feat/nombre-de-la-caracteristica
   ```

### Crear el Pull Request

Al crear el PR en GitHub, incluye:

- **Título claro**: Describe el cambio en pocas palabras
- **Descripción**: Explica qué cambió y por qué
- **Capturas de pantalla**: Si hay cambios visuales, incluye imágenes
- **Pruebas realizadas**: Describe cómo verificaste que funciona

### Checklist del PR

```markdown
- [ ] El código pasa ESLint sin errores
- [ ] Se probó manualmente en modo desarrollo
- [ ] Los cambios están documentados (si aplica)
- [ ] No se rompió funcionalidad existente
- [ ] El commit sigue la convención de Conventional Commits
```

---

## 🐛 Cómo Reportar Bugs

Usa el [sistema de Issues de GitHub](https://github.com/Ncturn/contapp/issues) y sigue esta plantilla:

```markdown
**Descripción del bug**
Una descripción clara y concisa del problema.

**Pasos para reproducir**
1. Ve a '...'
2. Haz clic en '...'
3. Introduce '...'
4. Observa el error

**Comportamiento esperado**
Lo que debería ocurrir.

**Comportamiento actual**
Lo que realmente ocurre.

**Capturas de pantalla**
Si aplica, agrega capturas de pantalla.

**Entorno**
- OS: [ej: Windows 10]
- Node.js: [ej: 14.17.0]
- MongoDB: [ej: 4.4.0]
- Versión de ContApp: [ej: 1.0.0]

**Información adicional**
Cualquier contexto relevante sobre el problema.
```

---

## 💡 Cómo Proponer Nuevas Características

1. **Verifica** que la característica no está ya en desarrollo revisando los [Issues](https://github.com/Ncturn/contapp/issues) y [Pull Requests](https://github.com/Ncturn/contapp/pulls) abiertos

2. **Abre un Issue** con la etiqueta `enhancement` usando esta plantilla:

```markdown
**¿Tu propuesta está relacionada con algún problema?**
Una descripción clara del problema. Ej: "Me resulta frustrante cuando..."

**Describe la solución que propones**
Una descripción clara de lo que quieres que suceda.

**Describe las alternativas que has considerado**
Una descripción de alternativas o características que has considerado.

**Contexto adicional**
Agrega cualquier contexto o captura de pantalla sobre la propuesta.
```

3. **Espera retroalimentación** antes de comenzar a implementar

4. Una vez aprobado, sigue el [Proceso de Pull Requests](#-proceso-de-pull-requests)

---

¡Gracias por contribuir a ContApp! 🎉
