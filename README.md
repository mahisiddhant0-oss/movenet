# MoveNet

> Smarter Routes. Better Loads. Fewer Empty Miles.

MoveNet is a full-stack logistics marketplace in development. It is being built to
help shippers discover suitable transport capacity and help transport agencies find
compatible return-trip loads, with the long-term goal of reducing empty truck
journeys.

## Project status

- **Stage 0 — Architecture and planning:** complete.
- **Stage 1 — Project setup:** complete and verified locally.
- **Stage 2 — Premium frontend foundation:** in progress.
  - Batches 1 and 2 are implemented.
  - Frontend TypeScript checking and the production build pass locally.

MoveNet is not yet a live logistics marketplace. Authentication, database-backed
users, loads, matching, offers, bookings, and production deployment are planned for
later stages.

## What is implemented

### Frontend foundation

- Responsive React, TypeScript, Vite, and Tailwind CSS application.
- MoveNet design tokens, global accessibility defaults, responsive landing page, and
  reusable `Button` component.
- Responsive navigation and footer using Lucide icons.
- Client-side routes:
  - `/` — landing page
  - `/login` — UI-only sign-in screen
  - `/register` — UI-only registration screen
- Native form validation, password visibility controls, and clear UI messaging that
  no credentials are sent or stored yet.

### Backend and local infrastructure foundation

- Node.js, Express, TypeScript, and Zod API foundation.
- `GET /api/v1/health` application health endpoint.
- `GET /api/v1/health/dependencies` PostgreSQL/PostGIS and Redis connectivity check.
- PostgreSQL 18 with PostGIS 3.7 through Docker Compose.
- Redis 8 through Docker Compose.
- Strict TypeScript checks for frontend and backend.

## Technology stack

| Area | Technology |
|---|---|
| Frontend | React, TypeScript, Vite, Tailwind CSS, React Router, Lucide React |
| Backend | Node.js, Express, TypeScript, Zod |
| Database | PostgreSQL, PostGIS, `pg` |
| Cache | Redis |
| Local infrastructure | Docker Compose |
| Planned data access | Prisma plus parameterized PostgreSQL queries for advanced PostGIS work |
| Planned testing | Vitest and Supertest |

## Local setup

### Prerequisites

- Node.js `22.22.0` or later
- Docker Desktop

The project has been verified with Node.js `22.23.4`.

### 1. Start PostgreSQL/PostGIS and Redis

```bash
docker compose up -d
```

### 2. Configure and start the backend

```bash
cd backend
cp .env.example .env
npm install
npm run typecheck
npm run dev
```

The API runs at `http://localhost:4000`.

### 3. Start the frontend

Open another terminal:

```bash
cd frontend
npm install
npm run typecheck
npm run dev
```

The frontend runs at `http://localhost:5173`.

## Local URLs

| URL | Current purpose |
|---|---|
| `http://localhost:5173/` | Public MoveNet landing page |
| `http://localhost:5173/login` | UI-only sign-in preview |
| `http://localhost:5173/register` | UI-only registration preview |
| `http://localhost:4000/api/v1/health` | API health response |
| `http://localhost:4000/api/v1/health/dependencies` | PostgreSQL/PostGIS and Redis health response |

## Verify the local environment

```bash
curl http://localhost:4000/api/v1/health
curl http://localhost:4000/api/v1/health/dependencies

cd frontend
npm run typecheck
npm run build

cd ../backend
npm run typecheck
```

The production frontend build validates the Stage 2 source. It does not mean that
authentication or marketplace workflows are implemented.

## Project structure

```text
.
├── backend/                 # Express API and infrastructure integrations
├── frontend/
│   └── src/
│       ├── components/      # Reusable UI and layout components
│       ├── pages/           # Public and authentication-screen routes
│       └── styles/          # Tailwind design tokens and global styles
├── docker-compose.yml       # Local PostgreSQL/PostGIS and Redis services
├── EXPLANATION.md           # Living technical explanation and interview notes
└── PLANNING.md              # Roadmap, architecture plan, and implementation status
```

## Important implementation boundaries

- The login and registration pages are **frontend previews only**.
- No password is sent to the backend, saved in browser storage, or logged.
- Argon2id password hashing, JWT access tokens, role-based authorization, and real
  account creation begin in Stage 3.
- PostgreSQL is planned as the source of truth for future bookings; Redis will not be
  used as booking authority.
- Route matching, Google Maps integration, and PostGIS proximity logic are not
  implemented yet.

## Documentation

- [Technical explanation and interview notes](EXPLANATION.md)
- [Development plan and architecture roadmap](PLANNING.md)

## Notes

- Values in `docker-compose.yml` and `.env.example` are for local development only.
- Local `.env` files, `node_modules`, build output, and the private LinkedIn posting
  plan are excluded from Git.
- Deployment is not complete. A future hosted frontend must include an SPA rewrite so
  direct visits to `/login` and `/register` resolve to the React application.
