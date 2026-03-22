# Dockerize

Use this guide when you need to build or maintain the container setup for this repo.

## Goal

- Production image should build the Gatsby site and serve static files on port `3000`
- Development container should support live editing on port `8000`

## Files to inspect first

- `Dockerfile`
- `docker-compose.yml`
- `.dockerignore`
- `package.json`
- `DOCKER.md`

## Repo-specific notes

- Gatsby production output is generated into `public/`
- Development should bind to `0.0.0.0`, not the default localhost-only host
- Dependency install currently uses `npm ci --legacy-peer-deps`
- `content/` exists and may be empty, so Gatsby content assumptions should be verified during build work

## Done criteria

1. `Dockerfile` uses a reliable multi-stage build.
2. `docker-compose.yml` has separate production and development services.
3. Development service is reachable from the host machine.
4. `DOCKER.md` matches the actual commands in the repo.
