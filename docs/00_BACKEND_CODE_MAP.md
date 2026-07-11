# 00 Backend Code Map

> Source of truth: `backend/` and the frontend callers in `src/`, inspected 2026-07-09.

## 1–6. Root, versions, build, packages, entry point

- Root: `backend/`
- Java: 21 (`pom.xml`)
- Spring Boot: 4.1.0 parent
- Build: Maven; run from `backend/` with `mvnw` if a wrapper is later added, otherwise `mvn`.
- Base package: `com.pelinportfolio.api`.
- Entry point: `PortfolioApplication.main`, which delegates bootstrapping to `SpringApplication.run`.

```txt
controller → service → repository → JPA/Hibernate → H2 or PostgreSQL
                   ↘ DTO mapping
config      seed data, CORS
exception   shared HTTP error translation
model       persisted JPA entities
dto         public request/response contracts
```

## 7–16. File inventory

| Category | Files | Responsibility |
|---|---|---|
| Controllers | `ProjectController`, `SkillController`, `ResearchController`, `ContactController` | Bind HTTP routes and delegate |
| Services | `ProjectService`, `SkillService`, `ResearchService`, `ContactService` | Transactions, mapping, lookup failure, input normalization |
| Repositories | `ProjectRepository`, `SkillRepository`, `ResearchItemRepository`, `ContactMessageRepository` | Spring Data persistence |
| Entities | `Project`, `Skill`, `ResearchItem`, `ContactMessage` | Relational persistence model |
| DTOs | `ProjectResponse`, `SkillResponse`, `ResearchResponse`, `ContactRequest`, `ContactResponse`, `ApiErrorResponse` | JSON contracts |
| Config | `CorsConfig`, `SeedDataConfig` | Cross-origin policy and startup seed |
| Exceptions | `ResourceNotFoundException`, `GlobalExceptionHandler` | 404/400 responses |
| Tests | `PortfolioApplicationTests` | Two Spring-context integration tests |
| Config files | `pom.xml`, `application.yml` | Dependencies and two database profiles |

There are no authentication classes, admin endpoints, update/delete endpoints, migrations, email sender, or dedicated controller tests. I cannot confirm deployment infrastructure from the current code.

## 17. API endpoints found

| Method | Path | Controller method | Result |
|---|---|---|---|
| GET | `/api/projects` | `getProjects()` | ordered project DTO list |
| GET | `/api/projects/{id}` | `getProject(String)` | one project or 404 |
| GET | `/api/skills` | `getSkills()` | ordered flat skill DTO list |
| GET | `/api/research` | `getResearchItems()` | ordered research DTO list |
| POST | `/api/contact` | `createContactMessage(ContactRequest)` | validates and stores a message; 201 |

## 18. Dependencies

### `spring-boot-starter-web`

Provides Spring MVC, embedded HTTP server, JSON serialization, controller annotations and `ResponseEntity`. Controllers, CORS and the exception advice use it. Without it the REST API cannot start. WebFlux is the reactive alternative, but adds no value for this small blocking JPA app.

### `spring-boot-starter-data-jpa`

Provides JPA/Hibernate, repositories and transaction integration. Every entity/repository and each `@Transactional` service depends on it. JDBC Template or jOOQ would give more SQL control at the cost of more persistence code.

### `spring-boot-starter-validation`

Provides Jakarta Bean Validation used by `ContactRequest` and `@Valid`. Without it those annotation constraints would not reject bad requests. Manual validation is possible but repetitive.

### `h2` (runtime)

In-memory local/default database. It makes startup disposable and seedable. Removing it breaks the default datasource. PostgreSQL is the realistic persistent alternative.

### `postgresql` (runtime)

JDBC driver for the `postgres` profile. Removing it breaks that profile but not default H2. Another database needs its matching driver and SQL compatibility review.

### `spring-boot-starter-test` (test)

JUnit, AssertJ and Spring testing support used by `PortfolioApplicationTests`. Removing it breaks test compilation. Narrow Mockito or MVC slice tests can supplement it, not replace all integration coverage.

### `spring-boot-maven-plugin`

Packages/runs the application as a Spring Boot executable artifact. It is a build plugin, not application code. Gradle's Boot plugin is the main alternative.

## 19. What looks clean

Constructor injection, immutable response records, DTO/entity separation, ordered repository queries, explicit CORS origin, transaction boundaries, consistent validation errors, and profile-based database configuration are appropriate.

## 20. What looks risky

- H2 `create-drop` destroys all data at shutdown; contact messages are not durable by default.
- PostgreSQL uses `ddl-auto: update`, not versioned migrations.
- Seed logic checks whole-table counts, so partial datasets are not repaired.
- There is no rate limiting, spam control beyond a honeypot, authentication, or contact-message access policy.
- Only two integration tests exist; validation, HTTP status, CORS, 404 body, malformed JSON and PostgreSQL are untested.
- Backend and `src/data.ts` duplicate content; the UI fallback can hide backend failures and drift.
- Spring Boot `4.1.0` is declared. Build verification, not assumption, must establish whether it is resolvable in the current environment.
