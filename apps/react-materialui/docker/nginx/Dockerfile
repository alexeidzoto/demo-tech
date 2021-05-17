# >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> STAGE 1 BUILD >>>>>>>><<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
# FROM node:10 AS builder
FROM node:10

WORKDIR /usr/src/app

COPY ./package.json /usr/src/app/package.json

RUN npm install --no-cache

COPY . /usr/src/app

RUN npm run build --no-cache
# <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< STAGE 1 BUILD <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

# >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> STAGE 2 NGINX >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
# FROM nginx:1.13.9-alpine

# COPY --from=builder /usr/src/app/dist /usr/share/nginx/html

# RUN rm -rf /etc/nginx/conf.d/default.conf

# ADD ./docker/nginx/docker-nginx-default.conf /etc/nginx/conf.d/default.conf

# EXPOSE 80

# CMD ["nginx", "-g", "daemon off;"]
# <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< STAGE 2 NGINX <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<