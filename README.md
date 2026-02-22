# 🚀 Challenge - Posiciones Disponibles

Aplicación web desarrollada con React + TypeScript que permite a los usuarios visualizar posiciones disponibles y postularse ingresando la URL de su repositorio.

---

## 📦 Instalación

Instalar dependencias:

```bash
npm install
```

---

## ⚙️ Variables de entorno

La aplicación requiere una variable de entorno para definir la URL base de la API.

Crear un archivo `.env` en la raíz del proyecto con el siguiente contenido:

```env
VITE_BASE_URL
```

⚠️ **Importante:**  
La aplicación no funcionará si esta variable no está definida correctamente.

---

## ▶️ Ejecutar el proyecto

```bash
npm run dev
```

Luego abrir en el navegador:

```
http://localhost:5173
```

---

## 🧠 Flujo de la aplicación

1. El usuario ingresa su email.
2. Se consultan sus datos mediante la API.
3. Se obtiene el listado de posiciones disponibles.
4. El usuario puede ingresar la URL de su repositorio para una posición.
5. Al enviar la postulación:
   - Si ocurre un error → se muestra en pantalla.
   - Si es exitosa → se muestra confirmación.

---

## 📌 Notas técnicas

- La URL base de la API se obtiene desde el archivo `.env`.
- La prevención de aplicaciones duplicadas es responsabilidad del backend.
- La aplicación está completamente tipada con TypeScript.

---

## 👤 Autor

**Rodrigo Mayer**