package com.pelinportfolio.api.controller;

import com.pelinportfolio.api.dto.ContactRequest;
import com.pelinportfolio.api.dto.ContactResponse;
import com.pelinportfolio.api.service.ContactService;
import jakarta.validation.Valid;
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

    public ContactController(ContactService contactService) {
        this.contactService = contactService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ContactResponse createContactMessage(@Valid @RequestBody ContactRequest request) {
        return contactService.save(request);
    }
}
