package com.pelinportfolio.api.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ContactRequest(
        @NotBlank(message = "Name is required.")
        @Size(min = 2, max = 80, message = "Name must be between 2 and 80 characters.")
        String name,

        @NotBlank(message = "Email is required.")
        @Email(message = "Email must be valid.")
        @Size(max = 254, message = "Email must be at most 254 characters.")
        String email,

        @NotBlank(message = "Subject is required.")
        @Size(min = 3, max = 150, message = "Subject must be between 3 and 150 characters.")
        String subject,

        @NotBlank(message = "Message is required.")
        @Size(min = 10, max = 3000, message = "Message must be between 10 and 3000 characters.")
        String message,

        @Size(max = 0, message = "Invalid form submission.")
        String website
) {
}
