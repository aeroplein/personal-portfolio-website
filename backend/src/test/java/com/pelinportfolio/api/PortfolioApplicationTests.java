package com.pelinportfolio.api;

import com.pelinportfolio.api.dto.ContactRequest;
import com.pelinportfolio.api.dto.ContactResponse;
import com.pelinportfolio.api.repository.ContactMessageRepository;
import com.pelinportfolio.api.service.ContactService;
import com.pelinportfolio.api.service.ProjectService;
import com.pelinportfolio.api.service.ResearchService;
import com.pelinportfolio.api.service.SkillService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
class PortfolioApplicationTests {

    @Autowired
    private ProjectService projectService;

    @Autowired
    private SkillService skillService;

    @Autowired
    private ResearchService researchService;

    @Autowired
    private ContactService contactService;

    @Autowired
    private ContactMessageRepository contactMessageRepository;

    @Test
    void seededPortfolioContentCanBeRead() {
        assertThat(projectService.findAll()).hasSize(7);
        assertThat(projectService.findById("auraboard").title())
                .isEqualTo("AuraBoard - Digital Vision Board SaaS");
        assertThat(skillService.findAll()).hasSize(25);
        assertThat(researchService.findAll()).hasSize(3);
    }

    @Test
    void contactMessageIsStored() {
        ContactResponse response = contactService.save(new ContactRequest(
                "Grace Hopper",
                "GRACE@example.com",
                "Portfolio contact",
                "Hello from the automated backend test.",
                ""
        ));

        assertThat(response.ok()).isTrue();
        assertThat(response.id()).isNotNull();
        assertThat(contactMessageRepository.findById(response.id()))
                .get()
                .extracting(message -> message.getEmail())
                .isEqualTo("grace@example.com");
    }
}
