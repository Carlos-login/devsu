# Demostración de DevOps NodeJs

Esta es una aplicación sencilla para utilizar en las pruebas técnicas de DevOps.

## Empezando

### Prerrequisitos

- Node.js 18.15.0

### Instalación

1. Clonar este repositorio.

```bash
git clone https://bitbucket.org/devsu/demo-devops-nodejs.git


2. Instalar dependencias.

npm i


Base de datos
La base de datos se genera como un archivo en la ruta principal cuando se ejecuta el proyecto por primera vez y su nombre es dev.sqlite.

Considere dar permisos de acceso al archivo para su correcto funcionamiento.

Uso
Para ejecutar pruebas puedes usar este comando.

npm run test

Para ejecutar localmente el proyecto puedes utilizar este comando.

npm run start

Abra https://devsu.cbejaranodevops.com/api/users con su navegador para ver el resultado.

Nuevas Rutas
Ruta Principal
Método: GET
URL: /
Respuesta:

Bienvenido a la ruta principal de Devsu  candidato: Carlos Bejarano  correo: cebm.programmer@gmail.com !


Ruta de Health Check
Método: GET
URL: /healthcheck
Respuesta:

{
  "status": "OK"
}


Docker
Dockerfile
Este proyecto incluye un Dockerfile para facilitar la creación de un contenedor Docker.

# Usa una imagen base oficial de Node.js
FROM node:18.15.0

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia el package.json y package-lock.json al directorio de trabajo
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de la aplicación al directorio de trabajo
COPY . .

# Establece variables de entorno (si es necesario)
ENV NODE_ENV=production

# Expone el puerto en el que la aplicación estará escuchando
EXPOSE 8000

# Define el comando que se ejecutará cuando el contenedor se inicie
CMD ["node", "index.js"]


Construcción y Ejecución del Contenedor
Para construir y ejecutar el contenedor Docker, use los siguientes comandos:

Construir la imagen Docker


docker build -t demo-devops-nodejs .
Ejecutar el contenedor Docker
 
 
docker run -p 8000:8000 demo-devops-nodejs
Abra https://devsu.cbejaranodevops.com/api/users con su navegador para ver el resultado.


Pipelines
Este proyecto incluye dos pipelines configurados con GitHub Actions.

Pipeline de Build y Deploy
Este pipeline se ejecuta en cada push a la rama main y realiza las siguientes acciones:

Compila la imagen Docker
Etiqueta la imagen Docker
Publica la imagen Docker en Amazon ECR
Actualiza el servicio de Amazon ECS con la nueva imagen


Pipeline de Pruebas en Pull Requests
Este pipeline se ejecuta en cada pull request a la rama main y realiza las siguientes acciones:

Instala las dependencias
Ejecuta las pruebas unitarias


Licencia
Copyright © 2023 Devsu. Todos los derechos reservados.