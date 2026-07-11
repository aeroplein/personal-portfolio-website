# 09 Frontend–Backend Flow Deep Dive

## Shared API client

`src/api/portfolioApi.ts` owns the base URL, JSON request/error behavior, backend wire types and conversion to UI types.

- `API_BASE_URL`: `VITE_API_BASE_URL` or `http://localhost:8081`; one trailing slash is removed.
- `requestJson<T>`: calls `fetch`, attempts JSON parsing, throws `PortfolioApiError` on non-2xx, otherwise casts the body to `T`. Generics/casts do not validate runtime JSON.
- Error priority: first field error → backend message → backend reason → generic text.
- `toProject`: translates backend names and nulls into the existing UI model.

Axios could add interceptors/convenience, but native fetch is sufficient. A runtime schema library (Zod) would catch response drift.

## `getProjects()`

Located in API client; called in `ProjectsSection` mount effect. GET `/api/projects`; expects `ProjectApiResponse[]`, maps each to `Project`. The section initializes with hardcoded `projects`, replaces state on success, and silently keeps fallback on failure. This makes the portfolio resilient but makes outages invisible.

## `getProject(id)`

GETs encoded `/api/projects/{id}` and maps one project. No current component caller was found, so it is available but unused.

## `getSkills()`

Called by `SkillsSection`. Expects flat ordered rows. A `Map` preserves first-seen category order and accumulates UI `{name,level}` entries. On failure the section retains hardcoded `skillsData`.

## `getResearch()`

Called by `InterestsSection`. It narrows each response to the `ResearchInterest` UI contract. On failure hardcoded `researchInterests` remain.

## `submitContact(request)`

Called by `ContactSection.handleSubmit`. Sends POST JSON and expects `ContactResponse`. The component prevents duplicate submission with loading state, clears status, supplies `website: ''`, resets the form on success, and displays a known `PortfolioApiError` message or generic connection error.

## Shape-change consequences

Renaming `techStack` breaks tags unless `ProjectApiResponse/toProject` changes. Changing skill levels can violate the TypeScript union at compile time only if types are updated honestly. Removing error `fieldErrors` still allows message fallback. Runtime malformed “successful” JSON may travel farther because there is no schema validation.

## Debug checklist

Inspect browser Network URL/status/body; verify `VITE_API_BASE_URL`; verify backend port and `FRONTEND_ORIGIN`; call endpoint with curl; check console/backend logs; compare response with API wire type; remember read failures may be visually hidden by fallback.

The browser cannot use repositories/database directly: repository code runs in the JVM, and exposing database credentials/query access to downloaded JavaScript would destroy the security boundary.
