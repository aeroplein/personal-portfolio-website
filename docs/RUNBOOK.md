# Runbook

## Start backend

```powershell
cd backend
mvn spring-boot:run
```

Expected URL: `http://localhost:8081`.

Port `8080` is occupied by Adobe Connect on this development machine, so the project uses `8081`. If `8081` is also occupied:

```powershell
mvn spring-boot:run "-Dspring-boot.run.arguments=--server.port=18080"
```

Then set `VITE_API_BASE_URL="http://localhost:18080"` in the repository-root `.env.local`.

## Start frontend

In another terminal:

```powershell
npm run dev
```

Open the URL printed by Vite, normally `http://localhost:5173`.

## Test API manually

```powershell
Invoke-RestMethod http://localhost:8081/api/projects
Invoke-RestMethod http://localhost:8081/api/projects/florastream
Invoke-RestMethod http://localhost:8081/api/skills
Invoke-RestMethod http://localhost:8081/api/research
```

Contact:

```powershell
$body = @{
  name = "Example Name"
  email = "example@email.com"
  subject = "Portfolio contact"
  message = "Hello from the manual API test."
  website = ""
} | ConvertTo-Json

Invoke-RestMethod `
  -Uri http://localhost:8081/api/contact `
  -Method Post `
  -ContentType "application/json" `
  -Body $body
```

## Test frontend integration

1. Start both processes.
2. Open browser developer tools and select Network.
3. Refresh.
4. Confirm `projects`, `skills`, and `research` return `200`.
5. Submit a valid contact form.
6. Confirm `contact` returns `201`.
7. Stop Spring and refresh. Content should use static fallback; contact should show an error.

## Check database data

Open `http://localhost:8081/h2-console`.

Use:

```text
JDBC URL: jdbc:h2:mem:portfolio
User Name: sa
Password: (blank)
```

Example queries:

```sql
SELECT * FROM PROJECTS;
SELECT * FROM SKILLS ORDER BY DISPLAY_ORDER;
SELECT * FROM RESEARCH_ITEMS ORDER BY DISPLAY_ORDER;
SELECT * FROM CONTACT_MESSAGES ORDER BY CREATED_AT DESC;
```

## Common errors and fixes

- **Port already in use:** change `PORT`/`--server.port` and update the frontend base URL.
- **CORS blocked:** set `FRONTEND_ORIGIN` to the exact Vite origin before starting Spring.
- **Static content but no API traffic:** check that `.env.local` is at the repository root and restart Vite after changing it.
- **400 contact response:** inspect `fieldErrors`; the backend rules are stricter than an empty-field check.
- **H2 console cannot connect:** use the exact JDBC URL from `application.yml` while the backend is running.
- **Data disappeared:** the default H2 database is in memory and resets on restart.
- **Frontend build command cannot find npm:** use the local binary or repair the Node/npm installation; this repository already has local dependencies installed.

## How to reset local data

Stop and restart Spring Boot. The in-memory H2 database is discarded, and seed data is inserted into a fresh database.

Do not use this reset behavior after switching to PostgreSQL. Persistent database resets should be deliberate SQL/migration operations.
