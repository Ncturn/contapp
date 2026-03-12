# 🧩 Documentación de Componentes React — ContApp

## Tabla de Contenidos

- [Estructura General](#-estructura-general)
- [Componentes de Layout](#-componentes-de-layout)
  - [Layout](#layout)
  - [Navbar](#navbar)
- [Componentes de Visualización](#-componentes-de-visualización)
  - [Account](#account)
  - [Policy](#policy)
  - [Table](#table)
  - [TableRow](#tablerow)
- [Componentes de Formularios](#-componentes-de-formularios)
  - [AccountForm](#accountform)
  - [PolicyForm](#policyform)
  - [PolicyFormRow](#policyformrow)
- [Vistas (Views)](#-vistas-views)
  - [createAccount / CreateAccount](#createaccount)
  - [editAccount / EditAccount](#editaccount)
  - [CreatePolicy](#createpolicy)
  - [EditPolicy](#editpolicy)
- [Custom Hooks](#-custom-hooks)
  - [useAccount](#useaccount)
- [Contenedores](#-contenedores)
  - [App](#app)

---

## 🗂️ Estructura General

```
src/
├── containers/
│   └── App.jsx              # Router raíz de la aplicación
├── components/              # Componentes reutilizables
│   ├── Layout.jsx
│   ├── Navbar.jsx
│   ├── Account.jsx
│   ├── AccountForm.jsx
│   ├── Policy.jsx
│   ├── PolicyForm.jsx
│   ├── PolicyFormRow.jsx
│   ├── Table.jsx
│   └── TableRow.jsx
├── views/                   # Páginas/vistas de la aplicación
│   ├── createAccount.jsx
│   ├── editAccount.jsx
│   ├── CreatePolicy.jsx
│   └── EditPolicy.jsx
└── hooks/
    └── useAccount.jsx       # Custom hook
```

---

## 📐 Componentes de Layout

### Layout

Componente de estructura base. Envuelve todas las páginas de la aplicación.

**Archivo:** `src/components/Layout.jsx`

**Props:**

| Prop | Tipo | Requerido | Descripción |
|------|------|-----------|-------------|
| `children` | ReactNode | ✅ | Contenido que se renderiza debajo del Navbar |

**Comportamiento:**
- Al montarse, aplica los estilos globales del body (color de fondo `#2F3E46`, color de texto `#CAD2C5`, `font-size: 16px`)
- Renderiza `<Navbar />` seguido del contenido `children`

**Uso:**

```jsx
import Layout from './components/Layout';

// Usado en App.jsx para envolver todas las rutas
<Layout>
  <Switch>
    <Route exact path='/' component={Account} />
    {/* ...otras rutas */}
  </Switch>
</Layout>
```

---

### Navbar

Barra de navegación principal de la aplicación.

**Archivo:** `src/components/Navbar.jsx`

**Props:** Ninguna

**Descripción:**
Muestra el nombre de la aplicación "Contapp" y los links de navegación: Home, Cuentas, Pólizas. Usa `react-router-dom` con la propiedad `replace` para navegar sin agregar al historial.

**Uso:**

```jsx
import Navbar from './components/Navbar';

<Navbar />
```

**Links disponibles:**

| Link | Ruta |
|------|------|
| Home | `/` |
| Cuentas | `/account` |
| Pólizas | `/policy` |

---

## 📋 Componentes de Visualización

### Account

Componente principal de la sección de cuentas contables. Obtiene las cuentas del API y las muestra en una tabla con opciones CRUD.

**Archivo:** `src/components/Account.jsx`

**Props:**

| Prop | Tipo | Requerido | Descripción |
|------|------|-----------|-------------|
| `history` | object | ✅ | Objeto history de React Router para navegación |

**Estado interno:**
- `accounts`: `{ error: null, body: [] }` — Datos de las cuentas obtenidos del API

**Comportamiento:**
- Al montarse (`useEffect`), hace `GET /account/` y guarda los resultados en el estado
- Al hacer clic en el botón de basura (🗑️): muestra confirmación y ejecuta `DELETE /account/`
- Al hacer clic en el botón de lápiz (✏️): navega a `/account/edit/:identifier`
- Al hacer clic en el botón de agregar (+): navega a `/account/create`

**Columnas de la tabla:**

| Columna | Descripción |
|---------|-------------|
| IDENTIFICADOR | Código único de la cuenta |
| NOMBRE DE LA CUENTA | Descripción de la cuenta |
| NIVEL | Nivel jerárquico (1-5) |
| TIPO | resumen o detalle |
| LLAVE DE CONTROL | Identificador de la cuenta padre |
| BALANCE | deudor o acreedor |
| TIPO DE CUENTA | activo, pasivo, etc. |

**Uso:**

```jsx
import Account from './components/Account';

// Usado en App.jsx como componente de ruta
<Route exact path='/account' component={Account} />
```

---

### Policy

Componente principal de la sección de pólizas. Obtiene las pólizas del API y las muestra en una tabla.

**Archivo:** `src/components/Policy.jsx`

**Props:**

| Prop | Tipo | Requerido | Descripción |
|------|------|-----------|-------------|
| `history` | object | ✅ | Objeto history de React Router para navegación |

**Estado interno:**
- `policies`: `{ error: null, body: [] }` — Datos de las pólizas obtenidos del API

**Comportamiento:**
- Al montarse, hace `GET /policy/` y guarda los resultados
- Las fechas se formatean eliminando la parte de la hora (solo `YYYY-MM-DD`)
- Al hacer clic en el botón de basura: muestra confirmación y ejecuta `DELETE /policy/`
- Al hacer clic en el botón de lápiz: navega a `/policy/edit/:identifier`
- Al hacer clic en el botón (+): navega a `/policy/create`

**Columnas de la tabla:**

| Columna | Descripción |
|---------|-------------|
| IDENTIFICADOR | Código único de la póliza (2 letras + 3 números) |
| FECHA | Fecha de la póliza (formato YYYY-MM-DD) |
| # MOVIMIENTOS | Número de movimientos en la póliza |

**Uso:**

```jsx
import Policy from './components/Policy';

<Route exact path='/policy' component={Policy} />
```

---

### Table

Tabla genérica y reutilizable para mostrar listas de datos con acciones CRUD.

**Archivo:** `src/components/Table.jsx`

**Props:**

| Prop | Tipo | Requerido | Descripción |
|------|------|-----------|-------------|
| `title` | string | ✅ | Título que aparece arriba de la tabla |
| `items` | array | ✅ | Array de objetos a mostrar en las filas |
| `fields` | array | ✅ | Array de strings con los nombres de las columnas |
| `handleTrashClick` | function | ✅ | Callback al hacer clic en el botón eliminar |
| `handlePencilClick` | function | ✅ | Callback al hacer clic en el botón editar |
| `handlePlusClick` | function | ✅ | Callback al hacer clic en el botón agregar |

**Uso:**

```jsx
import Table from './components/Table';

<Table
  title="Cuentas"
  items={accounts}
  fields={['identificador', 'nombre de la cuenta', 'nivel']}
  handleTrashClick={(identifier) => deleteAccount(identifier)}
  handlePencilClick={(identifier) => history.push(`/account/edit/${identifier}`)}
  handlePlusClick={() => history.push('/account/create')}
/>
```

---

### TableRow

Fila individual de la tabla con botones de editar y eliminar.

**Archivo:** `src/components/TableRow.jsx`

**Props:**

| Prop | Tipo | Requerido | Descripción |
|------|------|-----------|-------------|
| `itemData` | object | ✅ | Objeto con los datos de la fila. Debe tener un campo `identifier` |
| `handleTrashClick` | function | ✅ | Callback al hacer clic en el botón eliminar |
| `handlePencilClick` | function | ✅ | Callback al hacer clic en el botón editar |

**Comportamiento:**
- Extrae el `identifier` del objeto para usarlo en los callbacks
- Muestra todos los valores del objeto excepto el primero (`_id`) y el último
- Si un valor es un objeto con `identifier`, muestra ese identificador
- Si un valor es un array (ej: `movements`), muestra la longitud del array
- En la última celda, agrega los botones de ✏️ editar y 🗑️ eliminar

---

## 📝 Componentes de Formularios

### AccountForm

Formulario reutilizable para crear y editar cuentas contables.

**Archivo:** `src/components/AccountForm.jsx`

**Props:**

| Prop | Tipo | Requerido | Default | Descripción |
|------|------|-----------|---------|-------------|
| `title` | string | ✅ | — | Título del formulario |
| `httpMethod` | string | ✅ | — | Método HTTP: `'POST'` o `'PATCH'` |
| `formValues` | object | ✅ | — | Valores iniciales del formulario |
| `history` | object | ✅ | — | Objeto history de React Router |
| `successMessage` | string | ✅ | — | Mensaje a mostrar en alert al guardar |
| `readOnly` | boolean | No | `false` | Si `true`, el campo `identifier` es de solo lectura |

**Campos del formulario:**

| Campo | Tipo de input | Validaciones |
|-------|--------------|--------------|
| `identifier` | text | Requerido, máx. 8 dígitos, no puede empezar con 0 |
| `description` | textarea | Requerido |
| `level` | select (1-5) | Requerido, tipo número |
| `type` | select | Requerido, valores: `resumen`, `detalle` |
| `keycontrol` | text | Requerido, máx. 8 dígitos, no puede empezar con 0 |
| `balance` | select | Requerido, valores: `deudor`, `acreedor` |
| `accounttype` | (calculado) | Se asigna automáticamente según el primer dígito del `identifier` |

**Lógica de `accounttype`:**

| Primer dígito | Tipo de cuenta |
|--------------|----------------|
| 1 | activo |
| 2 | pasivo |
| 3 | capital contable |
| 4 | ingresos |
| 5 | costos |
| 6 | gastos generales |
| 7 | financiamiento |
| 8 | cuenta deudora |
| 9 | cuenta acreedora |

**Uso:**

```jsx
import AccountForm from './components/AccountForm';

// Crear cuenta
<AccountForm
  title="Crear cuenta"
  httpMethod="POST"
  formValues={{ identifier: '', description: '', level: 0, type: '', keycontrol: '', balance: '' }}
  history={history}
  successMessage="Cuenta creada exitosamente"
/>

// Editar cuenta
<AccountForm
  title="Editar cuenta"
  httpMethod="PATCH"
  formValues={existingAccount}
  history={history}
  successMessage="Cambios guardados"
  readOnly={true}
/>
```

---

### PolicyForm

Formulario complejo para crear y editar pólizas contables con movimientos dinámicos.

**Archivo:** `src/components/PolicyForm.jsx`

**Props:**

| Prop | Tipo | Requerido | Default | Descripción |
|------|------|-----------|---------|-------------|
| `title` | string | ✅ | — | Título del formulario |
| `httpMethod` | string | ✅ | — | Método HTTP: `'POST'` o `'PATCH'` |
| `formValues` | object | ✅ | — | Valores iniciales del formulario |
| `history` | object | ✅ | — | Objeto history de React Router |
| `successMessage` | string | ✅ | — | Mensaje al guardar exitosamente |
| `readOnly` | boolean | No | `false` | Si `true`, el campo `identifier` es de solo lectura |
| `initialIndex` | array | No | `[0]` | Array de índices de movimientos (para edición) |
| `initialCounter` | number | No | `1` | Contador inicial de movimientos |
| `initialPayments` | object | No | `0` | Valor y nombres de abonos iniciales |
| `initialCharges` | object | No | `0` | Valor y nombres de cargos iniciales |

**Campos principales del formulario:**

| Campo | Tipo de input | Validaciones |
|-------|--------------|--------------|
| `identifier` | text | Requerido, exactamente 5 caracteres, formato: 2 letras + 3 números |
| `date` | date | Requerido |
| `movements[n].*` | Dinámico | Ver `PolicyFormRow` |

**Funcionalidades:**
- **Agregar movimiento** (ícono `+`): Agrega una nueva fila de movimiento al formulario
- **Eliminar movimiento** (ícono `-`): Pide confirmación y elimina la última fila
- **Cálculo de totales**: Suma automáticamente los abonos y cargos en tiempo real
- **Validación de balance**: No permite guardar si el total de abonos ≠ total de cargos
- **Autocompletar cuenta**: Al salir del campo de identificador de cuenta, busca el nombre automáticamente en el API

**Uso:**

```jsx
import PolicyForm from './components/PolicyForm';

// Crear póliza
<PolicyForm
  title="Crear Póliza"
  httpMethod="POST"
  formValues={{ identifier: '', date: '', consecutive: '', account: '', concept: '', amount: '', type: '' }}
  history={history}
  successMessage="Póliza creada exitosamente"
/>
```

---

### PolicyFormRow

Fila dinámica de un movimiento dentro del formulario de póliza.

**Archivo:** `src/components/PolicyFormRow.jsx`

**Props:**

| Prop | Tipo | Requerido | Descripción |
|------|------|-----------|-------------|
| `fieldName` | string | ✅ | Nombre base del campo, ej: `"movements[0]"` |
| `index` | number | ✅ | Índice del movimiento (para el campo consecutivo) |
| `register` | function | ✅ | Función `register` de `react-hook-form` |
| `errors` | object | ✅ | Objeto `errors` de `react-hook-form` |
| `handleKeyDown` | function | ✅ | Maneja la tecla Tab para autocompletar campos |
| `handleBlur` | function | ✅ | Busca la cuenta al perder el foco en el campo de ID |
| `handleAmountsChange` | function | ✅ | Recalcula totales al cambiar el monto |
| `handleTypesChange` | function | ✅ | Recalcula totales al cambiar el tipo (cargo/abono) |

**Campos de cada fila:**

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `movements[n].account` | hidden | ID de MongoDB de la cuenta (se llena automáticamente) |
| `movements[n].consecutive` | number (readOnly) | Número de orden, igual a `index + 1` |
| `movements[n].accountId` | text | Identificador visible de la cuenta para buscar |
| `movements[n].accountName` | text (readOnly) | Nombre de la cuenta (se llena al buscar) |
| `movements[n].concept` | text | Concepto o descripción del movimiento |
| `movements[n].amount` | number | Monto del movimiento (hasta 2 decimales) |
| `movements[n].type` | select | Tipo: `cargo` o `abono` |

---

## 🖥️ Vistas (Views)

### CreateAccount

Vista para crear una nueva cuenta contable.

**Archivo:** `src/views/createAccount.jsx`

**Props:** `history` (React Router)

**Descripción:** Renderiza `AccountForm` con valores iniciales vacíos y método `POST`.

```jsx
const formValues = {
  identifier: '',
  description: '',
  level: 0,
  type: '',
  keycontrol: '',
  balance: '',
};

<AccountForm title='Crear cuenta' httpMethod='POST' formValues={formValues} history={history} successMessage='Cuenta creada exitosamente' />
```

---

### EditAccount

Vista para editar una cuenta contable existente.

**Archivo:** `src/views/editAccount.jsx`

**Props:** `match` (React Router, contiene `params.identifier`), `history`

**Descripción:**
- Al montarse, hace `GET /account/?identifier=:identifier`
- Pre-carga el formulario con los datos existentes
- Renderiza `AccountForm` con `readOnly={true}` (el identificador no puede cambiarse)

---

### CreatePolicy

Vista para crear una nueva póliza contable.

**Archivo:** `src/views/CreatePolicy.jsx`

**Props:** `history` (React Router)

**Descripción:** Renderiza `PolicyForm` con valores iniciales vacíos y método `POST`.

---

### EditPolicy

Vista para editar una póliza existente.

**Archivo:** `src/views/EditPolicy.jsx`

**Props:** `history`, `match` (React Router)

**Descripción:**
- Al montarse, hace `GET /policy/?identifier=:identifier`
- Reformatea los datos: extrae solo la fecha (sin hora), y para cada movimiento extrae `accountId` y `accountName` del objeto `account` populado
- Calcula los índices de movimientos, los totales de cargos y abonos
- Renderiza `PolicyForm` con todos los datos pre-llenados

---

## 🎣 Custom Hooks

### useAccount

Hook para obtener la lista de cuentas contables desde el API.

**Archivo:** `src/hooks/useAccount.jsx`

**Retorna:** `[accounts, setAccounts]`

| Elemento | Tipo | Descripción |
|----------|------|-------------|
| `accounts` | object | `{ error: string|null, body: array }` |
| `setAccounts` | function | Función para actualizar el estado manualmente |

**Uso:**

```jsx
import useAccount from '../hooks/useAccount';

const MyComponent = () => {
  const [accounts, setAccounts] = useAccount();
  // accounts.body es el array de cuentas
  // accounts.error es null si no hubo error
  return (
    <ul>
      {accounts.body.map(acc => <li key={acc.identifier}>{acc.description}</li>)}
    </ul>
  );
};
```

**Estado inicial:** `{ error: 'error', body: [] }`

**Comportamiento:** Hace `GET http://localhost:3000/account/` al montarse el componente y guarda la respuesta.

---

## 📦 Contenedores

### App

Componente raíz de la aplicación. Configura el router y la librería de iconos.

**Archivo:** `src/containers/App.jsx`

**Props:** Ninguna

**Descripción:**
- Inicializa la librería Font Awesome con los iconos usados: `faPencilAlt`, `faTrashAlt`, `faPlusSquare`, `faMinusSquare`
- Usa `HashRouter` (necesario para Electron, que carga archivos locales)
- Envuelve todas las rutas con `Layout`

**Rutas configuradas:**

| Ruta | Componente | Descripción |
|------|-----------|-------------|
| `/` | `Account` | Pantalla inicial |
| `/account` | `Account` | Lista de cuentas |
| `/account/create` | `CreateAccount` | Crear cuenta |
| `/account/edit/:identifier` | `EditAccount` | Editar cuenta |
| `/policy` | `Policy` | Lista de pólizas |
| `/policy/create` | `CreatePolicy` | Crear póliza |
| `/policy/edit/:identifier` | `EditPolicy` | Editar póliza |
