# Utiliza una imagen base oficial de Node.js
FROM node:14

# Establece el directorio de trabajo en el contenedor
WORKDIR /usr/src/app

# Copia el archivo package.json y package-lock.json (si existe)
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia el resto del código de la aplicación al contenedor
COPY . .

# Expone el puerto en el que la aplicación estará escuchando
EXPOSE 8000

# Comando para ejecutar la aplicación
CMD [ "npm", "run", "start" ]
