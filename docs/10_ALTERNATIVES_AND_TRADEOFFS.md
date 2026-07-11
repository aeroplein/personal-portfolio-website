# 10 Alternatives and Tradeoffs

| Decision | Current choice | Alternatives | Tradeoff and opinion |
|---|---|---|---|
| Backend framework | Spring Boot | Express, FastAPI | Spring is heavier but demonstrates typed mainstream Java architecture; defensible if Java learning is a goal. |
| API style | REST | GraphQL, SSR | REST is simplest for five stable operations. |
| Local DB | H2 memory | file H2, PostgreSQL | Excellent disposable learning setup; bad for durable contacts. |
| Production DB | PostgreSQL profile | MySQL, managed CMS | PostgreSQL is a strong choice, but migrations are missing. |
| API model | Entity + DTO | entities directly | DTO boundary is worth the small mapping cost. |
| Mapping | manual static factories | MapStruct, ModelMapper | Manual wins at this scale; MapStruct later, avoid reflective magic. |
| Layers | controller/service/repository | controller→repository | Slightly verbose, but normalization/mapping/errors justify services. |
| Persistence | Spring Data JPA | JDBC/jOOQ/raw SQL | JPA minimizes CRUD code; jOOQ wins only with complex SQL. |
| Validation | annotations | manual/custom validator | Annotations fit independent field rules; custom code for cross-field rules. |
| Errors | global advice | per-controller try/catch | Advice is cleaner and consistent; add selected missing cases. |
| Content initialization | startup seed | migrations/admin panel | Good for demo reset; migrations/admin for real ownership. |
| Authentication | none | admin login, OAuth | Correct while API has no admin/read-contact route; required before management endpoints. |
| Contact action | store in DB | send email, both | Current default H2 storage is ephemeral; email or persistent DB needs explicit privacy/reliability design. |
| Content source | backend plus hardcoded fallback | backend only, static JSON, CMS | Resilient but duplicated/drift-prone. During learning, expose a visible dev error. |
| Build | Maven | Gradle | Maven is explicit and conventional; no reason to switch. |
| DTO syntax | Java records | classes/Lombok | Records are ideal immutable transport values. |
| Config syntax | YAML | properties/env only | YAML profiles are readable; indentation mistakes are the cost. |
| IDs | readable string slugs for content | UUID/numeric | Slugs improve URLs; changing slugs becomes a compatibility event. |
| Tag storage | eager element collection | JSON column/tag entity | Fine for tiny owned string lists; not for searchable shared tags. |
| Schema changes | Hibernate create/update | Flyway/Liquibase | Fine for disposable H2; Flyway is better before persistent deployment. |
| Read failure UX | silent hardcoded fallback | error/empty/retry | Good public resilience, weak debugging truth. Log or display in development. |
| CORS | one exact origin | origin list/proxy | Secure and simple locally; deployment may need a list or same-origin reverse proxy. |

## Is the backend overengineered?

For a static portfolio alone, yes: static data could serve projects/skills/research. For learning Spring and demonstrating a real contact write, the chosen layers are reasonable. The thin services are not a serious smell; adding authentication, GraphQL, microservices, caching or generic base classes now would be.
