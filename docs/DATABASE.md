# 🗄️ Documentación de la Base de Datos — ContApp

## Tabla de Contenidos

- [Información General](#-información-general)
- [Modelo Account](#-modelo-account)
  - [Schema](#schema-account)
  - [Validaciones](#validaciones-de-account)
  - [Ejemplo de Documento](#ejemplo-de-documento-account)
- [Modelo Policy](#-modelo-policy)
  - [Schema](#schema-policy)
  - [Subdocumento Movement](#subdocumento-movement)
  - [Validaciones](#validaciones-de-policy)
  - [Ejemplo de Documento](#ejemplo-de-documento-policy)
- [Relaciones entre Colecciones](#-relaciones-entre-colecciones)
- [Índices y Consultas](#-índices-y-consultas)
- [Reglas de Negocio](#-reglas-de-negocio)

---

## ℹ️ Información General

| Campo | Valor |
|-------|-------|
| Base de datos | MongoDB |
| Nombre de la DB | `contapp` |
| URL de conexión | `mongodb://localhost:27017/contapp` |
| ODM | Mongoose 5.x |
| Colecciones | `accounts`, `policies` |

### Conexión

El archivo `server/mongoDB.js` gestiona la conexión:

```javascript
const db = require('mongoose');

async function connect(url) {
  await db.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log('db connected');
}
```

---

## 📒 Modelo Account

**Archivo:** `server/components/Account/model.js`
**Colección en MongoDB:** `accounts`

### Schema Account

```javascript
const accountSchema = new Schema({
  identifier: String,    // Identificador único de la cuenta
  description: String,   // Nombre o descripción de la cuenta
  level: Number,         // Nivel jerárquico (1-5)
  type: String,          // Tipo: 'resumen' | 'detalle'
  keycontrol: String,    // Identificador de la cuenta padre
  accounttype: String,   // Tipo contable (activo, pasivo, etc.)
  balance: String,       // Tipo de saldo: 'deudor' | 'acreedor'
});
```

### Campos de Account

| Campo | Tipo | Descripción | Valores permitidos |
|-------|------|-------------|-------------------|
| `_id` | ObjectId | ID generado automáticamente por MongoDB | Auto |
| `identifier` | String | Código único de la cuenta (máx. 8 dígitos) | Numérico, no empieza con 0 |
| `description` | String | Nombre descriptivo de la cuenta | Cualquier texto |
| `level` | Number | Nivel jerárquico en el catálogo | `1`, `2`, `3`, `4`, `5` |
| `type` | String | Clasificación de la cuenta | `"resumen"`, `"detalle"` |
| `keycontrol` | String | Identificador de la cuenta padre (llave de control) | Debe existir en `accounts` |
| `accounttype` | String | Tipo contable según el primer dígito | Ver tabla de tipos |
| `balance` | String | Naturaleza del saldo | `"deudor"`, `"acreedor"` |
| `__v` | Number | Versión del documento (interno de Mongoose) | Auto |

### Tipos de cuenta por primer dígito (`accounttype`)

| Primer dígito | `accounttype` |
|--------------|---------------|
| `1` | activo |
| `2` | pasivo |
| `3` | capital contable |
| `4` | ingresos |
| `5` | costos |
| `6` | gastos generales |
| `7` | financiamiento |
| `8` | cuenta deudora |
| `9` | cuenta acreedora |

### Validaciones de Account

Las validaciones se aplican en el controlador (`controller.js`) usando `node-input-validator`:

**Al crear (POST):**

| Campo | Reglas de validación |
|-------|---------------------|
| `identifier` | requerido, string, mínimo 1 dígito, máximo 9 (valida que no existe) |
| `description` | requerido, string |
| `level` | requerido, entero, entre 1 y 5 |
| `type` | requerido, string, solo acepta: `resumen`, `detalle` |
| `keycontrol` | requerido, string, mínimo 1 dígito, máximo 9 (valida que no existe) |
| `balance` | requerido, string, solo acepta: `deudor`, `acreedor` |
| `accounttype` | requerido, string |

**Al editar (PATCH):** Mismas validaciones, pero el `identifier` valida que **sí exista**.

**Reglas de negocio en `store.js`:**
- El `identifier` debe ser único (no puede existir ya en la colección)
- El `keycontrol` debe apuntar a una cuenta existente, excepto cuando `identifier === keycontrol` (cuenta raíz)
- No se puede eliminar una cuenta si es `keycontrol` de otra cuenta

### Ejemplo de Documento Account

```json
{
  "_id": "60a1234567890abcdef12345",
  "identifier": "10000001",
  "description": "Caja",
  "level": 1,
  "type": "resumen",
  "keycontrol": "10000001",
  "accounttype": "activo",
  "balance": "deudor",
  "__v": 0
}
```

### Ejemplo: Catálogo de cuentas básico

```json
[
  {
    "identifier": "10000000",
    "description": "Activo",
    "level": 1,
    "type": "resumen",
    "keycontrol": "10000000",
    "accounttype": "activo",
    "balance": "deudor"
  },
  {
    "identifier": "10100000",
    "description": "Activo Circulante",
    "level": 2,
    "type": "resumen",
    "keycontrol": "10000000",
    "accounttype": "activo",
    "balance": "deudor"
  },
  {
    "identifier": "10100001",
    "description": "Caja",
    "level": 3,
    "type": "detalle",
    "keycontrol": "10100000",
    "accounttype": "activo",
    "balance": "deudor"
  }
]
```

---

## 📄 Modelo Policy

**Archivo:** `server/components/Policy/model.js`
**Colección en MongoDB:** `policies`

### Schema Policy

```javascript
const policySchema = new Schema({
  date: Date,             // Fecha de la póliza
  identifier: String,     // Identificador único (formato: 2 letras + 3 números)
  movements: [{           // Array de movimientos contables
    consecutive: Number,  // Número de orden del movimiento
    account: {
      type: Schema.ObjectId,
      ref: 'account',     // Referencia a la colección accounts
    },
    concept: String,      // Descripción del movimiento
    amount: String,       // Monto (como string para preservar decimales)
    type: {
      type: String,       // 'cargo' | 'abono'
    },
  }],
});
```

### Campos de Policy

| Campo | Tipo | Descripción | Valores permitidos |
|-------|------|-------------|-------------------|
| `_id` | ObjectId | ID generado automáticamente | Auto |
| `date` | Date | Fecha de la póliza | Fecha válida |
| `identifier` | String | Código único (2 letras + 3 números) | Ej: `AB001`, `PG123` |
| `movements` | Array | Lista de movimientos contables | Ver subdocumento |
| `__v` | Number | Versión del documento (Mongoose) | Auto |

### Subdocumento Movement

Cada elemento del array `movements` tiene la siguiente estructura:

| Campo | Tipo | Descripción | Valores permitidos |
|-------|------|-------------|-------------------|
| `_id` | ObjectId | ID del subdocumento | Auto |
| `consecutive` | Number | Número de orden (1, 2, 3...) | Entero positivo |
| `account` | ObjectId (ref: account) | Referencia a la cuenta contable | ID válido de `accounts` |
| `concept` | String | Descripción del movimiento | Cualquier texto |
| `amount` | String | Monto del movimiento | Número decimal, ej: `"1500.00"` |
| `type` | String | Tipo de movimiento | `"cargo"`, `"abono"` |

### Validaciones de Policy

**Al crear y editar:**

| Campo | Reglas de validación |
|-------|---------------------|
| `date` | requerido, debe ser fecha válida |
| `identifier` | requerido, string, exactamente 5 caracteres, formato: 2 letras + 3 números |
| `movements` | requerido, array |
| `movements.*.consecutive` | requerido, entero |
| `movements.*.account` | requerido, ObjectId de MongoDB válido |
| `movements.*.concept` | requerido, string |
| `movements.*.amount` | requerido, número decimal |
| `movements.*.type` | requerido, string, solo acepta: `cargo`, `abono` |

**Reglas de negocio en `store.js`:**
- El `identifier` debe ser único al crear
- Regla de balance (aplicada en el **frontend**): la suma de abonos debe ser igual a la suma de cargos

### Ejemplo de Documento Policy

```json
{
  "_id": "60b9876543210fedcba98765",
  "date": "2021-06-15T00:00:00.000Z",
  "identifier": "AB001",
  "movements": [
    {
      "_id": "60b9876543210fedcba98766",
      "consecutive": 1,
      "account": "60a1234567890abcdef12345",
      "concept": "Pago de servicios",
      "amount": "2500.00",
      "type": "cargo"
    },
    {
      "_id": "60b9876543210fedcba98767",
      "consecutive": 2,
      "account": "60a9876543210fedcba98765",
      "concept": "Salida de caja",
      "amount": "2500.00",
      "type": "abono"
    }
  ],
  "__v": 0
}
```

### Ejemplo de Policy con Populate (respuesta del GET)

Cuando se consultan las pólizas, Mongoose resuelve la referencia `account` automáticamente con `.populate('movements.account')`:

```json
{
  "_id": "60b9876543210fedcba98765",
  "date": "2021-06-15T00:00:00.000Z",
  "identifier": "AB001",
  "movements": [
    {
      "_id": "60b9876543210fedcba98766",
      "consecutive": 1,
      "account": {
        "_id": "60a1234567890abcdef12345",
        "identifier": "10100001",
        "description": "Caja",
        "level": 3,
        "type": "detalle",
        "keycontrol": "10100000",
        "accounttype": "activo",
        "balance": "deudor"
      },
      "concept": "Pago de servicios",
      "amount": "2500.00",
      "type": "cargo"
    }
  ]
}
```

---

## 🔗 Relaciones entre Colecciones

```
accounts                          policies
─────────────────                 ─────────────────────────────────
_id: ObjectId ◄───────────────── movements[].account: ObjectId (ref)
identifier: String                _id: ObjectId
description: String               identifier: String
level: Number                     date: Date
type: String                      movements: [
keycontrol: String                  { consecutive, account, concept,
accounttype: String                   amount, type }
balance: String                   ]
```

**Tipo de relación:** Uno a Muchos (una cuenta puede estar en múltiples movimientos de múltiples pólizas)

**Cardinalidad:**
- Una `account` puede aparecer en 0 o más `movements` de diferentes `policies`
- Una `policy` tiene 1 o más `movements`, cada uno referenciando exactamente una `account`
- La relación se resuelve con `.populate('movements.account')` al consultar pólizas

**Integridad referencial:**
- Mongoose no aplica integridad referencial automáticamente
- La validación se hace a nivel de aplicación:
  - Al crear una cuenta: se verifica que el `keycontrol` exista
  - Al eliminar una cuenta: se verifica que no sea `keycontrol` de otra cuenta

---

## 📊 Índices y Consultas

### Consultas principales

**Obtener todas las cuentas ordenadas:**
```javascript
Model.find({}).sort({ identifier: 'asc' })
```

**Obtener cuenta por identificador:**
```javascript
Model.find({ identifier: '10000001' })
```

**Verificar si existe una cuenta:**
```javascript
Model.findOne({ identifier: identifier })
```

**Verificar si una cuenta es llave de control:**
```javascript
Model.findOne({ keycontrol: identifier })
```

**Obtener pólizas con datos de cuenta:**
```javascript
Model.find({}).populate('movements.account')
```

**Obtener póliza por identificador:**
```javascript
Model.find({ identifier: 'AB001' }).populate('movements.account')
```

### Índices recomendados

Para mejorar el rendimiento, se recomienda agregar los siguientes índices (no están configurados actualmente en el schema):

```javascript
// En accountSchema
accountSchema.index({ identifier: 1 }, { unique: true });
accountSchema.index({ keycontrol: 1 });

// En policySchema
policySchema.index({ identifier: 1 }, { unique: true });
policySchema.index({ date: 1 });
```

> 💡 **Nota**: Los índices únicos en `identifier` también reforzarían la integridad referencial a nivel de base de datos, complementando las validaciones de la aplicación.

---

## 📜 Reglas de Negocio

### Reglas de Account

1. **Identificador único**: No pueden existir dos cuentas con el mismo `identifier`
2. **Cuenta raíz**: Una cuenta es "raíz" cuando su `identifier === keycontrol` (se referencia a sí misma)
3. **Llave de control válida**: El `keycontrol` debe ser el `identifier` de una cuenta existente
4. **No eliminar si es padre**: No se puede borrar una cuenta si alguna otra cuenta la tiene como `keycontrol`

### Reglas de Policy

1. **Identificador único**: No pueden existir dos pólizas con el mismo `identifier`
2. **Formato de identificador**: Exactamente 5 caracteres, con el formato: 2 letras seguidas de 3 números (ej: `AB001`, `PG125`)
3. **Balance cuadrado**: La suma total de cargos debe ser igual a la suma total de abonos (esta regla se aplica en el frontend, no en el backend)
4. **Cuenta válida**: Cada movimiento debe referenciar una cuenta que exista en la colección `accounts`
