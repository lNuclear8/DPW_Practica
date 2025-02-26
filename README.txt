Proyecto Marbula One - DPW_Practica

Descripción:
Este proyecto simula un sitio web de carreras de canicas, "Marbula One", con funcionalidades como galerías, formularios y un servidor local para servir los archivos estáticos.

Requisitos previos:
1. **Node.js**:
   - Es necesario tener Node.js instalado en el sistema para ejecutar este proyecto. Si no lo tienes, descárgalo desde: https://nodejs.org/
   - Cualquier versión LTS (16 o 18) es adecuada.
2. **Conexión a Internet**:
   - Es necesaria para descargar las dependencias del proyecto la primera vez que se ejecute `setup.bat`.

Estructura del proyecto:
- `css/`              --> Contiene las hojas de estilo del sitio.
- `html/`             --> Contiene las páginas HTML individuales del proyecto.
- `images/`           --> Contiene las imágenes utilizadas en el sitio.
- `js/`               --> Contiene los scripts JavaScript del cliente.
- `node_modules/`     --> Se genera automáticamente tras ejecutar `setup.bat`.
- `server.js`         --> Archivo principal para iniciar el servidor.
- `package.json`      --> Lista las dependencias del proyecto y scripts de npm.
- `README.txt`        --> Documento con las instrucciones de ejecución.

Instrucciones para ejecutar:
1. **Configuración inicial**:
   - Ejecuta en consola el comando `npm install`.
   - Esto instalará las dependencias necesarias para el proyecto. Este paso solo es necesario la primera vez o si se eliminan los archivos de `node_modules`.

2. **Ejecutar el proyecto**:
   - Ejecuta en consola el comando `npm start`.
   - Esto iniciará el servidor local.

3. **Abrir el sitio web**:
   - Una vez iniciado el servidor, abre tu navegador web y accede a la URL:
     - **http://localhost:3000**
   - Desde aquí podrás navegar por el sitio web y explorar sus funcionalidades.

