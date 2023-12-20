# Usa una imagen base de Node.js
FROM node:18.18.0

# Establece el directorio de trabajo en la aplicación
WORKDIR /usr/src/app

# Copia los archivos de la aplicación al contenedor
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Instala TypeScript globalmente
RUN npm install -g typescript

# Copia el resto de los archivos
COPY . .

# Compila TypeScript a JavaScript
RUN npm run build

# Expone el puerto en el que la aplicación se ejecuta
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["node", "/usr/src/app/dist/app.js"]
