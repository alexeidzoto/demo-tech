# >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> STAGE BUILD >>>>>>>><<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
# pull official base image
FROM node:12.18.1-alpine AS builder

# set working directory
WORKDIR /usr/src/app

# install app dependencies
COPY ./package.json ./

RUN npm install --silent
# <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< STAGE BUILD <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

# >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> STAGE REACT >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
FROM node:12.18.1-alpine 

# set working directory
WORKDIR /usr/src/app

# -- Adicionar Variable de Entorno VIRTUAL_ENV con la ubicación de las dependencias --
ENV PATH /usr/src/app/node_modules/.bin:$PATH

COPY --from=builder /usr/src/app/node_modules /usr/src/app/node_modules
# add app
COPY ./ ./

EXPOSE 3000

CMD ["yarn", "run", "start"]
# <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< STAGE REACT <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<