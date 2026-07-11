# Spring Boot Database Decision

## 1. Chosen database

The first Spring Boot version uses an H2 in-memory database for local development.

PostgreSQL support is prepared through the JDBC driver and a separate Spring profile, but PostgreSQL is not required for the first run.

## 2. Why this database

H2 lets the backend demonstrate real JPA repositories, SQL tables, seed data, and stored contact messages without requiring a separate database installation or account.

This keeps the first migration focused on understanding the request flow:

```text
HTTP request -> controller -> service -> repository -> H2
```

The environment already has Java 21 and Maven available, so no Java downgrade is needed.

## 3. Alternatives considered

### PostgreSQL immediately

PostgreSQL is the stronger production choice and is valuable portfolio experience. It was not chosen as the default because connection setup, credentials, and database lifecycle would add avoidable friction before the API itself is understood.

### No database

Returning Java lists would be simpler, but it would not teach repositories or persistent contact storage and would only move hardcoded arrays from TypeScript to Java.

### JSON files

JSON files are easy to inspect but create manual concurrency and write-safety problems for contact messages. JPA with H2 is clearer.

## 4. Tradeoffs

Benefits:

- no separate database server for the first run;
- fast tests;
- H2 console makes rows visible while learning;
- the same JPA interfaces can work with PostgreSQL.

Costs:

- in-memory data resets when the backend stops;
- H2 is not identical to PostgreSQL;
- H2 should not be presented as the production database;
- automatic schema creation is convenient for learning but not a production migration strategy.

## 5. How data is seeded

A Spring `CommandLineRunner` checks whether each content table is empty. If it is, it inserts the current projects, skills, and research items in explicit display order.

The empty-table check prevents duplicate content during one application lifecycle and will also work if a persistent local database is selected later.

## 6. How contact messages are stored

`POST /api/contact` maps a validated `ContactRequest` DTO to a `ContactMessage` entity. The repository inserts it with a generated ID and UTC creation timestamp.

The response confirms storage and returns the new ID and timestamp. It does not expose every stored field and it does not send email.

In the default in-memory H2 profile, messages survive requests but not a backend restart.

## 7. How to switch to PostgreSQL later, if not already using it

1. Start a PostgreSQL database and create a database/user.
2. Set:

   ```powershell
   $env:SPRING_PROFILES_ACTIVE = "postgres"
   $env:DATABASE_URL = "jdbc:postgresql://localhost:5432/portfolio"
   $env:DATABASE_USERNAME = "portfolio"
   $env:DATABASE_PASSWORD = "replace-me"
   ```

3. Run the same Maven command.

The `postgres` profile will use these values. No frontend, controller, service, or repository code should change.

Before a real production launch, add a migration tool such as Flyway and replace automatic schema updates with versioned SQL migrations. That is intentionally deferred from this MVP.
