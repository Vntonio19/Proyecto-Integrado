# Instrucciones de Instalación y Ejecución  
**Sistema de Gestión de Reservas – José Lefimilla**  
**Proyecto Integrado INACAP 2025**

---

##  Requisitos previos

Antes de comenzar tener instalado:

| Requisito | Versión recomendada |
|------------|---------------------|
| **Python** | 3.11 o superior |
| **Node.js** | 18 o superior |
| **npm** | 9 o superior |
| **MySQL Server** | 8.0 o superior |
| **MySQL Workbench** | 8.0 o superior |

---

## Instalación del Backend (Django + MySQL)

>  Ejecutar dentro de la carpeta:  
> `Sistema de Reservas/backend/`

---

### Crear entorno virtual
```bash
python -m venv venv

Activar entorno virtual
venv\Scripts\activate

Instalar dependencias necesarias
pip install django djangorestframework django-cors-headers python-dotenv mysqlclient django-admin-interface django-colorfield

Crear base de datos en MySQL Workbench
CREATE DATABASE reservas_inacap CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

Ejecutar migraciones
python manage.py makemigrations
python manage.py migrate

Crear superusuario
python manage.py createsuperuser

Iniciar servidor
python manage.py runserver

Abrir en el navegador:
http://127.0.0.1:8000/admin/

Instalación del Frontend (React)

Ejecutar dentro de la carpeta:
Sistema de Reservas/frontend/

Instalar dependencias base
npm install

Instalar librerías adicionales necesarias
npm install axios sweetalert2


Ejecutar React
npm start


Abrir en el navegador:
http://localhost:3000/

Conexión Backend ↔ Frontend

El backend (Django) corre en: http://127.0.0.1:8000/

El frontend (React) corre en: http://localhost:3000/

Ambos deben estar corriendo al mismo tiempo en consolas separadas.

Autor
José Lefimilla