# 06 Entity, DTO and Mapping Deep Dive

## Entity: `Project`

Represents one portfolio project in `projects`; tags live in an automatically named collection table.

| Field | Type | Constraint | Meaning / frontend |
|---|---|---|---|
| id | String | `@Id` | stable slug/key |
| title | String | non-null | card title |
| description | String | non-null, 3000 | summary |
| techStack | List<String> | eager element collection, ordered | mapped to frontend `tags` |
| githubUrl/liveUrl/imageUrl | String | nullable | links/image; image currently not in frontend API type |
| featured | boolean | primitive | exposed but current client ignores it |
| displayOrder | int | non-null | database ordering; client ignores |
| role/takeaway/cardColor/category | String | non-null | card content/style |
| snippet | String | max 5000, nullable | displayed code |

Constructor supplies all state and defensively copies tags. Repository uses string ID. `ProjectResponse.from` maps every entity field, but `toProject` deliberately renames `techStack/githubUrl/liveUrl` to `tags/github/demo` and drops `imageUrl`, `featured`, `displayOrder`.

## Entity: `Skill`

Generated `Long` ID plus name/category/level/displayOrder. All content columns are required. `SkillResponse.from` is one-to-one. Frontend discards ID/order after using server order and groups rows by category. Level should ideally become a Java enum if write paths appear.

## Entity: `ResearchItem`

String ID; title, description, iconName and order required; venue/status/url potentially nullable. Response maps all fields. Frontend keeps only four fields, so response shape has room for a future detailed research view.

## Entity: `ContactMessage`

Stores normalized name/email/subject/message and server creation time. It never stores the honeypot. `ContactRequest` is separate because it contains validation and `website`; `ContactResponse` is separate because echoing personal message data is unnecessary.

## Why DTOs instead of entities

They prevent accidental lazy/JPA serialization, hide internal choices, rename nothing implicitly, keep requests distinct from database records and make API evolution visible. Cost: repetitive mapping and synchronized edits.

## Mapping locations

- Entity → response: static `from` factory inside each read response record.
- Contact request → entity: `ContactService.save`, because normalization and time are application behavior.
- Backend project/skills/research response → UI types: `src/api/portfolioApi.ts`.

Manual mapping is best at this size: every assignment is searchable. Constructor mapping is already used inside factories. Static entity factories could move request knowledge into entities, which is less clean. MapStruct is compile-time safe but unnecessary for three simple maps. ModelMapper hides mapping at runtime. Records are already used for DTOs.

## Add a field safely

Decide whether it is persisted, accepted, returned, or all three. Then update entity field/column, constructor and getter; database migration; seed; response record and `from`; frontend API response type/converter and domain type/rendering; tests/docs. With default H2, restart recreates schema. With PostgreSQL, do not trust `ddl-auto:update` as a production migration strategy.
