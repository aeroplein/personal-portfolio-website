# Portfolio Codebase Configuration Summary (SUM.MD)

This document provides a clear, high-level summary of all the configuration systems used in this migrated React + Spring Boot portfolio codebase.

---

## 1. Maven Dependency Configuration: `backend/pom.xml`
The **Project Object Model (POM)** file is the dependency manager for Java, replacing `package.json` in Node.
* **Java Version**: Explicitly set to Java 21 (`<java.version>21</java.version>`).
* **Starters**: Uses Spring Boot starter packs that automatically package related libraries:
  * `spring-boot-starter-web`: Configures routing, REST capabilities, and the Tomcat server.
  * `spring-boot-starter-data-jpa`: Links Hibernate and JPA for SQL database mappings.
  * `spring-boot-starter-validation`: Used for verifying payload inputs.
* **Database Drivers**: Imports both H2 (in-memory dev) and PostgreSQL (production).

---

## 2. Spring Boot Properties: `backend/src/main/resources/application.yml`
This replaces `.env` files for backend configuration. It defines two execution environments (profiles) separated by `---`:

### A. Default Profile (Local Development with H2)
* **Port**: Runs on `8081` (can override with `PORT` env var).
* **Database**: Runs an in-memory SQL database named `portfolio`.
  * URL: `jdbc:h2:mem:portfolio`
* **Hibernate Strategy**: `ddl-auto: create-drop` (the database tables are created from scratch when you start the backend, and deleted when you stop it).
* **H2 Console**: Enabled at `/h2-console` so you can view database tables in the browser.
* **CORS**: Points to the React dev server: `http://localhost:5173`.

### B. PostgreSQL Profile (`postgres`)
* Enabled by running the app with `-Dspring.profiles.active=postgres`.
* **Database**: Connects to a persistent Postgres server (default `jdbc:postgresql://localhost:5432/portfolio`).
* **Hibernate Strategy**: `ddl-auto: update` (updates the existing database schema without wiping out your data).
* **H2 Console**: Disabled (`enabled: false`) for security.

---

## 3. CORS Configuration: `CorsConfig.java`
Located at: `backend/src/main/java/com/pelinportfolio/api/config/CorsConfig.java`
* **Why it matters**: Web browsers block frontends (running on port `5173`) from reading API data from backends (running on port `8081`) unless the backend explicitly permits it.
* **What it does**: Reads the `allowed-origin` value from `application.yml` and instructs the server to attach CORS headers allowing `GET`, `POST`, and `OPTIONS` requests from your frontend to `/api/**`.

---

## 4. Initial Seed Data Configuration: `SeedDataConfig.java`
Located at: `backend/src/main/java/com/pelinportfolio/api/config/SeedDataConfig.java`
* **Why it matters**: Since your H2 database starts completely empty, you need a way to fill it with your portfolio data (Projects, Skills, Research) so you don't have a blank UI.
* **What it does**: Implements a `CommandLineRunner` bean. When the application successfully boots, it runs a check: if the database contains 0 items for a category, it inserts predefined lists of:
  * **Projects** (e.g., *FloraStream Engine*, *AuraScript Compiler*, etc.)
  * **Skills** (divided into categories like Languages, Databases, Frontend)
  * **Research Items** (e.g., *Developer Ergonomics*, *Cache Policies*)

---

## 5. Frontend Development Server: `vite.config.ts`
Located in the project root folder.
* **What it does**: Configures the React + TypeScript frontend build environment using Vite.
* **Tailwind Integration**: Pulls in the `@tailwindcss/vite` plugin to enable modern styling pipelines.
* **Dev Server**: Standardizes the local UI environment on `http://localhost:5173`.

---

## 6. Critical Spring Boot & JPA Annotations Guide
Annotations tell Spring how to treat a class, interface, method, or parameter without writing hundreds of lines of configuration.

### Core Framework Annotations
* **`@SpringBootApplication`**: Configures the class containing your `main` method as the starting point of the app. Enables auto-configuration and package component scanning.
* **`@Configuration`**: Applied to classes (`CorsConfig`, `SeedDataConfig`) that define settings or generate Custom Spring Beans.
* **`@Bean`**: Placed on methods inside `@Configuration` classes. Tells Spring to manage the returned object (like `CommandLineRunner` in `SeedDataConfig`) as a reusable component.
* **`@Value("${path}")`**: Injects setting values from `application.yml` directly into variables at startup.

### Web Controller Annotations (Web Tier)
* **`@RestController`**: Marks a class as an API Controller, instructing Spring that all methods return objects that should be auto-serialized into JSON payloads.
* **`@RequestMapping("/path")`**: Sets the base URL path for all endpoints in a controller.
* **`@GetMapping` / `@PostMapping`**: Maps GET/POST requests to specific Java methods.
* **`@PathVariable`**: Maps a dynamic URL segment (e.g. `/api/projects/{id}`) to a method parameter.
* **`@RequestBody`**: Instructs Spring to read the incoming JSON request body and map it to a Java object/DTO.
* **`@ResponseStatus(HttpStatus.CREATED)`**: Enforces a specific HTTP status code (like `201 Created` for successful POSTs) instead of the default `200 OK`.

### Service & Business Logic Annotations (Service Tier)
* **`@Service`**: Marks a class as a Service Bean. This registers it in the Spring Context so controllers can inject and use it.
* **`@Transactional`**: Wraps database operations in a transaction. If a method completes successfully, database changes are committed. If an error occurs, changes are rolled back.
* **`@Valid`**: Tells Spring to validate the incoming parameters (defined in DTO annotations like `@NotBlank`) before running the method.

### Database JPA Entity Annotations (Data Tier)
* **`@Entity`**: Marks a Java class as a representation of a database table (e.g. `Project` represents the `projects` table).
* **`@Table(name = "name")`**: Tells Hibernate the name of the database table to map the class to.
* **`@Id`**: Specifies which variable is the primary key of the database table.
* **`@Column`**: Configures database column details, such as `nullable = false` (cannot be null) or `length = 3000`.
* **`@ElementCollection`**: Maps simple lists (like lists of strings representing tech stack items) into a separate join table automatically.
* **`@OrderColumn`**: Keeps track of the index order of items inside a list collection.

### Global Exception Handler Annotations (Rescue Team)
* **`@RestControllerAdvice`**: Marks a class as a global "safety net." If any of your controller endpoints throw an error, they don't crash the server. Instead, they get routed here to return a clean error response to the client.
* **`@ExceptionHandler(ExceptionClass.class)`**: Tells Spring: *"If this specific exception is thrown anywhere, intercept it and run this method to handle it."*

### Field Validation Annotations (DTO Security Guards)
* **`@NotBlank`**: Ensures a string is not null, not empty `""`, and not just empty spaces `"   "`.
* **`@Size(min = X, max = Y)`**: Restricts the length of the string to be between X and Y characters.
* **`@Email`**: Checks if the input matches a proper email format (e.g. `user@example.com`).
