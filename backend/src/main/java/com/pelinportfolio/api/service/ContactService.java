package com.pelinportfolio.api.service;

import com.pelinportfolio.api.dto.ContactRequest;
import com.pelinportfolio.api.dto.ContactResponse;
import com.pelinportfolio.api.model.ContactMessage;
import com.pelinportfolio.api.repository.ContactMessageRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;

@Service
public class ContactService {

    private final ContactMessageRepository contactMessageRepository;
    private final ContactEmailService contactEmailService;

    public ContactService(
            ContactMessageRepository contactMessageRepository,
            ContactEmailService contactEmailService
    ) {
        this.contactMessageRepository = contactMessageRepository;
        this.contactEmailService = contactEmailService;
    }

    @Transactional
    public ContactResponse save(ContactRequest request) {
        ContactMessage contactMessage = new ContactMessage(
                request.name().trim(),
                request.email().trim().toLowerCase(),
                request.subject().trim(),
                request.message().trim(),
                Instant.now()
        );

        ContactMessage savedMessage = contactMessageRepository.saveAndFlush(contactMessage);
        boolean emailSent = contactEmailService.send(savedMessage);

        return new ContactResponse(
                true,
                emailSent
                        ? "Your message was sent successfully."
                        : "Your message was validated and stored successfully.",
                savedMessage.getId(),
                savedMessage.getCreatedAt()
        );
    }
}
