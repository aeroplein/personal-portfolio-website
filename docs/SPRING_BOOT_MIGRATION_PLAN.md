# Spring Boot Migration Plan

## 1. Why migrate to Spring Boot?

The migration gives the portfolio a Java backend that demonstrates REST APIs, validation, persistence, and a clear request flow.

The useful interview story is not "Spring is more scalable." It is: the current Express server only sends contact email, while portfolio content lives inside the React bundle. Spring Boot will own project, skill, and research data behind REST endpoints and will persist validated contact messages.

## 2. What the new backend will do

- Return all projects and one project by ID.
- Return skills in a simple flat list.
- Return research items.
- Validate and store contact messages.
- Seed the existing portfolio content into H2 at startup.
- Allow the local Vite frontend origin through explicit CORS configuration.
- Return consistent JSON errors for missing records and invalid requests.

## 3. What the new backend will NOT do yet

- Authentication, authorization, JWT, roles, or an admin panel.
- A CMS or content-editing UI.
- File uploads.
- Email sending.
- Analytics or dashboards.
- Database migration tooling.
- Production hosting configuration.

These would make the first learning version harder to understand without helping the current portfolio behavior.

## 4. Proposed API endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/api/projects` | Return projects in display order |
| `GET` | `/api/projects/{id}` | Return one project or a 404 error |
| `GET` | `/api/skills` | Return skills by category and display order |
| `GET` | `/api/research` | Return research items in display order |
| `POST` | `/api/contact` | Validate and save a contact message |

No optional profile endpoint is needed because the current profile content does not require backend ownership.

## 5. Proposed folder structure

```text
backend/
  pom.xml
  src/main/java/com/pelinportfolio/api/
    PortfolioApplication.java
    config/
      CorsConfig.java
      SeedDataConfig.java
    controller/
      ProjectController.java
      SkillController.java
      ResearchController.java
      ContactController.java
    service/
      ProjectService.java
      SkillService.java
      ResearchService.java
      ContactService.java
    dto/
      ProjectResponse.java
      SkillResponse.java
      ResearchResponse.java
      ContactRequest.java
      ContactResponse.java
      ApiErrorResponse.java
    model/
      Project.java
      Skill.java
      ResearchItem.java
      ContactMessage.java
    repository/
      ProjectRepository.java
      SkillRepository.java
      ResearchItemRepository.java
      ContactMessageRepository.java
    exception/
      ResourceNotFoundException.java
      GlobalExceptionHandler.java
  src/main/resources/
    application.yml
  src/test/java/com/pelinportfolio/api/
```

Layer responsibilities:

- **Controller:** translates HTTP requests into Java method calls and chooses the HTTP response.
- **Service:** contains the application operation, such as finding a project or saving a message.
- **Repository:** uses Spring Data JPA to read and write database rows.
- **Model/Entity:** describes how Java objects are stored in database tables.
- **DTO:** describes exactly what JSON enters or leaves the API.
- **Config:** holds cross-cutting setup such as CORS and seed data.
- **Exception:** converts expected failures into consistent API errors.

## 6. Data model plan

The requested example fields are the starting point, but the project and research models will retain extra fields already used by the UI.

- `Project`: string ID, title, description, tech stack, GitHub/live links, featured flag, display order, plus current role, takeaway, card color, category, and code snippet.
- `Skill`: generated numeric ID, name, category, level, display order.
- `ResearchItem`: string ID, title, description, optional venue/status/URL, display order, plus the current icon name.
- `ContactMessage`: generated numeric ID, name, email, subject, message, and creation timestamp.

DTOs will copy only intentional API fields from these entities.

## 7. Database choice

Use H2 in-memory mode for the first local version and include the PostgreSQL JDBC driver plus a separate `postgres` Spring profile.

H2 removes setup friction while learning. PostgreSQL can later be selected with environment variables without changing controllers, services, repositories, entities, or frontend calls.

## 8. Frontend integration plan

1. Add `VITE_API_BASE_URL`, defaulting to `http://localhost:8081`.
2. Add `src/api/portfolioApi.ts` with typed functions for the five endpoints.
3. Load projects from the API and fall back to the existing static array when the backend is unavailable.
4. Load flat skills and group them into the UI's existing category shape; retain the static fallback.
5. Load research data and retain the static fallback.
6. Send contact form data, including the new subject field, to Spring Boot.
7. Change success copy from "sent to inbox" to "stored successfully."

The static arrays are deliberately not deleted in this pass. They make rollback immediate and keep the page readable if the learning backend is stopped.

## 9. Migration steps

1. Record the current architecture and risks.
2. Record the migration and database decisions.
3. Scaffold a Java 21 Maven Spring Boot application in `backend/`.
4. Add entities, repositories, DTOs, services, controllers, validation, error handling, CORS, and seed data.
5. Add focused controller integration tests.
6. Build and test the backend.
7. Add the typed frontend API client.
8. Migrate projects, then skills, then research, keeping static fallback data.
9. Migrate the contact request and its truthful UI copy.
10. Build/type-check the frontend.
11. Manually exercise the running APIs and document the result.
12. Keep the old Express backend for rollback; remove it only in a later cleanup.

## 10. Rollback plan

The old backend and static arrays remain untouched.

To roll back display data, remove the API-loading hooks from the three sections so they import and use `src/data.ts` directly again.

To roll back contact behavior, restore the relative `/api/contact` call and run `npm run dev`, which still starts `server.ts`.

No destructive data migration occurs because the first Spring database is independent H2 storage.

## 11. What I should understand before each step

- **Before entities:** an entity maps a Java object to a database table.
- **Before repositories:** Spring Data creates common query implementations from repository interfaces.
- **Before services:** a service keeps application decisions out of HTTP-specific controller code.
- **Before DTOs:** an API contract and a database table have different responsibilities.
- **Before controllers:** HTTP method, route, request JSON, response JSON, and status code form one endpoint contract.
- **Before validation:** browser checks improve usability; backend checks protect stored data.
- **Before CORS:** different ports are different origins even on the same computer.
- **Before seed data:** seed code is what initially replaces the hardcoded arrays as the backend's data source.
- **Before frontend integration:** asynchronous API data has loading/failure states that static imports do not.
- **Before PostgreSQL:** JPA reduces application-code changes, but database configuration and schema behavior still need production decisions.
