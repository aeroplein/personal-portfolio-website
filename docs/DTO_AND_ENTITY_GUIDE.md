# DTO and Entity Guide

## 1. What is an Entity?

An entity is a Java class mapped to a database table by JPA.

For example, `ContactMessage` maps its `email` field to a column in `contact_messages`. Its generated `id` becomes the row's primary key.

Entities answer: **how is this data stored?**

## 2. What is a DTO?

A DTO, or Data Transfer Object, describes data crossing an application boundary.

`ContactRequest` describes accepted JSON. `ContactResponse` describes returned JSON. Java records are used for DTOs because they are small immutable data carriers.

DTOs answer: **what data does this API intentionally accept or return?**

## 3. Why not expose entities directly?

The Entity represents the database table. The DTO represents the response intentionally sent to the frontend. This prevents a later database field from accidentally becoming public.

It also lets storage change without forcing the frontend contract to change. For example, the database field is `githubUrl`, while the frontend adapter maps it to its existing `github` property.

## 4. Project entity

`Project` uses the existing string slug as its primary key, such as `florastream`. It stores:

- visible title and description;
- ordered technology values;
- links and optional image;
- featured/display ordering;
- existing UI metadata: role, takeaway, card color, category, and snippet.

Those extra UI fields were preserved because dropping them would break the current cards.

## 5. Skill entity

`Skill` stores one skill per row:

- generated numeric ID;
- name;
- category;
- level;
- display order.

The API returns a flat list. `portfolioApi.ts` groups rows by category because the existing React component expects categories containing skills.

## 6. ResearchItem entity

`ResearchItem` stores title, description, venue, status, URL, icon name, and display order.

The current data describes research interests rather than published papers. Venue and URL are nullable, while `iconName` preserves the visual behavior.

## 7. ContactMessage entity

`ContactMessage` stores:

- generated ID;
- visitor name and email;
- subject and message;
- UTC creation time.

The response returns the ID and timestamp, not the full stored row.

## 8. Request/response flow example

```text
POST JSON
  -> ContactRequest DTO
  -> @Valid checks
  -> ContactService trims values
  -> ContactMessage entity
  -> ContactMessageRepository.save(...)
  -> database INSERT
  -> ContactResponse DTO
  -> 201 JSON
```

The important boundary is that incoming JSON never becomes a database row without backend validation and deliberate mapping.
