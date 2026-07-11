# Backend Current State

## 1. Current backend technology

The repository currently has a small TypeScript backend built with Node.js and Express.

`server.ts` has two jobs:

1. It exposes the contact endpoint.
2. It serves the Vite frontend in development and the built `dist/` folder in production.

This is not a Next.js project and it does not use Next API routes.

## 2. Current backend folder/files

There is no separate backend folder yet.

- `server.ts`: Express server, contact validation, basic in-memory rate limiting, Resend email call, and frontend serving.
- `package.json`: starts `server.ts` with `tsx`.
- `.env.example`: documents the Express port and Resend settings.
- `.env.local`: local, ignored environment values. Its values must remain private.

## 3. Current endpoints, if any

### `POST /api/contact`

Accepts:

```json
{
  "name": "Example Name",
  "email": "example@email.com",
  "message": "Hello from the portfolio",
  "website": ""
}
```

The `website` field is a honeypot. A real visitor leaves it empty.

The endpoint:

- normalizes and limits text;
- checks name, email, and message;
- applies an in-memory limit of five requests per IP per 15 minutes;
- sends an email through the Resend HTTP API;
- returns `{ "ok": true }` after a successful provider response.

There are no project, skill, research, profile, login, or admin endpoints.

## 4. Frontend API usage

`src/components/ContactSection.tsx` is the only frontend file that currently calls an API. It uses:

```ts
fetch('/api/contact', ...)
```

The relative URL works because Express and Vite currently share one origin.

`ProjectsSection.tsx`, `SkillsSection.tsx`, and `InterestsSection.tsx` do not make API requests. They import arrays directly from `src/data.ts`.

## 5. Current data source

Portfolio display content is hardcoded TypeScript data:

- projects: `projects` in `src/data.ts`;
- skills: `skillsData` in `src/data.ts`;
- research interests: `researchInterests` in `src/data.ts`;
- timeline, achievements, and journal entries: also in `src/data.ts`.

The Spring Boot MVP only needs to move projects, skills, and research to backend-managed data. Timeline, achievements, and journal content can stay static.

## 6. Environment variables

The Express backend knows about:

- `PORT`: combined Express/Vite server port, default `3001`;
- `NODE_ENV`: selects development or production frontend serving;
- `RESEND_API_KEY`: secret provider credential;
- `CONTACT_TO_EMAIL`: inbox receiving messages;
- `CONTACT_FROM_EMAIL`: verified sender identity.

The checked-in `.env.example` documents these variables. The real `.env.local` is ignored and must not be copied into frontend code or committed.

The Vite configuration also reads `DISABLE_HMR`. There are currently no browser-exposed `VITE_*` variables.

## 7. Database usage

There is no database, ORM, migration tool, or persistent storage.

Projects, skills, and research are compiled into the frontend bundle. Contact messages are sent to an email provider but are not saved by the application.

## 8. Contact form behavior

The React form collects name, email, and message. It performs a basic empty-field check, sends the values to Express, and displays either an error or a success panel.

The Express endpoint validates again because browser validation can be bypassed. It currently sends real email through Resend when all three Resend environment variables are configured.

The requested Spring Boot MVP intentionally changes this behavior: it will require a subject, validate the request, save the message in the database, and return a success response. It will not send email yet.

## 9. What must be preserved

- Existing visual layout, filters, animations, project metadata, skill categories, and research icons.
- Existing project, skill, and research content.
- The contact form's loading, error, and success experience.
- Server-side validation; frontend validation alone is not sufficient.
- Secrets must remain outside the React bundle.
- Static data should remain available during migration as a safe frontend fallback.
- The Node backend must remain in the repository until the Spring Boot path has been verified.

## 10. What can be removed later

After the Spring Boot backend and deployment setup are verified:

- the Express API implementation in `server.ts`;
- Express and its type package;
- `dotenv` and `tsx` if they are no longer used;
- Resend-only environment variables, unless email sending is added to Spring later;
- the old combined-server scripts in `package.json`.

Vite still needs a frontend development command. Removing old files is a later cleanup step, not part of the first migration pass.

## 11. Risks before migration

1. Splitting the servers changes the local topology from one origin to a frontend on port `5173` and a backend on port `8081`. CORS and an API base URL must be configured.
2. If the frontend switches without a fallback, a stopped backend would leave content sections empty.
3. The requested entity examples do not contain all current UI fields. Dropping fields such as `role`, `takeaway`, `cardColor`, `category`, or `snippet` would visibly break the design.
4. The current skill data is grouped by category, while a relational `Skill` table is naturally flat. The frontend API layer must group the flat responses.
5. The current research section is a list of interests rather than formal publications. The backend name can be `ResearchItem`, but its DTO must preserve the current `iconName` and text.
6. Contact behavior will change from email delivery to database storage. The UI copy must not continue claiming that the message reached an inbox.
7. The old in-memory spam controls will not automatically exist in Spring. Validation and a honeypot will be preserved; stronger rate limiting can be added later if public traffic makes it necessary.
8. H2 data is local development data. With the initial in-memory configuration, saved contact messages reset when the backend restarts.
