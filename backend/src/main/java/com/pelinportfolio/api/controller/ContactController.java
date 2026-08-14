package com.pelinportfolio.api.controller;

import com.pelinportfolio.api.dto.ContactRequest;
import com.pelinportfolio.api.dto.ContactResponse;
import com.pelinportfolio.api.service.ContactService;
import com.pelinportfolio.api.service.ContactRateLimiter;
import jakarta.validation.Valid;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/contact")
public class ContactController {

    private final ContactService contactService;
    private final ContactRateLimiter contactRateLimiter;

    public ContactController(ContactService contactService, ContactRateLimiter contactRateLimiter) {
        this.contactService = contactService;
        this.contactRateLimiter = contactRateLimiter;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ContactResponse createContactMessage(
            @Valid @RequestBody ContactRequest request,
            HttpServletRequest httpRequest
    ) {
        contactRateLimiter.check(httpRequest.getRemoteAddr());
        return contactService.save(request);
    }
}
