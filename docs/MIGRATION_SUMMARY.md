# Migration Summary

## 1. What the old backend did

`server.ts` combined Express and Vite. Its only API validated contact data and called Resend to send an email. It did not own portfolio content and did not use a database.

## 2. What the new Spring Boot backend does

- serves REST data for projects, skills, and research;
- returns one project by ID;
- validates and stores contact messages;
- seeds the existing UI content into H2;
- supports an explicit PostgreSQL profile;
- allows one configured frontend origin;
- returns consistent validation/not-found errors.

## 3. Files added

- complete Maven application under `backend/`;
- entity, repository, DTO, service, controller, config, and exception packages;
- backend integration tests;
- `src/api/portfolioApi.ts`;
- `src/vite-env.d.ts`;
- migration, architecture, API, runbook, database, testing, and integration documentation.

## 4. Files changed

- three content components now load from Spring with static fallback;
- contact form now includes subject and stores through Spring;
- `.env.example` documents the browser API URL;
- `package.json` separates Vite development from the legacy server;
- `.gitignore` excludes Maven build output;
- `README.md` documents the two-process setup.

## 5. Files not touched

- visual theme and global CSS;
- main application layout and section order;
- hero, about, journey, awards, journal, and navbar content;
- static timeline, achievement, and journal arrays;
- real `.env.local` values.

## 6. Old files that can be removed later

After Spring deployment is verified:

- `server.ts`;
- Express, Express types, dotenv, and tsx dependencies;
- Resend-only environment settings;
- `npm run dev:legacy`;
- static projects/skills/research fallback arrays, if backend availability is guaranteed.

They remain now because the migration rules require a rollback path.

## 7. Behavior preserved

- cards, filters, tags, links, colors, snippets, skill categories, commentary, research icons, and animations;
- contact loading/error/success flow;
- server-side contact validation;
- honeypot behavior;
- readable page content when the learning backend is stopped.

## 8. Behavior changed

- live content comes from REST APIs when Spring is available;
- frontend and backend run as separate processes;
- contact now requires a subject;
- contact messages are stored in H2 instead of sent through Resend;
- contact success copy now truthfully says "stored";
- default `npm run dev` starts Vite, while the old combined server moved to `npm run dev:legacy`.

## 9. What I learned from the migration

- how an HTTP request moves through controller, service, repository, and database;
- why entities and DTOs are separate;
- why backend validation is required;
- why two localhost ports need CORS;
- how a frontend adapter protects existing UI types from backend naming;
- how seed data replaces compiled frontend content;
- why a migration needs a rollback path.

## 10. What I should be able to explain now

1. What did Express do before, and what does Spring do now?
2. Why is `ProjectResponse` separate from `Project`?
3. What code performs the SQL operation?
4. Why are controllers intentionally thin?
5. Why is H2 appropriate for learning but not the final production database?
6. What exactly does `VITE_API_BASE_URL` contain, and why can it not hold secrets?
7. Why does CORS name one frontend origin?
8. What happens when Spring is stopped?
9. Why does the contact form no longer claim to send email?
10. How would the same JPA code connect to PostgreSQL?

Interview-ready contact explanation:

> The contact form stores validated messages in the backend. I did not add email sending yet because that requires SMTP or API credentials and would add unnecessary complexity at this stage.
