# 05 Endpoint Deep Dive

Base URL is `http://localhost:8081` by default. Set `VITE_API_BASE_URL` for the frontend and `PORT` for the server independently.

## GET `/api/projects`

- Trigger: `ProjectsSection` mounts.
- Controller/service/repository: `getProjects → findAll → findAllByOrderByDisplayOrderAsc`.
- Request: no body or parameters.
- Database: ordered select; `techStack` is loaded eagerly from an element-collection table.
- Response: `ProjectResponse[]`, 200.
- UI failure: catches the error and retains hardcoded `projects`.
- Test: `curl http://localhost:8081/api/projects`.
- Debug: check server, base URL, CORS origin, network response, then SQL/seed logs.
- Alternative: pagination is unnecessary for three rows.

## GET `/api/projects/{id}`

- Trigger: no current component caller found; `getProject(id)` is available.
- Input: path string; frontend URL-encodes it.
- Flow: `getProject → findById → JpaRepository.findById`.
- Success: one `ProjectResponse`, 200.
- Failure: `ResourceNotFoundException` becomes structured 404.
- Test: `curl http://localhost:8081/api/projects/florastream`.
- Alternative: UUID/numeric IDs are common, but stable slugs are readable here.

## GET `/api/skills`

- Trigger: `SkillsSection` mounts.
- Flow: `getSkills → findAll → ordered repository method`.
- Response: flat `SkillResponse[]`; frontend groups by category.
- Failure: UI keeps hardcoded `skillsData`.
- Test: `curl http://localhost:8081/api/skills`.
- Alternative: backend could return grouped categories, reducing frontend work but making the API more presentation-specific.

## GET `/api/research`

- Trigger: `InterestsSection` mounts.
- Response: ordered `ResearchResponse[]`. Frontend currently uses only id/title/description/iconName.
- Failure: UI retains hardcoded `researchInterests`.
- Test: `curl http://localhost:8081/api/research`.
- Alternative: omit unused fields from this client-specific contract, or keep them for future consumers as currently done.

## POST `/api/contact`

- Trigger: contact form submit.
- Body: `{name,email,subject,message,website}`; `website` must be empty.
- Validation: `@Valid` plus `@NotBlank`, `@Email`, and `@Size`.
- Database: insert normalized values and server timestamp into `contact_messages`.
- Response: 201 `{"ok":true,"message":"...","id":1,"createdAt":"..."}`.
- Errors: validation/malformed JSON produce 400; network and unknown server failures become the frontend's generic message.
- Test:

```bash
curl -i -X POST http://localhost:8081/api/contact -H "Content-Type: application/json" -d "{\"name\":\"Ada Lovelace\",\"email\":\"ada@example.com\",\"subject\":\"Hello\",\"message\":\"A sufficiently long message.\",\"website\":\"\"}"
```

- Important truth: it stores a message; it does not send email.
- Debug: inspect fieldErrors, confirm JSON header/body, then repository/database.
- Alternative: email-only avoids stored personal data; database storage enables an inbox but needs retention/access controls.

## Why REST

HTTP verbs, paths, statuses and JSON fit the small resource-oriented client. GraphQL adds schema/runtime complexity; server-rendered pages would combine UI/server deployment; static JSON or hardcoded data cannot accept contact writes; a CMS could replace custom content endpoints. Browser code must not connect directly to a database because credentials and unrestricted query capability would be exposed.
