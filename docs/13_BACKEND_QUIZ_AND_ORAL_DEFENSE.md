# 13 Backend Quiz and Oral Defense

Answer aloud before opening the answer cell. There are 80 questions.

## Beginner ownership

| # | Question | Short answer key |
|---|---|---|
| 1 | What five routes exist? | Four GETs: projects, project by ID, skills, research; one POST contact. |
| 2 | What does the backend write? | Contact messages only. |
| 3 | Does contact send email? | No; it validates and stores. |
| 4 | What is the default database? | In-memory H2. |
| 5 | What happens to default data at shutdown? | `create-drop` drops the schema/data. |

## File structure

| 6 | Why is the main class in the base package? | Component scanning reaches all subpackages. |
| 7 | Where are HTTP routes? | `controller/`. |
| 8 | Where are transaction/mapping decisions? | `service/`. |
| 9 | Where are database models? | `model/`. |
| 10 | Where are JSON contracts? | `dto/`. |

## Spring Boot basics

| 11 | What does `@SpringBootApplication` combine? | Configuration, auto-configuration and component scan. |
| 12 | What starts the context? | `SpringApplication.run`. |
| 13 | How are beans discovered? | Scanning annotations and `@Bean` methods. |
| 14 | Why constructor injection? | Explicit required dependencies and easy testing. |

## Controllers

| 15 | What does `@RestController` add? | Controller registration and response-body JSON semantics. |
| 16 | What does class `@RequestMapping` do? | Defines common path prefix. |
| 17 | How is project ID obtained? | `@PathVariable String id`. |
| 18 | Why is contact success 201? | `@ResponseStatus(HttpStatus.CREATED)`. |
| 19 | Why are controllers thin? | HTTP concerns delegate business/persistence behavior. |

## Services

| 20 | What does `ProjectService.findAll` do? | Ordered repository read and entity-to-DTO mapping. |
| 21 | What does `findById` do when absent? | Throws `ResourceNotFoundException`. |
| 22 | What does contact normalize? | Trims fields and lowercases email. |
| 23 | Why server-side `Instant.now()`? | Server owns trustworthy creation time. |
| 24 | Why a write transaction? | Atomic save and rollback on failure. |

## Repositories

| 25 | Who implements repository interfaces? | Spring Data at runtime. |
| 26 | What do generic parameters mean? | Entity type and primary-key type. |
| 27 | How is ordered query created? | Spring parses derived method name. |
| 28 | Why no custom contact method? | Inherited `save/findById` suffice. |
| 29 | What could break after method rename? | Property parsing can fail application startup. |

## Entities

| 30 | Why protected no-arg constructors? | JPA needs an instantiation path. |
| 31 | Why no setters? | Application treats seeded/content state as immutable. |
| 32 | What is `@Entity`? | Marks a JPA-persisted class. |
| 33 | Which IDs are generated? | Skill and ContactMessage long IDs. |
| 34 | Which IDs are strings? | Project and ResearchItem. |

## DTOs

| 35 | Why use records? | Concise immutable transport values. |
| 36 | Why not return entities? | Avoid persistence/API coupling and accidental exposure. |
| 37 | What special field is request-only? | Contact `website` honeypot. |
| 38 | Why not echo contact content? | It is unnecessary personal data exposure. |

## Mapping

| 39 | Where are read entity mappings? | Static `from` factories on response records. |
| 40 | Where is contact request mapping? | `ContactService.save`. |
| 41 | What does `ProjectResponse::from` mean? | Method reference applied per stream element. |
| 42 | Why manual mapping here? | Small, explicit and debuggable. |

## Database

| 43 | How are project tags stored? | JPA element-collection child table. |
| 44 | Why `@OrderColumn`? | Preserve tag list position. |
| 45 | Why is eager loading acceptable/risky? | Tiny list and easy mapping; can cost extra queries/data. |
| 46 | What activates PostgreSQL? | `postgres` Spring profile. |
| 47 | Why is `ddl-auto:update` weak? | It is not controlled/versioned migration history. |

## Validation

| 48 | What triggers record validation? | Controller `@Valid`. |
| 49 | What does `@NotBlank` reject? | Null, empty and whitespace-only. |
| 50 | Does `@Email` verify mailbox ownership? | No. |
| 51 | Why mirror DTO sizes and columns? | Reject bad input before persistence errors. |
| 52 | Can direct service calls bypass validation? | Yes, unless method validation is added. |

## Error handling

| 53 | What handles missing projects? | Advice method for `ResourceNotFoundException`. |
| 54 | What status is malformed JSON? | 400. |
| 55 | Why `putIfAbsent` for field errors? | Keep one first message per field. |
| 56 | Are all 500s in project error shape? | No; no generic handler exists. |

## Configuration

| 57 | What is the default server port? | 8081. |
| 58 | Which env var changes it? | `PORT`. |
| 59 | Is `VITE_API_BASE_URL` secret? | No; it ships to the browser. |
| 60 | Why disable open-in-view? | Keep lazy persistence access inside explicit service transactions. |

## CORS

| 61 | What default origin is allowed? | `http://localhost:5173`. |
| 62 | What paths receive policy? | `/api/**`. |
| 63 | Which methods are allowed? | GET, POST, OPTIONS. |
| 64 | Why can curl work while browser fails? | CORS is browser-enforced. |

## Frontend integration

| 65 | What maps `techStack` to `tags`? | `toProject`. |
| 66 | How are skills grouped? | Frontend `Map` by category. |
| 67 | What happens when read APIs fail? | Hardcoded data remains. |
| 68 | Why is that fallback risky? | It hides outages and permits data drift. |
| 69 | Is `getProject` currently rendered? | No current component caller was found. |

## Design patterns

| 70 | Name four present patterns. | Layering, repository, DTO/manual mapper, global advice. |
| 71 | Is this hexagonal architecture? | No. |
| 72 | What pattern seeds data? | Conditional startup runner. |

## Alternatives

| 73 | When would MapStruct help? | Many/repetitive mappings. |
| 74 | When would GraphQL help? | Complex client-selected graph data, not these five routes. |
| 75 | Better production schema strategy? | Flyway or Liquibase migrations. |

## Debugging

| 76 | First checks for 404? | Method, full URL, controller mapping, then resource existence. |
| 77 | First checks for CORS? | Exact origin and OPTIONS response. |
| 78 | Why inspect Network despite visible cards? | Fallback may conceal backend failure. |

## Interview defense

| 79 | Most honest overengineering answer? | Static reads do not require a backend; it is justified mainly for learning and contact persistence. |
| 80 | What proves ownership? | Tracing flows, predicting blast radius, testing changes, and stating limitations honestly. |
