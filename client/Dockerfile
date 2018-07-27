#
# App
#
FROM kkarczmarczyk/node-yarn:7.6 as app

MAINTAINER Gabriel Poca gabrielpoca@gmail.com

# setup a folder to cache node_modules
WORKDIR /tmp
COPY package.json /tmp/
COPY yarn.lock /tmp/

# install node_modules
RUN yarn install

# setup /app for source code
WORKDIR /app

# copy client source to /app
COPY . /app

# load cached node_modules
RUN cp -a /tmp/node_modules /app

# build cleint
ENV NODE_ENV=production
RUN yarn run build

#
# Caddy
#
FROM abiosoft/caddy:builder as builder

ARG version="0.10.10"
ARG plugins="git"

RUN VERSION=${version} PLUGINS=${plugins} /bin/sh /usr/bin/builder.sh

#
# Final
#
FROM alpine:3.6
LABEL maintainer "Abiola Ibrahim <abiola89@gmail.com>"

LABEL caddy_version="0.10.10"

RUN apk add --no-cache openssh-client git

# install caddy
COPY --from=builder /install/caddy /usr/bin/caddy
COPY --from=app /app/build /app

# validate install
RUN /usr/bin/caddy -version
RUN /usr/bin/caddy -plugins

EXPOSE 80 443 2015
VOLUME /root/.caddy /srv
WORKDIR /srv

COPY Caddyfile /etc/Caddyfile

ENTRYPOINT ["/usr/bin/caddy"]
CMD ["--conf", "/etc/Caddyfile", "--log", "stdout"]
