# MoveNet

> Smarter Routes. Better Loads. Fewer Empty Miles.

MoveNet is a full-stack logistics marketplace in development. It is designed to help shippers find transport providers and help transport agencies identify compatible return-trip loads, reducing empty truck journeys.

## Current progress

**Stage 1 — Project setup is complete and verified locally.**

The following foundations are implemented and verified locally:

- React, TypeScript, Vite, and Tailwind CSS frontend foundation.
- Node.js, Express, TypeScript, and Zod backend foundation.
- API health endpoint: `GET /api/v1/health`.
- Dependency health endpoint: `GET /api/v1/health/dependencies`.
- PostgreSQL 18 with PostGIS 3.7 running through Docker Compose.
- Redis 8 running through Docker Compose.
- PostgreSQL/PostGIS and Redis connectivity checks from the API.
- Strict TypeScript checks for both frontend and backend.

Features such as authentication, agency and fleet management, load posting, matching, offers, and bookings are planned for later stages.

## Technology stack

| Area | Technology |
|---|---|
| Frontend | React, TypeScript, Vite, Tailwind CSS, React Router, Lucide React |
| Backend | Node.js, Express, TypeScript, Zod |
| Database | PostgreSQL, PostGIS, `pg` |
| Cache | Redis |
| Local infrastructure | Docker Compose |

## Local setup

### Prerequisites

- Node.js 22.18 or later
- Docker Desktop

### 1. Start PostgreSQL/PostGIS and Redis

```bash
docker compose up -d
```

### 2. Configure the backend

```bash
cd backend
cp .env.example .env
npm install
npm run typecheck
npm run dev
```

The API runs at `http://localhost:4000`.

### 3. Start the frontend

In a second terminal:

```bash
cd frontend
npm install
npm run typecheck
npm run dev
```

The frontend runs at `http://localhost:5173`.

## Verify the local environment

```bash
curl http://localhost:4000/api/v1/health
curl http://localhost:4000/api/v1/health/dependencies
```

The dependency endpoint verifies that the API can reach PostgreSQL/PostGIS and Redis.

## Project structure

```text
.
├── backend/        # Express API and infrastructure integrations
├── frontend/       # React application
├── docs/           # Project documentation
├── docker-compose.yml
└── PLANNING.md     # Architecture and development plan
```

## Notes

- The values in `docker-compose.yml` and `.env.example` are for local development only.
- Local `.env` files and installed dependencies are excluded from Git.
- Route matching, booking flows, and production deployment are not implemented yet.
