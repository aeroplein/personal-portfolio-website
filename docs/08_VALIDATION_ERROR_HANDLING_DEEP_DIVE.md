# 08 Validation and Error Handling Deep Dive

## Validation flow

JSON → Jackson `ContactRequest` → controller `@Valid` → Bean Validation → controller method only if valid → service normalization → JPA column constraints → database.

| Annotation | Fields | Rule |
|---|---|---|
| `@NotBlank` | name/email/subject/message | non-null and non-whitespace |
| `@Email` | email | syntactically plausible email |
| `@Size(2..80)` | name | UI/database-compatible length |
| `@Size(max=254)` | email | standard practical bound |
| `@Size(3..150)` | subject | useful bounded subject |
| `@Size(10..3000)` | message | useful bounded message |
| `@Size(max=0)` | website | honeypot must remain empty |

`@Email` does not prove deliverability. There is no entity-level Bean Validation; column nullability/length are persistence constraints, not friendly HTTP validation.

## `handleValidation(MethodArgumentNotValidException)`

Runs when `@Valid` fails. It collects the first default message for each field into stable insertion order and returns 400 with general message plus `fieldErrors`. The frontend displays the first field error. Alternative: a list preserving multiple errors; current map is simpler.

## `handleUnreadableJson()`

Catches JSON syntax/type binding failures and returns 400 `"Request body must be valid JSON."`. It intentionally ignores exception details to avoid leaking parser internals.

## `handleNotFound(ResourceNotFoundException)`

Turns the service's missing-project exception into 404. It preserves the message and uses an empty field map.

## `buildResponse(...)`

Centralizes timestamp, numeric status, reason, message and fields, then builds matching HTTP status/body. This prevents shape drift between handlers.

## Missing handling

There is no explicit 409, persistence failure, payload-too-large, unsupported media type, generic 500, or constraint-violation handler. Spring will handle many with its default body, so error shapes may become inconsistent. There is also no logging/correlation ID, rate limiting, CSRF discussion, or sanitization beyond normalization. Stored text is not dangerous by itself, but any future admin UI must escape it.

## Test matrix

Test each bound, whitespace-only values, invalid email, non-empty honeypot, missing/null fields, malformed JSON, wrong content type, unknown project, and repository failure. Use MockMvc for status/body and service tests for normalization/rollback.
