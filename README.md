# Project: Docker + React (Vite) + Express

This repository contains a small full-stack app with a React + Vite frontend and an Express backend, wired together with Docker and Docker Compose.

## What this README contains

- How to run the project using Docker and Docker Compose (full stack and frontend-only)
- How to run the frontend and backend locally without Docker
- Troubleshooting notes for Windows

## Prerequisites

- Docker Desktop (Windows) or a Docker Engine that supports Compose
- Docker Compose (if your Docker doesn't bundle it use the `docker compose` command)
- Node.js (for running locally, optional)

## Quick start — full stack (Docker Compose)

From the repository root (where `docker-compose.yaml` is located):

```powershell
# build images (optional; `up` will build if needed)
docker-compose build

# start full stack in the foreground (rebuild images if needed)
docker-compose up --build

# start in background (detached)
docker-compose up -d --build

# stop and remove containers, networks
docker-compose down
```

Notes:

- If your Docker CLI uses the newer command, replace `docker-compose` with `docker compose` (space).
- The Compose files present in this repo include `docker-compose.yaml` (full stack) and `docker-compose.frontend.yaml` (frontend-only).

## Start frontend only with Docker Compose

If you only want to run the frontend container (useful for frontend-focused development):

```powershell
# run frontend-only compose file (adjust filename if needed)
docker-compose -f docker-compose.frontend.yaml up --build

# detached
Docker-compose -f docker-compose.frontend.yaml up -d --build
```

## Common Docker Compose commands

```powershell
# show logs for all services
docker-compose logs -f

# show logs for a single service (replace <service> with the name in the compose file)
docker-compose logs -f <service>

# rebuild a single service and recreate containers
docker-compose up -d --build --no-deps --force-recreate <service>
```

## Run locally without Docker

If you prefer to run the apps directly on your machine (useful for fast iteration):

Frontend (React + Vite):

```powershell
cd frontend
npm install
npm run dev
```

Backend (Express):

```powershell
cd backend
npm install
npm start
```

Notes from package.json:

- Frontend scripts: `dev` (runs `vite`), `build`, `preview`.
- Backend script: `start` (runs `nodemon src/index.js`).

## Environment and ports

- The backend uses `dotenv`. If you need environment variables, create a `.env` file in the `backend/` folder (the Compose file may also provide env config).
- Ports are configured in the Compose files; check `docker-compose.yaml` and `docker-compose.frontend.yaml` to see host ports.

## Troubleshooting (Windows)

- Ensure Docker Desktop is running and that WSL2 integration is enabled if you use WSL.
- If `docker-compose` is not available, try `docker compose` (no hyphen).
- If containers fail to start due to port conflicts, change the host port in the compose file or stop the service using the port.
- For permission issues when mounting volumes, check Docker Desktop settings and file sharing for the drive.

## Useful tips

- To quickly rebuild after code changes in development, use the local dev commands (`npm run dev` and `npm start`) — they are faster than re-building images.
- If you change Dockerfile or dependencies, run `docker-compose build --no-cache` to force a fresh build.

## Where to look next

- Frontend source: `frontend/src`
- Backend source: `backend/src`
- Compose files at repository root: `docker-compose.yaml`, `docker-compose.frontend.yaml`

---

File created: `README.md` (repository root)
