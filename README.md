# Pelin Zeynep Kaya Portfolio

A full-stack engineering portfolio built with React, TypeScript, Vite, Tailwind CSS, Java 21, Spring Boot, JPA, and PostgreSQL.

The frontend remains readable when the free backend is unavailable by using static fallback content. When Spring Boot is available, it serves projects, skills, research interests, and the contact endpoint through a typed REST API.

## Stack

- Frontend: React 19, TypeScript, Vite, Tailwind CSS, Motion
- Backend: Java 21, Spring Boot, Spring MVC, Bean Validation, Spring Data JPA
- Data: H2 for local development and tests; PostgreSQL/Neon for production
- Email: Resend HTTPS API, called only by Spring Boot
- Hosting target: Vercel frontend, Render backend, Neon PostgreSQL

## Architecture

```text
React / Vite
    |
    | HTTP JSON
    v
Spring Boot REST API
    |-- projects, skills, research --> JPA --> H2 local / PostgreSQL production
    |
    `-- contact --> validation --> rate limit --> JPA + Resend HTTPS API
```

The Resend key and database credentials remain server-side. Only variables beginning with `VITE_` are embedded in the browser bundle.

## Run locally

Prerequisites:

- Java 21
- Maven 3.6.3 or newer
- Node.js

Start the backend from `backend/`:

```powershell
mvn spring-boot:run
```

The API defaults to `http://localhost:8081`. The default profile uses an in-memory H2 database that is recreated and seeded on every backend restart.

Start the frontend from the repository root:

```powershell
npm install
npm run dev
```

Vite normally serves the portfolio at `http://localhost:5173`. To use a different backend URL, create an ignored `.env.local` file:

```env
VITE_API_BASE_URL="http://localhost:8081"
```

The H2 console is available at `http://localhost:8081/h2-console` while the local backend is running:

```text
JDBC URL: jdbc:h2:mem:portfolio
User Name: sa
Password: (blank)
```

## API

| Method | Path | Result |
| --- | --- | --- |
| `GET` | `/api/projects` | Display-ordered projects |
| `GET` | `/api/projects/{id}` | One project or `404` |
| `GET` | `/api/skills` | Display-ordered skills |
| `GET` | `/api/research` | Display-ordered research interests |
| `POST` | `/api/contact` | Validates, stores, and optionally emails a contact message |

Contact requests accept `name`, `email`, `subject`, `message`, and an empty `website` honeypot. The endpoint returns:

- `201` for a valid accepted request;
- `400` for validation or malformed JSON;
- `429` after more than five requests from one client in 15 minutes;
- `502` when enabled email delivery fails.

When contact email is enabled, storage and Resend delivery share one Spring transaction boundary. A delivery failure is returned to the frontend and the database insert is rolled back.

## Configuration

Local email delivery is disabled by default. Valid local contact messages are stored in H2 without requiring a Resend key.

Production backend variables:

```env
PORT="8080"
SPRING_PROFILES_ACTIVE="postgres"
DATABASE_URL="jdbc:postgresql://YOUR_NEON_HOST/YOUR_DATABASE?sslmode=require"
DATABASE_USERNAME="YOUR_NEON_USER"
DATABASE_PASSWORD="YOUR_NEON_PASSWORD"
FRONTEND_ORIGIN="https://YOUR_VERCEL_PROJECT.vercel.app"
CONTACT_MAIL_ENABLED="true"
RESEND_API_KEY="YOUR_RESEND_API_KEY"
CONTACT_TO_EMAIL="YOUR_INBOX_ADDRESS"
CONTACT_FROM_EMAIL="Portfolio <hello@YOUR_VERIFIED_DOMAIN>"
```

Never commit real values. Configure them in Render. The Resend sender must belong to a verified domain.

The `postgres` profile uses persistent PostgreSQL with `ddl-auto: update`. Seed data is inserted only when its tables are empty, so changing Java seed definitions does not overwrite existing production rows.

## Tests and build

Run backend tests:

```powershell
cd backend
mvn test
```

The six JUnit tests cover seeded content, contact normalization/storage, the Resend HTTP request, validation errors, rate limiting, and rollback on delivery failure.

Run frontend checks from the repository root:

```powershell
npm run lint
npm run build
```

## Deploy

### 1. Neon PostgreSQL

Create a Neon project in the same region as the backend when possible. Use a direct connection for Hibernate schema updates and convert the supplied URL to the JDBC form shown in the configuration section.

### 2. Render backend

Create a Free Web Service from this repository:

```text
Runtime: Docker
Root directory: backend
Dockerfile path: ./Dockerfile
Docker build context: .
Health check path: /api/projects
```

Add the production backend variables in Render. Free services sleep after inactivity, so the first API request after a quiet period can be slower.

### 3. Vercel frontend

Import the repository with:

```text
Framework preset: Vite
Root directory: repository root
Build command: npm run build
Output directory: dist
```

Set this Vercel build variable and redeploy:

```env
VITE_API_BASE_URL="https://YOUR_RENDER_SERVICE.onrender.com"
```

## Release verification

Before sharing the public URL:

1. Confirm the Vercel site loads projects from the Render API.
2. Submit one valid contact message.
3. Confirm a row exists in Neon and Resend accepted the email.
4. Confirm invalid contact data returns `400`.
5. Check the rendered portfolio on desktop and mobile.
