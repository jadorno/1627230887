FROM node:lts-bullseye as build

WORKDIR /usr/src/app

COPY react/package.json ./
COPY react/yarn.lock ./

RUN yarn install

COPY react/src ./src
COPY react/public ./public

RUN NODE_OPTIONS=--openssl-legacy-provider yarn build

FROM python:3.9-bullseye

ARG DEBIAN_FRONTEND=noninteractive
RUN apt update && apt upgrade -y \
    && apt-get install -y --no-install-recommends nginx \
    && rm -rf /usr/share/nginx/html/* \
    && rm -rf /var/lib/apt/lists/*

COPY --from=build /usr/src/app/build /usr/share/nginx/html
COPY config/nginx.conf /etc/nginx/nginx.conf

WORKDIR /usr/src/app

COPY .devcontainer/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY python/server.py ./
COPY python/config.py ./
COPY python/api ./api

CMD [ "gunicorn", "server:app", "--config", "config.py"]
