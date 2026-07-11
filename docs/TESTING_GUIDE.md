# Testing Guide

## 1. What should be tested

- seeded data is available and ordered;
- known/unknown project IDs return the right result;
- skill/research response shape matches the API client;
- valid contact data is stored;
- invalid contact data returns `400`;
- frontend uses API data when Spring runs;
- static fallback works when Spring is stopped;
- contact never displays a false success after a failed request.

## 2. Manual API tests

Start Spring, then run the commands in `RUNBOOK.md`.

Expected:

- projects: `200`, three seeded items;
- `florastream`: `200`;
- skills: `200`, 25 seeded rows;
- research: `200`, three seeded items;
- valid contact: `201`;
- missing project: `404`;
- invalid contact: `400`.

Manual verification was run on port `18080` because local port `8080` was already occupied. Known project, skills, research, valid contact, missing-project, and invalid-contact checks passed.

## 3. Example curl commands

```powershell
curl.exe http://localhost:8081/api/projects
curl.exe http://localhost:8081/api/projects/florastream
curl.exe http://localhost:8081/api/skills
curl.exe http://localhost:8081/api/research

curl.exe -X POST http://localhost:8081/api/contact `
  -H "Content-Type: application/json" `
  -d '{\"name\":\"Example Name\",\"email\":\"example@email.com\",\"subject\":\"Portfolio contact\",\"message\":\"Hello from curl testing.\",\"website\":\"\"}'
```

## 4. Frontend integration tests by hand

1. Run both applications.
2. Confirm all three project filters still display the correct cards.
3. Confirm skill tabs and skill commentary still work.
4. Confirm three research cards and their icons appear.
5. Submit the contact form with an empty subject and confirm the UI rejects it.
6. Submit valid data and confirm the stored-success panel appears.
7. Check `CONTACT_MESSAGES` through H2.
8. Stop Spring, refresh, and confirm static content remains.

## 5. Backend automated tests, if added

Run:

```powershell
cd backend
mvn test
```

`PortfolioApplicationTests` starts the real Spring/JPA context with H2. It checks:

- three projects and a known project;
- 25 skills;
- three research items;
- saving and normalizing a contact email.

Current result: 2 tests passed, 0 failures, 0 errors.

Frontend verification:

```powershell
npm run lint
npm run build
```

Both currently pass.

## 6. Common bugs

- API and TypeScript field names drift apart. Keep mapping in `portfolioApi.ts`.
- A new skill level is not part of the TypeScript union.
- CORS origin differs by one port or protocol.
- Vite was not restarted after environment changes.
- Success copy says "email sent" even though only a database insert occurred.
- H2 restart is mistaken for lost production data.
