# Pelin Zeynep Kaya Portfolio

A React, TypeScript, Vite, and Tailwind portfolio with a separate Java 21 Spring Boot REST API.

The Spring backend owns project, skill, and research data and stores validated contact messages. The previous Express backend remains in `server.ts` only as a temporary rollback path.

## Architecture

```text
React on localhost:5173
        |
        | HTTP JSON
        v
Spring Boot on localhost:8081
        |
        v
H2 database (local learning profile)
```

## Running the project locally

Prerequisites:

- Java 21
- Maven 3.6.3 or newer
- Node.js

### 1. Run backend

Open a terminal in `backend/`:

```powershell
mvn spring-boot:run
```

The backend defaults to `8081` because Adobe Connect uses `8080` on this development machine. If `8081` is also busy:

```powershell
mvn spring-boot:run "-Dspring-boot.run.arguments=--server.port=18080"
```

When using another port, set the matching frontend value in `.env.local`:

```env
VITE_API_BASE_URL="http://localhost:18080"
```

### 2. Run frontend

Open a second terminal in the repository root:

```powershell
npm install
npm run dev
```

### 3. Backend URL

`http://localhost:8081`

### 4. Frontend URL

Vite normally prints `http://localhost:5173`.

### 5. H2 console, if enabled

Open `http://localhost:8081/h2-console` and use:

```text
JDBC URL: jdbc:h2:mem:portfolio
User Name: sa
Password: (leave blank)
```

### 6. Common errors

- **Port is in use:** use another backend port and update `VITE_API_BASE_URL` to match.
- **Frontend shows static content:** the backend request failed, so the migration fallback was used. Check the browser console and start Spring Boot.
- **CORS error:** make sure the frontend is on `http://localhost:5173`, or set `FRONTEND_ORIGIN` before starting Spring.
- **Maven cannot download dependencies:** verify internet access and rerun `mvn test`.
- **Contact returns 400:** check name, valid email, subject, and the 10-3000 character message rule.

## Commands

```powershell
# Backend tests
cd backend
mvn test

# Frontend type-check
cd ..
npm run lint

# Frontend production build
npm run build
```

## Documentation reading order

1. [`docs/BACKEND_CURRENT_STATE.md`](docs/BACKEND_CURRENT_STATE.md)
2. [`docs/SPRING_BOOT_MIGRATION_PLAN.md`](docs/SPRING_BOOT_MIGRATION_PLAN.md)
3. [`docs/DTO_AND_ENTITY_GUIDE.md`](docs/DTO_AND_ENTITY_GUIDE.md)
4. [`docs/SPRING_BOOT_BACKEND_GUIDE.md`](docs/SPRING_BOOT_BACKEND_GUIDE.md)
5. [`docs/FRONTEND_BACKEND_INTEGRATION.md`](docs/FRONTEND_BACKEND_INTEGRATION.md)
6. [`docs/RUNBOOK.md`](docs/RUNBOOK.md)
7. [`docs/API_REFERENCE.md`](docs/API_REFERENCE.md)
8. [`docs/MIGRATION_SUMMARY.md`](docs/MIGRATION_SUMMARY.md)
