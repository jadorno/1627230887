FROM node:15.7.0-alpine3.10 as react_app

WORKDIR /usr/src/app

COPY package.json  ./
COPY yarn.lock  ./
RUN yarn install
COPY .  ./
RUN yarn build

FROM nginx:1.18-alpine

COPY --from=react_app /usr/src/app/build /usr/share/nginx/html

CMD [ "/bin/sh", "-c", "nginx -g 'daemon off;'" ]