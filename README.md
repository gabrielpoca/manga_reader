# MangaReader

A PWA to read manga online.

# Development

Setup the environment variables, run the server and the client:

```
cp .envrc.sample .envrc
bin/server
bin/client
```

# Production

Run the docker image:

```
docker run -e PORT=4000 -p 4000:4000 -e SECRET_KEY=SECRET gabrielpoca/manga_reader:latest
```
