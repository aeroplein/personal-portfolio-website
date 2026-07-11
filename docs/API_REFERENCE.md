# API Reference

Base URL for local development: `http://localhost:8081`

## GET /api/projects

### Purpose

Returns every project ordered for display.

### Response example

```json
[
  {
    "id": "florastream",
    "title": "FloraStream Engine & API",
    "description": "A lightning-fast key-value memory database...",
    "techStack": ["Rust", "Bloom Filters", "gRPC"],
    "githubUrl": "https://github.com/pelinzkaya/florastream-engine",
    "liveUrl": "https://florastream-demo.example.com",
    "imageUrl": null,
    "featured": true,
    "displayOrder": 1,
    "role": "Sole Architect & Developer",
    "takeaway": "Achieved a 45% reduction in disk reads...",
    "cardColor": "ivory",
    "category": "Backend & Systems",
    "snippet": "pub struct FloraIndex { ... }"
  }
]
```

## GET /api/projects/{id}

### Purpose

Returns one project using its string ID.

### Response example

```json
{
  "id": "florastream",
  "title": "FloraStream Engine & API",
  "techStack": ["Rust", "Bloom Filters", "gRPC", "RocksDB", "In-Memory Cache"],
  "featured": true,
  "displayOrder": 1
}
```

Unknown IDs return `404`:

```json
{
  "status": 404,
  "error": "Not Found",
  "message": "Project 'missing' was not found.",
  "fieldErrors": {}
}
```

## GET /api/skills

### Purpose

Returns a flat, ordered list of skills. The frontend groups the rows by `category`.

### Response example

```json
[
  {
    "id": 1,
    "name": "TypeScript / JS",
    "category": "Languages",
    "level": "expert",
    "displayOrder": 1
  }
]
```

## GET /api/research

### Purpose

Returns research interests/items in display order.

### Response example

```json
[
  {
    "id": "res-1",
    "title": "Developer Ergonomics & Compiler UX",
    "description": "Researching how error compiler logs...",
    "venue": null,
    "status": "Research interest",
    "url": null,
    "iconName": "Sparkles",
    "displayOrder": 1
  }
]
```

## POST /api/contact

### Purpose

Validates and stores a contact message. It does not send email.

### Request body

```json
{
  "name": "Example Name",
  "email": "example@email.com",
  "subject": "Portfolio contact",
  "message": "Hello from the portfolio form.",
  "website": ""
}
```

`website` is an empty honeypot field used to reject simple bot submissions.

### Validation rules

- name: required, 2-80 characters;
- email: required, valid format, at most 254 characters;
- subject: required, 3-150 characters;
- message: required, 10-3000 characters;
- website: must be empty.

### Response example

Status: `201 Created`

```json
{
  "ok": true,
  "message": "Your message was validated and stored successfully.",
  "id": 1,
  "createdAt": "2026-07-09T00:00:00Z"
}
```

### Possible errors

- `400 Bad Request`: invalid fields or malformed JSON.
- `500 Internal Server Error`: unexpected backend/database failure.

Validation example:

```json
{
  "status": 400,
  "error": "Bad Request",
  "message": "Please correct the invalid fields.",
  "fieldErrors": {
    "email": "Email must be valid.",
    "subject": "Subject is required."
  }
}
```
