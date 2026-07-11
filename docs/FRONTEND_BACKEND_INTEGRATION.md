# Frontend Backend Integration

## 1. How frontend talks to backend

`src/api/portfolioApi.ts` owns all Spring API calls. Components call typed functions rather than building URLs and parsing errors independently.

The browser sends HTTP requests and receives JSON. Spring does not render React components.

## 2. API base URL

The base URL is:

```ts
import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8081'
```

`VITE_` values are browser-visible configuration. They must never contain database passwords or secret API keys.

## 3. CORS explanation

An origin includes protocol, hostname, and port. `localhost:5173` and `localhost:8081` are different origins, so the browser requires the backend to allow the frontend origin.

Spring allows the configured `FRONTEND_ORIGIN`, default `http://localhost:5173`. `*` is avoided because it grants browser access from every site and is too broad for production.

## 4. Local development setup

1. Start Spring Boot on `8081`.
2. Set `VITE_API_BASE_URL="http://localhost:8081"` in `.env.local` or use the default.
3. Start Vite on `5173`.
4. Open the Vite URL, not the backend URL.

## 5. Production deployment setup

Deploy the frontend and backend separately:

- frontend value: `VITE_API_BASE_URL=https://api.example.com` at build time;
- backend value: `FRONTEND_ORIGIN=https://www.example.com` at runtime;
- backend database values: server-side only.

HTTPS should be used on both sides. The initial H2 profile is not the production database.

## 6. Environment variables

Frontend:

- `VITE_API_BASE_URL`: public Spring API URL.

Backend:

- `PORT`: backend port;
- `FRONTEND_ORIGIN`: allowed browser origin;
- `SPRING_PROFILES_ACTIVE=postgres`: enables PostgreSQL;
- `DATABASE_URL`, `DATABASE_USERNAME`, `DATABASE_PASSWORD`: server-side PostgreSQL configuration.

The Resend variables belong only to the retained legacy Express flow and are not read by Spring.

## 7. How to debug failed API calls

1. Open the browser Network panel.
2. Find the failing `/api/...` request.
3. Check its full URL, status, and JSON response.
4. Test that URL directly with `Invoke-RestMethod`.
5. Check the Spring terminal for startup/validation errors.
6. If the request never reaches Spring, check the base URL and CORS origin.

Projects, skills, and research fall back to `src/data.ts` and log a browser warning. Contact cannot safely fake success; it shows the backend error.

## 8. What changes were made in frontend

- Added `src/api/portfolioApi.ts`.
- Added `src/vite-env.d.ts` for typed Vite environment access.
- `ProjectsSection.tsx` loads projects and retains static fallback.
- `SkillsSection.tsx` loads flat skill rows, groups them, and retains fallback.
- `InterestsSection.tsx` loads research and retains fallback.
- `ContactSection.tsx` adds subject, calls Spring, preserves the honeypot, and uses truthful database-storage success copy.
- `package.json` now runs Vite with `npm run dev`; `npm run dev:legacy` retains the old combined Express path.
