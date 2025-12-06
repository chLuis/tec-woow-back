# Backend Project API

Este repositorio contiene el código fuente para el backend de la aplicación, construido con **Node.js**, **Express**, y **Prisma ORM**, utilizando una base de datos **MySQL**.

## 🛠️ Tecnologías

* [Node.js](https://nodejs.org/) - Entorno de ejecución
* [Express](https://expressjs.com/) - Framework web
* [Prisma](https://www.prisma.io/) - ORM
* [MySQL](https://www.mysql.com/) - Base de datos

## 📋 Prerrequisitos

Antes de comenzar, asegúrate de tener instalado:
* Node.js (v16 o superior)
* MySQL Server corriendo localmente o en un servidor remoto.

## 🚀 Instalación y Configuración

Sigue estos pasos para levantar el proyecto en tu entorno local:

### 1. Clonar el repositorio e instalar dependencias

```bash
git clone https://github.com/chLuis/tec-woow-back.git
cd tec-woow-back
npm install
```
### 2. Configurar la base de datos
Crea una base de datos MySQL y actualiza el archivo `.env` con tus credenciales de conexión, utilizando como ejemplo el archivo .env.example

### 3. Ejecuta la query en algun motor de base de datos como MySQL Workbench

Usa el archivo query.sql para la creacion de la base de datos y algunos datos necesarios.

### 4. Ejecutar Prisma

```bash
npx prisma db pull
npx prisma generate
```

### 5. Iniciar el servidor

```bash
npm run dev
```
El servidor debería estar corriendo en `http://localhost:8080` o el puerto que hayas escogido.

### 6. Rutas
Las rutas principales de la API son:
/api/products
/api/suppliers
/api/auth