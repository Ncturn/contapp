# 📡 Documentación de la API REST — ContApp

## Tabla de Contenidos

- [Información General](#-información-general)
- [Endpoints de Accounts](#-endpoints-de-accounts)
  - [GET /account](#get-account)
  - [POST /account](#post-account)
  - [PATCH /account](#patch-account)
  - [DELETE /account](#delete-account)
- [Endpoints de Policies](#-endpoints-de-policies)
  - [GET /policy](#get-policy)
  - [POST /policy](#post-policy)
  - [PATCH /policy](#patch-policy)
  - [DELETE /policy](#delete-policy)
- [Códigos de Respuesta HTTP](#-códigos-de-respuesta-http)
- [Formato de Errores](#-formato-de-errores)

---

## ℹ️ Información General

| Campo | Valor |
|-------|-------|
| URL Base | `http://localhost:3000` |
| Formato | JSON |
| Content-Type | `application/json` |

### Formato de respuesta

Todas las respuestas siguen la misma estructura:

```json
{
  "error": null,
  "body": { }
}
```

- **`error`**: `null` si la operación fue exitosa, o un string con el mensaje de error
- **`body`**: Los datos de respuesta, o `null` si hubo un error

---

## 📒 Endpoints de Accounts

### GET /account

Obtiene la lista de cuentas contables. Opcionalmente filtra por identificador.

**URL:** `GET http://localhost:3000/account/`

**Parámetros de Query:**

| Parámetro | Tipo | Requerido | Descripción |
|-----------|------|-----------|-------------|
| `identifier` | string | No | Identificador de la cuenta para filtrar |

**Respuesta exitosa (200):**

```json
{
  "error": null,
  "body": [
    {
      "_id": "60a1234567890abcdef12345",
      "identifier": "10000001",
      "description": "Caja",
      "level": 1,
      "type": "resumen",
      "keycontrol": "10000001",
      "accounttype": "activo",
      "balance": "deudor"
    }
  ]
}
```

**Ejemplo con curl:**

```bash
# Obtener todas las cuentas
curl http://localhost:3000/account/

# Filtrar por identificador
curl "http://localhost:3000/account/?identifier=10000001"
```

**Ejemplo con fetch:**

```javascript
// Obtener todas las cuentas
const response = await fetch('http://localhost:3000/account/');
const { error, body } = await response.json();

// Filtrar por identificador
const response = await fetch('http://localhost:3000/account/?identifier=10000001');
const { error, body } = await response.json();
```

---

### POST /account

Crea una nueva cuenta contable.

**URL:** `POST http://localhost:3000/account/`

**Body (JSON):**

| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| `identifier` | string | ✅ | Identificador único (máx. 8 dígitos, no puede empezar con 0) |
| `description` | string | ✅ | Nombre/descripción de la cuenta |
| `level` | number | ✅ | Nivel jerárquico (1-5) |
| `type` | string | ✅ | Tipo de cuenta: `"resumen"` o `"detalle"` |
| `keycontrol` | string | ✅ | Llave de control (identificador de cuenta padre) |
| `balance` | string | ✅ | Tipo de saldo: `"deudor"` o `"acreedor"` |
| `accounttype` | string | ✅ | Tipo de cuenta contable (asignado automáticamente por el frontend) |

**Ejemplo de body:**

```json
{
  "identifier": "10000001",
  "description": "Caja",
  "level": 1,
  "type": "resumen",
  "keycontrol": "10000001",
  "balance": "deudor",
  "accounttype": "activo"
}
```

**Respuesta exitosa (201):**

```json
{
  "error": null,
  "body": {
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
}
```

**Ejemplo con curl:**

```bash
curl -X POST http://localhost:3000/account/ \
  -H "Content-Type: application/json" \
  -d '{
    "identifier": "10000001",
    "description": "Caja",
    "level": 1,
    "type": "resumen",
    "keycontrol": "10000001",
    "balance": "deudor",
    "accounttype": "activo"
  }'
```

**Validaciones del servidor:**
- `identifier`: requerido, string, mínimo 1 dígito, máximo 8 dígitos, debe ser único (no puede existir ya en la BD)
- `level`: requerido, entero, entre 1 y 5
- `type`: requerido, solo acepta `"resumen"` o `"detalle"`
- `keycontrol`: requerido, debe ser un identificador existente (o el mismo `identifier` si es la primera cuenta)
- `balance`: requerido, solo acepta `"deudor"` o `"acreedor"`

---

### PATCH /account

Edita una cuenta contable existente.

**URL:** `PATCH http://localhost:3000/account/`

**Body (JSON):** Los mismos campos que en POST. El `identifier` identifica la cuenta a editar.

**Ejemplo de body:**

```json
{
  "identifier": "10000001",
  "description": "Caja General",
  "level": 1,
  "type": "resumen",
  "keycontrol": "10000001",
  "balance": "deudor",
  "accounttype": "activo"
}
```

**Respuesta exitosa (200):**

```json
{
  "error": null,
  "body": {
    "_id": "60a1234567890abcdef12345",
    "identifier": "10000001",
    "description": "Caja General",
    "level": 1,
    "type": "resumen",
    "keycontrol": "10000001",
    "accounttype": "activo",
    "balance": "deudor",
    "__v": 0
  }
}
```

**Ejemplo con curl:**

```bash
curl -X PATCH http://localhost:3000/account/ \
  -H "Content-Type: application/json" \
  -d '{
    "identifier": "10000001",
    "description": "Caja General",
    "level": 1,
    "type": "resumen",
    "keycontrol": "10000001",
    "balance": "deudor",
    "accounttype": "activo"
  }'
```

---

### DELETE /account

Elimina una cuenta contable por su identificador.

**URL:** `DELETE http://localhost:3000/account/`

**Body (JSON):**

| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| `identifier` | string | ✅ | Identificador de la cuenta a eliminar |

**Ejemplo de body:**

```json
{
  "identifier": "10000001"
}
```

**Respuesta exitosa (200):**

```json
{
  "error": null,
  "body": "Cuenta borrada exitosamente"
}
```

**Ejemplo con curl:**

```bash
curl -X DELETE http://localhost:3000/account/ \
  -H "Content-Type: application/json" \
  -d '{ "identifier": "10000001" }'
```

> ⚠️ **Nota**: No se puede eliminar una cuenta que sea llave de control de otra cuenta.

---

## 📄 Endpoints de Policies

### GET /policy

Obtiene la lista de pólizas. Los movimientos incluyen los datos completos de la cuenta referenciada.

**URL:** `GET http://localhost:3000/policy/`

**Parámetros de Query:**

| Parámetro | Tipo | Requerido | Descripción |
|-----------|------|-----------|-------------|
| `identifier` | string | No | Identificador de la póliza para filtrar |

**Respuesta exitosa (200):**

```json
{
  "error": null,
  "body": [
    {
      "_id": "60b9876543210fedcba98765",
      "date": "2021-06-15T00:00:00.000Z",
      "identifier": "AB001",
      "movements": [
        {
          "consecutive": 1,
          "account": {
            "_id": "60a1234567890abcdef12345",
            "identifier": "10000001",
            "description": "Caja",
            "level": 1,
            "type": "resumen",
            "keycontrol": "10000001",
            "accounttype": "activo",
            "balance": "deudor"
          },
          "concept": "Pago en efectivo",
          "amount": "1500.00",
          "type": "cargo"
        }
      ],
      "__v": 0
    }
  ]
}
```

**Ejemplo con curl:**

```bash
# Obtener todas las pólizas
curl http://localhost:3000/policy/

# Filtrar por identificador
curl "http://localhost:3000/policy/?identifier=AB001"
```

---

### POST /policy

Crea una nueva póliza contable.

**URL:** `POST http://localhost:3000/policy/`

**Body (JSON):**

| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| `identifier` | string | ✅ | Identificador único (formato: 2 letras + 3 números, ej: `AB001`) |
| `date` | string/Date | ✅ | Fecha de la póliza (formato ISO o `YYYY-MM-DD`) |
| `movements` | array | ✅ | Lista de movimientos contables |

**Estructura de cada movimiento:**

| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| `consecutive` | number | ✅ | Número de orden del movimiento |
| `account` | ObjectId | ✅ | ID de MongoDB de la cuenta (`_id`) |
| `concept` | string | ✅ | Descripción del movimiento |
| `amount` | string | ✅ | Monto con hasta 2 decimales (ej: `"1500.00"`) |
| `type` | string | ✅ | Tipo de movimiento: `"cargo"` o `"abono"` |

**Ejemplo de body:**

```json
{
  "identifier": "AB001",
  "date": "2021-06-15",
  "movements": [
    {
      "consecutive": 1,
      "account": "60a1234567890abcdef12345",
      "concept": "Pago en efectivo",
      "amount": "1500.00",
      "type": "cargo"
    },
    {
      "consecutive": 2,
      "account": "60a9876543210fedcba98765",
      "concept": "Ingreso por ventas",
      "amount": "1500.00",
      "type": "abono"
    }
  ]
}
```

**Respuesta exitosa (201):**

```json
{
  "error": null,
  "body": {
    "_id": "60b9876543210fedcba98765",
    "date": "2021-06-15T00:00:00.000Z",
    "identifier": "AB001",
    "movements": [ ... ],
    "__v": 0
  }
}
```

**Ejemplo con curl:**

```bash
curl -X POST http://localhost:3000/policy/ \
  -H "Content-Type: application/json" \
  -d '{
    "identifier": "AB001",
    "date": "2021-06-15",
    "movements": [
      {
        "consecutive": 1,
        "account": "60a1234567890abcdef12345",
        "concept": "Pago en efectivo",
        "amount": "1500.00",
        "type": "cargo"
      }
    ]
  }'
```

**Validaciones del servidor:**
- `identifier`: requerido, exactamente 5 caracteres, formato 2 letras + 3 números, debe ser único
- `date`: requerido, fecha válida
- `movements`: requerido, array
- `movements.*.account`: requerido, ID válido de MongoDB
- `movements.*.amount`: requerido, número decimal
- `movements.*.type`: requerido, solo acepta `"cargo"` o `"abono"`

---

### PATCH /policy

Edita una póliza existente.

**URL:** `PATCH http://localhost:3000/policy/`

**Body (JSON):** Los mismos campos que en POST. El `identifier` identifica la póliza a editar.

**Respuesta exitosa (200):**

```json
{
  "error": null,
  "body": { /* póliza actualizada */ }
}
```

---

### DELETE /policy

Elimina una póliza por su identificador.

**URL:** `DELETE http://localhost:3000/policy/`

**Body (JSON):**

| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| `identifier` | string | ✅ | Identificador de la póliza a eliminar |

**Ejemplo de body:**

```json
{
  "identifier": "AB001"
}
```

**Respuesta exitosa (200):**

```json
{
  "error": null,
  "body": "Póliza borrada exitosamente"
}
```

**Ejemplo con curl:**

```bash
curl -X DELETE http://localhost:3000/policy/ \
  -H "Content-Type: application/json" \
  -d '{ "identifier": "AB001" }'
```

---

## 📊 Códigos de Respuesta HTTP

| Código | Significado | Casos de uso |
|--------|-------------|--------------|
| `200 OK` | Operación exitosa | GET, PATCH, DELETE exitosos |
| `201 Created` | Recurso creado | POST exitoso |
| `404 Not Found` | Recurso no encontrado | Cuenta o póliza no existe |
| `409 Conflict` | Conflicto de datos | Identificador duplicado, cuenta con dependencias |
| `400 Bad Request` | Datos inválidos | Validaciones fallidas |

---

## ⚠️ Formato de Errores

Cuando ocurre un error, la respuesta tiene la siguiente estructura:

```json
{
  "error": "Descripción del error",
  "body": null
}
```

### Ejemplos de errores comunes

**Cuenta no encontrada (404):**
```json
{
  "error": "Cuenta no encontrada, verifique el identificador",
  "body": null
}
```

**Identificador duplicado (409):**
```json
{
  "error": "El identificador de la cuenta ya existe",
  "body": null
}
```

**Llave de control inválida (404):**
```json
{
  "error": "No se encontró la llave de control ingresada",
  "body": null
}
```

**Cuenta con dependencias (409):**
```json
{
  "error": "Esta cuenta no puede ser borrada mientras sea llave de control de otra cuenta",
  "body": null
}
```

**Póliza no encontrada (404):**
```json
{
  "error": "Póliza no encontrada, verifique el identificador",
  "body": null
}
```

**Error de validación (400):**
```json
{
  "error": { /* objeto con errores por campo */ },
  "body": null
}
```
