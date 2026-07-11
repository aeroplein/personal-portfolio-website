# 02 File-by-File Deep Guide

This guide covers every meaningful backend file. Repeated JavaBean getters simply return the same-named field; changing their type/name affects DTO mappers and JPA-facing code.

## `PortfolioApplication.java`

Category: entry point. `@SpringBootApplication` combines configuration, auto-configuration and component scanning from the base package. `main(String[])` passes the primary source and CLI arguments to Spring. Called by JVM/Maven; removing it removes the normal executable entry. Safe change: application startup options. Do not move it below a narrower package blindly or components may no longer scan. Test by starting the context.

## Controllers

All four are `@RestController` classes with class-level `@RequestMapping`, a final service field, and constructor injection. `@RestController` means return values become JSON; `@GetMapping`/`@PostMapping` select HTTP operations.

### `ProjectController`

- Purpose: `/api/projects` reads.
- `getProjects()`: no input; calls `ProjectService.findAll`; returns list/200. Removing it causes route 404. Test with GET.
- `getProject(@PathVariable String id)`: binds the final path segment, calls `findById`, returns DTO or allows the service exception to reach advice. Changing the path/type must be mirrored in `getProject` frontend code.

### `SkillController`

`getSkills()` delegates to `SkillService.findAll`. It returns a flat list; grouping is frontend behavior. Safe change: response wrapping only with coordinated client changes.

### `ResearchController`

`getResearchItems()` delegates to `ResearchService.findAll`. It has no filtering/pagination. A query parameter would require controller and service changes.

### `ContactController`

`createContactMessage(@Valid @RequestBody ContactRequest)`: Jackson binds JSON, `@Valid` runs record-component constraints, service saves, and `@ResponseStatus(CREATED)` makes success 201. Without `@Valid`, malformed values reach persistence. Without `@RequestBody`, JSON will not bind as intended. Test valid, invalid and malformed bodies.

## Services

`@Service` registers components. Constructor dependencies are required. `@Transactional(readOnly=true)` gives read services transaction boundaries and optimization intent.

### `ProjectService`

- `findAll()`: repository ordered query → stream → `ProjectResponse.from` → `toList`. Called by controller and test. Replacing ordered query with `findAll()` loses guaranteed display order. Empty table returns `[]`.
- `findById(String)`: repository returns `Optional`; `map` converts a found entity; `orElseThrow` produces a domain-specific 404 path. A nullable return would create ambiguous HTTP behavior. Null or unknown IDs fail lookup.

### `SkillService` and `ResearchService`

Each `findAll()` repeats the ordered-query/manual-mapping pipeline with its own types. Duplication is harmless and clearer than a premature generic service. Their main edge case is an empty list.

### `ContactService`

`save(ContactRequest)` is a write transaction. It trims all text, lowercases email, uses a server-side `Instant`, constructs `ContactMessage`, saves it, then returns acknowledgment/id/time. Validation occurs before this method only when called through the controller; the direct service test can bypass constraints. `toLowerCase()` uses the default locale; `toLowerCase(Locale.ROOT)` is more deterministic. Repository failure rolls back. This method does not send email.

## Repositories

Each interface extends `JpaRepository<Entity,Id>`, inheriting save/find/count/delete APIs. Spring supplies method bodies at runtime.

- `ProjectRepository`: string ID; derived ordered read.
- `SkillRepository`: generated long ID; derived ordered read.
- `ResearchItemRepository`: string ID; derived ordered read.
- `ContactMessageRepository`: generated long ID; inherited operations only.

Renaming `findAllByOrderByDisplayOrderAsc` incorrectly can fail startup because Spring parses property names. Test repository queries in a Spring context.

## Entities

All use `@Entity`, `@Table`, an `@Id`, a protected no-arg constructor required by JPA, a full public construction path and getters. They intentionally have no setters: content is effectively immutable after construction in application code.

### `Project`

Maps `projects`; string slug ID; required title/description/order/role/takeaway/color/category; optional URLs/image/snippet. `techStack` is an eager `@ElementCollection` with `@OrderColumn`, so JPA stores values in a separate collection table and preserves list order. Eager loading prevents mapping outside the repository call from missing tags but may add query cost. The constructor copies the list into `ArrayList`, preventing aliasing. Adding a field requires entity, constructor, getter, DTO mapper, seed, frontend contract/type and migration.

### `Skill`

Generated identity `Long id`; required name/category/level/order. Level is an unconstrained string in the DB even though TypeScript expects three literals. Safer future options are an enum plus constraint.

### `ResearchItem`

String ID; required title/description/icon/order; optional venue/status/url according to column annotations (status is actually not marked non-null). The seed supplies status. DTO exposes all fields; current UI narrows to four.

### `ContactMessage`

Generated identity ID and bounded required name/email/subject/message, plus immutable `createdAt`. DTO validation limits mirror column lengths, which avoids common persistence errors. No website honeypot is stored. There is no retention or read API.

## DTOs

- `ContactRequest`: immutable input record with field constraints and honeypot. Accessors are `name()`, etc.
- `ContactResponse`: acknowledgment only; avoids echoing personal content.
- `ProjectResponse`, `SkillResponse`, `ResearchResponse`: immutable output records; static `from` factories copy entity properties.
- `ApiErrorResponse`: timestamp/status/reason/message/field map shared by advice.

Record accessors and constructor are compiler-generated. Changing component order/type changes JSON and every constructor call.

## Exceptions

`ResourceNotFoundException` extends unchecked `RuntimeException`; its constructor passes the message to `super`. `GlobalExceptionHandler` is detailed in the validation guide. Removing advice falls back to framework error output.

## Configuration

`CorsConfig` and `SeedDataConfig` are detailed in guides 07 and 03. Seed helper `addSkills` parses `"name|level"` pairs, appends ordered entities and returns the next counter. A malformed string causes array access failure at startup; typed seed objects would be safer.

## Test file

`PortfolioApplicationTests` loads the full context and autowires real services/repository. `seededPortfolioContentCanBeRead` asserts fixed counts and one title. `contactMessageIsStored` proves save/id/email normalization. These tests couple to exact seed counts and do not exercise HTTP, validation, errors, CORS or profiles.
