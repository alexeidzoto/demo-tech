# build environment
FROM node:12.18.1-alpine AS builder
ENV PATH /app/node_modules/.bin:$PATH
# set working directory
WORKDIR /usr/src/app

# install app dependencies
COPY ./package.json ./

RUN npm install --silent \
    && npm run build

# production environment
FROM nginx:stable-alpine
COPY --from=builder /usr/src/app/build /usr/share/nginx/html
# new
COPY ./docker/nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
