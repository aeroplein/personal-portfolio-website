package com.pelinportfolio.api.dto;

import java.time.Instant;

public record ContactResponse(
        boolean ok,
        String message,
        Long id,
        Instant createdAt
) {
}
