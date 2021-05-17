# Multi Estado
# 1) Estado 1: Imagen de Node para instalar los paquetes y realizar la compilación del proyecto
# 2) Estado 2: Image de Nginx para desplegar el proyecto en el puerto 80

# >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> STAGE 1 BUILD >>>>>>>><<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
# Descarga la imagen base oficial de Node en su version 10
FROM node:10 AS builder

# Configurar el directorio por defecto
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Copiar las dependencias a instalar
COPY package.json /usr/src/app/package.json

# Realizar la instalación
RUN npm install --no-cache

# Copiar el código fuente
COPY . /usr/src/app

# Compilar el proyecto
RUN npm run build --no-cache
# <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< STAGE 1 BUILD <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

# >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> STAGE 2 NGINX >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
# Descargar la imagen Nginx para servir el contenido
FROM nginx:1.13.9-alpine

# Copiar el contenido del builder generado en el STAGE 1 BUILD
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html
COPY manifest.json /usr/share/nginx/html
COPY firebase-messaging-sw.js /usr/share/nginx/html

# Eliminar la configuracíon por defecto
RUN rm -rf /etc/nginx/conf.d/default.conf

# Adiciona la nueva configuración
ADD docker-nginx-default.conf /etc/nginx/conf.d/default.conf

# Expone el puerto 80
EXPOSE 80

# Inicia el servicio nginx
CMD ["nginx", "-g", "daemon off;"]
# <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< STAGE 2 NGINX <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<