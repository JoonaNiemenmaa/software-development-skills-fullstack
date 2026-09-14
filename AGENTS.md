# AGENTS.md

Workout tracker web app for a university "Software Development Skills - Fullstack" course.

## Repo layout (not a monorepo)

Three isolated areas with separate `package.json` files and no cross-dependencies or workspace tooling:
- `project/backend/` — Express 5 + Mongoose REST API (the real app's backend)
- `project/frontend/` — React 19 + Vite + React Router 8 SPA (the real app's frontend)
- `exercises/` — 6 standalone course exercises (expressjs, json-server, mern, nodejs, react-quickstart, react-tic-tac-toe); unrelated to the main project

The `project/package.json` at the `project/` root is a stub (placeholder `test` script only). All real commands are in `backend/` and `frontend/`.

## Commands

Backend (`project/backend/`):
- `npm run dev` — nodemon with native `--env-file=.env`, serves on port 3000

Frontend (`project/frontend/`):
- `npm run dev` — Vite dev server, port hardcoded to 8000 in `vite.config.js`
- `npm run lint` — `eslint .` (only the frontend has linting)
- `npm run build` / `npm run preview`

## Environment / setup

- Backend loads env via Node's native `--env-file=.env` flag. Key vars: `SECRET` (JWT signing) and `MONGO_URI`.
- **No `.env.example` exists** — don't assume one.
- Code falls back to hardcoded defaults: JWT `SECRET="peanuts"` (in `src/auth.js` and `src/authorize.js`) and `mongodb://localhost:27017/testdb`. Requires a running local MongoDB (no Docker).
- The hardcoded `"peanuts"` JWT secret is a real security risk — don't expand its use.

## No tests / no CI

- No test framework, test files, or test scripts anywhere. Don't attempt to run tests.
- No `.github/` directory, no CI workflows.
- Backend has no lint config.

## Backend conventions

- One router module per resource in `src/`, mounted in `index.js` at `/api/*` (`/api/auth`, `/api/workout`, `/api/exercise`).
- Unusual error convention: handlers call `response.status(n)` then `throw new Error(...)`, delivered by the single global error handler in `src/error.js` (Express 5 forwards rejected async handlers automatically).
- Protected routes use the `authorize` middleware (`src/authorize.js`), which reads the `Authorization: Bearer <token>` header and sets `request.user`.
- Data model: exercises are stored as an array on the `User` document (the `models/Exercises.js` file is unused/legacy). Workouts store a `trainee` userId ref plus `sets[]` (exercise/reps/rest), with a schema `validate` on `exercise` checking it exists on the user.
- `user.save()` in `src/exercise.js` is not awaited (existing pattern).

## Style

- Plain JavaScript/JSX, no TypeScript.
- 4-space indent, semicolons, single quotes (applies to both frontend and backend).
- Commit messages are informal, a mix of Finnish and English.
- Frontend `src/config.js` hardcodes the backend base URL (`http://localhost:3000`).
