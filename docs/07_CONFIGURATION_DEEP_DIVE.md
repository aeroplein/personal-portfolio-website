# 07 Configuration Deep Dive

## `application.yml`

| Config | Meaning | If changed | Alternative |
|---|---|---|---|
| `spring.application.name: portfolio-api` | application identity | affects logs/observability naming | environment override |
| H2 `url` | in-memory DB named `portfolio`; delay close | new name creates a different DB | file H2 or PostgreSQL |
| `driver-class-name: org.h2.Driver` | JDBC driver | mismatch prevents datasource startup | inferred driver |
| `username: sa`, blank password | local H2 credentials | must match connection | secrets/env for nonlocal DB |
| `ddl-auto: create-drop` | build schema at start, drop at stop | data is disposable | `validate` + Flyway |
| `open-in-view: false` | closes persistence context outside service transaction | lazy access in controllers can fail | OSIV true, generally less explicit |
| H2 console enabled at `/h2-console` | browser DB tool | exposes a dev surface | disable outside local |
| `server.port: ${PORT:8081}` | env port with default | frontend base URL must follow | command-line property |
| `allowed-origin: ${FRONTEND_ORIGIN:http://localhost:5173}` | exact browser origin | wrong value causes CORS rejection | property list for multiple origins |
| `on-profile: postgres` | activates second YAML document | requires `postgres` profile | separate profile file |
| PostgreSQL URL/user/password envs | persistent DB connection | bad credentials/URL prevent startup | platform datasource binding |
| PostgreSQL `ddl-auto: update` | Hibernate mutates schema | convenient but unsafe for controlled evolution | Flyway/Liquibase |
| PostgreSQL H2 console false | removes irrelevant tool | enabling gives no PostgreSQL console | database admin client |

Activate PostgreSQL with `SPRING_PROFILES_ACTIVE=postgres`. Defaults are suitable for local learning, not durable production.

## `CorsConfig`

`@Configuration` registers the class. `@Value` injects the one allowed origin. `WebMvcConfigurer.addCorsMappings` applies to `/api/**`, permits GET/POST/OPTIONS, permits only `Content-Type`, and caches preflight for 3600 seconds. No credentials are enabled. Adding authorization later requires permitted headers and a deliberate credential policy.

## Frontend configuration

`VITE_API_BASE_URL` is compiled into browser code and defaults to `http://localhost:8081`; it is not secret. `.env.example` documents configuration. Never place database credentials in `VITE_*`.

## Safe changes / break risks

Port and origin are safe when both deployments agree. Database changes require driver, URL, schema and profile testing. Changing `ddl-auto`, field lengths, table/column names, or active profile can destroy data or fail startup. A production path should add migrations, secrets, disabled H2 console and explicit allowed origins.
