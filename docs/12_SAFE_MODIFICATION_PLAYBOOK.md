# 12 Safe Modification Playbook

Use a branch, make one vertical change, run backend tests, call the route, then test the UI. Persistent database changes require a migration plan.

## 1. Add a project

Edit `SeedDataConfig.projects`; with existing nonempty DB, seed logic will not add it. For H2 restart; for PostgreSQL insert/migrate explicitly. Test order, JSON and card.

## 2. Add a field to `Project`

Edit entity field/constructor/getter, response record/factory, seed, frontend wire/domain mapping and rendering; add migration and tests. A missed mapper silently drops data.

## 3. Add a skill

Add a typed `Skill` seed or existing `"name|level"` pair. Check allowed frontend level and display order. PostgreSQL needs explicit data change.

## 4. Add research

Update `researchItems`, unique ID/order, then verify response and icon-name support in UI.

## 5. Change contact validation

Edit `ContactRequest` constraints/messages and keep `ContactMessage` column limits compatible. Add boundary MockMvc tests and verify displayed first error.

## 6. Change API response shape

Update response record/factory, `portfolioApi.ts` wire type/converter, components and docs together. Test runtime JSON; TypeScript cannot validate server output.

## 7. Add an endpoint

Choose resource/verb/status, add controller method, service behavior, repository query if needed, DTO, advice case and tests. Do not expose entities directly.

## 8. Change database config

Prefer environment overrides/profile. Verify driver, URL, credentials, schema mode and startup. Never put credentials in `VITE_*`.

## 9. Change CORS origin

Set `FRONTEND_ORIGIN` to exact scheme/host/port. For multiple origins, change config to bind a list. Test browser preflight, not only curl.

## 10. Replace H2 with PostgreSQL

Start PostgreSQL, create DB/user, set `SPRING_PROFILES_ACTIVE=postgres` and `DATABASE_*`, add Flyway migrations before real data, start app, inspect schema/seed, run tests against a disposable PostgreSQL instance.

## 11. Add tests

Use MockMvc for routes/validation/error bodies, service unit tests for mapping/normalization, repository tests for ordering, and an optional PostgreSQL integration profile. Avoid only asserting seed counts.

## 12. Debug a 404

Confirm method/path/base URL; inspect controller mapping; distinguish unknown project's intentional structured 404 from unmapped route; check component scanning.

## 13. Debug a 500

Read backend stack trace; identify controller/service/repository boundary; inspect DB/schema/seed; reproduce with curl; do not mask it with a broad catch before finding cause.

## 14. Debug CORS

Confirm browser origin exactly matches `FRONTEND_ORIGIN`; check OPTIONS response, allowed method/header and server availability. CORS is a browser rule, so curl success does not disprove it.

## 15. Debug validation

Inspect 400 JSON `fieldErrors`; compare body keys/types; remember whitespace fails `@NotBlank`, message minimum is 10 and `website` must be empty. Direct service calls bypass controller validation.

Each exercise teaches vertical tracing. The safest first five are: add one seed item in disposable H2, adjust a validation message, add a missing test, expose a visible development-only fallback warning, and add a nonpersisted response field end-to-end.
