package com.pelinportfolio.api;

import com.pelinportfolio.api.controller.ContactController;
import com.pelinportfolio.api.dto.ContactResponse;
import com.pelinportfolio.api.exception.GlobalExceptionHandler;
import com.pelinportfolio.api.service.ContactRateLimiter;
import com.pelinportfolio.api.service.ContactService;
import jakarta.validation.Validation;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.RequestPostProcessor;
import org.springframework.validation.beanvalidation.SpringValidatorAdapter;

import java.time.Instant;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verifyNoInteractions;
import static org.mockito.Mockito.when;
import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.standaloneSetup;

class ContactControllerTests {

    private static final String VALID_CONTACT_JSON = """
            {
              "name": "Grace Hopper",
              "email": "grace@example.com",
              "subject": "Portfolio contact",
              "message": "Hello from the controller test.",
              "website": ""
            }
            """;

    private ContactService contactService;
    private MockMvc mockMvc;

    @BeforeEach
    void setUp() {
        contactService = mock(ContactService.class);
        ContactController controller = new ContactController(contactService, new ContactRateLimiter());

        mockMvc = standaloneSetup(controller)
                .setControllerAdvice(new GlobalExceptionHandler())
                .setValidator(new SpringValidatorAdapter(
                        Validation.buildDefaultValidatorFactory().getValidator()
                ))
                .build();
    }

    @Test
    void invalidContactRequestReturns400WithFieldErrors() throws Exception {
        mockMvc.perform(post("/api/contact")
                        .contentType(APPLICATION_JSON)
                        .content("""
                                {
                                  "name": "",
                                  "email": "not-an-email",
                                  "subject": "",
                                  "message": "short",
                                  "website": ""
                                }
                                """))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message").value("Please correct the invalid fields."))
                .andExpect(jsonPath("$.fieldErrors.name").exists())
                .andExpect(jsonPath("$.fieldErrors.email").exists())
                .andExpect(jsonPath("$.fieldErrors.subject").exists())
                .andExpect(jsonPath("$.fieldErrors.message").exists());

        verifyNoInteractions(contactService);
    }

    @Test
    void sixthRapidContactRequestReturns429() throws Exception {
        when(contactService.save(any())).thenReturn(new ContactResponse(
                true,
                "Your message was sent successfully.",
                1L,
                Instant.now()
        ));

        for (int attempt = 1; attempt <= 5; attempt++) {
            mockMvc.perform(post("/api/contact")
                            .with(remoteAddress("203.0.113.10"))
                            .contentType(APPLICATION_JSON)
                            .content(VALID_CONTACT_JSON))
                    .andExpect(status().isCreated());
        }

        mockMvc.perform(post("/api/contact")
                        .with(remoteAddress("203.0.113.10"))
                        .contentType(APPLICATION_JSON)
                        .content(VALID_CONTACT_JSON))
                .andExpect(status().isTooManyRequests())
                .andExpect(jsonPath("$.message").value("Too many messages. Please try again later."));
    }

    private RequestPostProcessor remoteAddress(String address) {
        return request -> {
            request.setRemoteAddr(address);
            return request;
        };
    }
}
