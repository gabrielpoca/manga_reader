#
# build frontend
#
FROM node:9-alpine as frontend

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY client client/

RUN yarn build

#
# build elixir release
#
FROM bitwalker/alpine-elixir:1.6.3 as builder

RUN apk add build-base

WORKDIR /app
ENV MIX_ENV prod

RUN mix local.hex --force
RUN mix local.rebar --force

COPY . .
COPY --from=frontend /app/apps/api/priv/static apps/api/priv/static

RUN mix deps.get
RUN mix deps.compile
RUN mix compile
RUN mix release --env=prod --verbose

#
# final image
#

FROM bitwalker/alpine-elixir:1.6.3

WORKDIR /app

COPY --from=builder /app/_build/prod/rel/manga_reader .

CMD ["bin/manga_reader", "foreground"]
