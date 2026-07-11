# 03 Line-by-Line Important Files

This guide groups repeated boilerplate, then calls out every behavior-bearing line. Exact source remains in `backend/src/main`.

## Main application

| Code | Explanation | Why it matters | Alternative |
|---|---|---|---|
| `@SpringBootApplication` | enables configuration, scanning and auto-config | discovers all project components | three separate annotations |
| `public static void main(String[] args)` | JVM entry point | makes app executable | servlet deployment |
| `SpringApplication.run(PortfolioApplication.class,args)` | builds context and server | starts the app | custom builder |

## Controller pattern

```java
@RestController
@RequestMapping("/api/projects")
public class ProjectController {
  private final ProjectService projectService;
  public ProjectController(ProjectService projectService) { this.projectService = projectService; }
}
```

| Code | Explanation | Why | Alternative |
|---|---|---|---|
| `@RestController` | MVC controller + JSON body semantics | no view rendering | `@Controller` + `@ResponseBody` |
| `@RequestMapping(...)` | common route prefix | keeps method paths short | full paths per method |
| `private final ...` | immutable dependency reference | required collaboration is explicit | field injection |
| constructor assignment | Spring injects one matching bean | testable wiring | Lombok constructor |

This pattern repeats in all controllers/services.

| Endpoint code | Exact effect | Change consequence |
|---|---|---|
| `@GetMapping` | GET at class path | other verbs return 405 |
| `@GetMapping("/{id}")` | GET with one segment | route contract changes if renamed |
| `@PathVariable String id` | binds `{id}` | name inference/type conversion must succeed |
| `@PostMapping` | POST at `/api/contact` | selects write route |
| `@ResponseStatus(CREATED)` | success is 201 | removing defaults to 200 |
| `@Valid @RequestBody ContactRequest request` | JSON bind, then validate | order gates service execution |
| `return service...` | delegates and serializes result | exceptions propagate to advice |

## Read-service block

```java
return projectRepository.findAllByOrderByDisplayOrderAsc()
    .stream()
    .map(ProjectResponse::from)
    .toList();
```

The repository call requests database ordering. `stream()` creates a mapping pipeline. The method reference invokes the static factory per entity. `toList()` materializes response DTOs. A loop is equally valid; returning entities would leak persistence shape.

```java
return projectRepository.findById(id)
    .map(ProjectResponse::from)
    .orElseThrow(() -> new ResourceNotFoundException(...));
```

`findById` returns `Optional<Project>`. Mapping preserves empty/found state. `orElseThrow` lazily constructs the 404-driving exception only when absent.

## Contact write block

The five request accessors read record components. `trim()` removes edge whitespace; email `toLowerCase()` normalizes case; `Instant.now()` makes time server-owned. `save` schedules/executes persistence and returns the managed entity with generated ID. The response deliberately includes no submitted content.

## Repository interfaces

`JpaRepository<Project,String>` declares entity and ID types; the analogous pairs are `Skill,Long`, `ResearchItem,String`, `ContactMessage,Long`. `findAllByOrderByDisplayOrderAsc` is parsed as “find all, order by displayOrder ascending”; no handwritten body exists.

## Entity/JPA annotations

| Code | Meaning | Important consequence |
|---|---|---|
| `@Entity` | JPA-managed class | requires identifiable entity and constructibility |
| `@Table(name=...)` | explicit table | rename needs schema migration |
| `@Id` | primary key | identity/equality of rows |
| `@GeneratedValue(IDENTITY)` | DB-generated numeric ID | available after save |
| `@Column(nullable=false,length=n)` | schema constraint | not request validation by itself |
| `updatable=false` | Hibernate excludes later updates | protects timestamp in normal ORM writes |
| `@ElementCollection(EAGER)` | owned list in child table, loaded immediately | extra table/query and no independent identity |
| `@OrderColumn` | persists list position | preserves tech-stack order |
| protected no-arg constructor | JPA instantiation hook | removing may break ORM |

Constructors assign arguments to fields; `new ArrayList<>(techStack)` creates a defensive mutable copy. All getters are direct field returns.

## DTO mapping

Each `public record` declares immutable data and generated constructor/accessors/equality. `from(Entity)` calls every relevant getter in JSON component order. Missing a newly added field here means the database has it but API does not.

## Exception handler blocks

`@RestControllerAdvice` makes methods global for REST controllers. Each `@ExceptionHandler(X.class)` selects an exception. Validation iterates binding field errors into insertion-ordered `LinkedHashMap`; `putIfAbsent` keeps the first message per field. `buildResponse` stamps `Instant.now`, numeric status, reason phrase, message and fields, then `ResponseEntity.status(status).body(body)` controls status and JSON.

## CORS block

`addMapping("/api/**")` limits policy scope. `allowedOrigins(allowedOrigin)` is exact-origin matching. Methods are GET/POST/OPTIONS; header is Content-Type; `maxAge(3600)` lets browsers cache preflight permission.

## Seed block

`@Bean CommandLineRunner` registers post-startup work. Each `count()==0` independently gates `saveAll`. `List.of` makes seed lists fixed; constructors build entities. `addSkills` splits at the first literal pipe (`"\\|"`, limit 2), increments display order, and returns the next value. It is concise but stringly typed.

## Validation records

`@NotBlank` rejects null, empty and whitespace-only strings. `@Email` checks email syntax but not mailbox existence. `@Size` enforces character-count bounds; on `website`, `max=0` is a bot honeypot. These run because controller uses `@Valid`.
