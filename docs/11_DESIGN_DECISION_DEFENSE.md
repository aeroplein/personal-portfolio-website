# 11 Design Decision Defense

**Why Spring Boot?** I wanted a typed Java backend and a conventional ecosystem for REST, validation and persistence. It is more machinery than static content requires, so its value is learning and the contact workflow.

**Why does a portfolio need a backend?** It does not strictly need one. Here it centralizes content and accepts validated contact messages. Static content would be simpler.

**Is this overengineering?** The read API is arguably overengineering for three projects, but the architecture is deliberately small and educational. Microservices or GraphQL would cross the line.

**Why REST?** Five resource-style operations map cleanly to HTTP methods, paths, statuses and JSON.

**Why controllers/services/repositories?** Controllers bind HTTP, services own transactions/mapping/normalization, and repositories own persistence. The seams make changes local, at the cost of extra classes.

**Why DTOs and not entities?** DTOs keep API contracts separate from JPA and prevent accidental field exposure. Manual mapping is visible and manageable here.

**Why validation annotations?** The contact rules are independent field constraints, so declarative validation gives consistent 400 errors with little code.

**Why global exception handling?** It produces one intentional error shape rather than scattered try/catch or framework-dependent bodies.

**Why H2? Why not PostgreSQL immediately?** H2 makes local startup disposable. PostgreSQL is already profile-ready, but persistent use should add migrations before it becomes the default.

**Why no authentication/admin panel?** There are no management or contact-read endpoints. Adding auth without a protected capability would be complexity without benefit.

**Why no email sending?** Current code stores messages only. Email would add provider credentials, delivery failure/retry and privacy choices. It is a valid future adapter, not something to claim exists.

**Why this folder structure?** It is package-by-layer, immediately recognizable for a small Spring app. Feature packages become useful when the domain grows.

**Why this endpoint design?** Plural nouns represent collections, one slug selects a project, and POST contact creates a stored message.

**Why is mapping in services/DTO factories?** Services decide what leaves the persistence layer; factories keep field copying beside the target contract.

**Why does config exist?** It separates deploy-specific port/origin/database values from compiled code and provides a PostgreSQL profile.

**What would I improve first?** Add HTTP/validation tests, Flyway before durable PostgreSQL, visible dev API failure, and a conscious contact retention/email decision.

**What would I remove?** Nothing urgently. I might remove unused response fields or `getProject` only if the intended detail view is abandoned.

**Weakest technical part?** Contact data is ephemeral by default and lacks abuse/retention controls; test coverage is narrow.

**What looks AI-generated?** Symmetrical layer files, exhaustive DTO fields, floral sample content, and broad docs may have tool assistance. Code style alone cannot prove authorship. I should claim only what I can trace and modify.

**What do I understand?** I can trace browser → controller → service → repository → database → DTO → browser, explain validation/error paths, and predict coordinated changes. That—not typing every line unaided—is ownership.
