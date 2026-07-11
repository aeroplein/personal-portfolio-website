# Spring Boot Backend Guide

## 1. Application entry point

`PortfolioApplication` contains `main`. `SpringApplication.run` starts Spring's application context and the embedded Tomcat web server.

`@SpringBootApplication` enables configuration, component scanning, and Boot's automatic setup.

## 2. Controllers

- `ProjectController`: `GET /api/projects` and `GET /api/projects/{id}`.
- `SkillController`: `GET /api/skills`.
- `ResearchController`: `GET /api/research`.
- `ContactController`: validated `POST /api/contact`.

Controllers are intentionally thin. They deal with routes and HTTP status, then call services.

## 3. Services

- `ProjectService`: ordered project reads and missing-project behavior.
- `SkillService`: ordered skill reads.
- `ResearchService`: ordered research reads.
- `ContactService`: trims, normalizes, creates, and saves a contact entity.

`@Transactional(readOnly = true)` marks read operations. Contact saving uses a write transaction.

## 4. Repositories

Each repository extends `JpaRepository<Entity, IdType>`.

Spring Data implements common methods such as `save` and `findById`. Method names such as `findAllByOrderByDisplayOrderAsc` describe a query that Spring generates.

## 5. Entities

Entities live in `model/` and use `jakarta.persistence` annotations:

- `@Entity`: managed database type;
- `@Table`: table name;
- `@Id`: primary key;
- `@GeneratedValue`: database-generated numeric ID;
- `@Column`: constraints such as nullable and maximum length;
- `@ElementCollection`: ordered project technology strings.

Protected no-argument constructors exist because JPA needs them. Public constructors make seed/service creation explicit. Lombok was not added, so the Java remains visible and teachable.

## 6. DTOs

Response records have `from(entity)` mapping methods. The frontend sees DTO JSON, not JPA objects.

Request DTO annotations express contact rules next to the accepted fields.

## 7. Validation

`@Valid` tells Spring to apply `ContactRequest` constraints before calling the service.

- name: 2-80 characters;
- valid email: at most 254 characters;
- subject: 3-150 characters;
- message: 10-3000 characters;
- honeypot `website`: must be empty.

Frontend validation helps the visitor. Backend validation is authoritative because anyone can call the API without using the form.

## 8. Error handling

`GlobalExceptionHandler` converts:

- missing projects to `404`;
- invalid DTO fields to `400` plus `fieldErrors`;
- malformed JSON to `400`.

This gives the API a predictable error shape instead of framework stack traces.

## 9. CORS configuration

`CorsConfig` allows GET, POST, and OPTIONS for `/api/**` from one configured origin.

The default is `http://localhost:5173`. Set `FRONTEND_ORIGIN` for another deployment. A wildcard is avoided because a production API should name the frontend allowed to call it.

## 10. Seed data

`SeedDataConfig` runs after startup. It only inserts a content type when its table is empty.

The seed values mirror `src/data.ts`. This makes the backend the live source while the old arrays remain a rollback fallback.

## 11. API request lifecycle

For `GET /api/projects/florastream`:

```text
Tomcat receives GET
  -> ProjectController.getProject("florastream")
  -> ProjectService.findById(...)
  -> ProjectRepository.findById(...)
  -> H2 SELECT
  -> Project entity
  -> ProjectResponse DTO
  -> Spring serializes DTO to JSON
```

For contact, the same path includes DTO validation and a database insert.
