# 14 Final Ownership Report

## 1–5. What it does and how

The backend serves ordered projects, skills and research; finds one project by slug; and validates/normalizes/stores contact messages. It uses layered Spring MVC → service → Spring Data JPA architecture, DTO/static mapper factories, constructor injection, transactions, global exception advice, declarative validation, profile configuration and conditional seed data. Main flows are documented in guide 04; alternatives in guide 10.

## 6. Clean

Small controllers, final constructor dependencies, immutable DTO records, no entity serialization, deterministic display ordering, explicit read/write transactions, structured 400/404 responses, exact CORS origin and a PostgreSQL profile.

## 7. Weak

Only two integration tests; no HTTP/validation/CORS/profile coverage; no migrations; contact persistence is disposable under default H2; fallback hides failures; duplicated seed/frontend content; no operational logging or contact abuse/retention plan.

## 8. Overengineered

Database-backed read content is more infrastructure than three static lists need. Separate thin read services add ceremony, though they preserve a consistent, teachable boundary.

## 9. Underengineered

Durable schema evolution, failure visibility, tests and contact-message operational policy. Authentication is not missing until a protected management surface exists.

## 10–11. Safe and unsafe changes

Safe with tests: content rows, validation messages/bounds compatible with columns, DTO additions coordinated with frontend, new read queries and environment configuration. Do not blindly rename IDs/routes/JSON fields, alter table/column/schema policy, expose contact data, enable broad CORS, add setters, or switch databases with real data.

## 12. Learn next

MockMvc testing, JPA entity lifecycle/transactions, SQL generated for element collections, Flyway, runtime JSON validation, PostgreSQL integration testing, and basic abuse/privacy design.

## 13. Final verdict

Yes, the backend is understandable without refactoring. Its architecture is conventional and the codebase is small. Refactoring is not the ownership bottleneck; proving behavior with stronger tests and resolving deliberate demo shortcuts is.

Ownership means being able to explain every endpoint's success/error call chain, each annotation's runtime role, entity-vs-DTO boundaries, transaction and repository generation, both database profiles, frontend conversion/fallback, and the blast radius of a field or contract change.
