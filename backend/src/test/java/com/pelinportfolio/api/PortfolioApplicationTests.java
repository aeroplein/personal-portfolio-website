package com.pelinportfolio.api;

import com.pelinportfolio.api.dto.ContactRequest;
import com.pelinportfolio.api.dto.ContactResponse;
import com.pelinportfolio.api.model.ContactMessage;
import com.pelinportfolio.api.repository.ContactMessageRepository;
import com.pelinportfolio.api.service.ContactEmailService;
import com.pelinportfolio.api.service.ContactService;
import com.pelinportfolio.api.service.ProjectService;
import com.pelinportfolio.api.service.ResearchService;
import com.pelinportfolio.api.service.SkillService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.sun.net.httpserver.HttpServer;
import java.net.InetSocketAddress;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.concurrent.atomic.AtomicReference;

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
        assertThat(projectService.findAll())
                .extracting(project -> project.id())
                .containsExactly(
                        "auraboard",
                        "sshtunneling",
                        "overengineering-detector",
                        "codeyourtree",
                        "stegodetector",
                        "generative-xai-adhd",
                        "music-genre-detection",
                        "frantic-barista",
                        "university-automation-system",
                        "mnist-digit-recognition",
                        "cervical-cancer-prediction"
                );
        assertThat(projectService.findById("auraboard").title())
                .isEqualTo("Aura Board - Full-Stack Collaborative Vision-Board App");
        assertThat(projectService.findById("codeyourtree").role())
                .isEqualTo("Technical Software Project");
        assertThat(projectService.findById("stegodetector").takeaway())
                .contains("80% classification accuracy");
        assertThat(projectService.findById("mnist-digit-recognition").takeaway())
                .contains("97.81% test accuracy");
        assertThat(projectService.findById("cervical-cancer-prediction").takeaway())
                .contains("not as a clinically validated model");
        assertThat(skillService.findAll()).hasSize(38);
        assertThat(researchService.findAll()).hasSize(4);
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

    @Test
    void configuredContactEmailUsesResendHttpApi() throws Exception {
        AtomicReference<String> authorization = new AtomicReference<>();
        AtomicReference<String> requestBody = new AtomicReference<>();
        HttpServer server = HttpServer.create(new InetSocketAddress("127.0.0.1", 0), 0);
        server.createContext("/emails", exchange -> {
            authorization.set(exchange.getRequestHeaders().getFirst("Authorization"));
            requestBody.set(new String(exchange.getRequestBody().readAllBytes(), StandardCharsets.UTF_8));
            byte[] response = "{\"id\":\"email-test-id\"}".getBytes(StandardCharsets.UTF_8);
            exchange.getResponseHeaders().set("Content-Type", "application/json");
            exchange.sendResponseHeaders(200, response.length);
            exchange.getResponseBody().write(response);
            exchange.close();
        });
        server.start();

        try {
            ContactEmailService emailService = new ContactEmailService(
                    true,
                    "test-api-key",
                    "owner@example.com",
                    "Portfolio <hello@example.com>",
                    "http://127.0.0.1:" + server.getAddress().getPort()
            );
            boolean sent = emailService.send(new ContactMessage(
                    "Grace Hopper",
                    "grace@example.com",
                    "Portfolio contact",
                    "Hello from the email integration test.",
                    Instant.now()
            ));

            assertThat(sent).isTrue();
            assertThat(authorization.get()).isEqualTo("Bearer test-api-key");
            assertThat(requestBody.get())
                    .contains("\"reply_to\":\"grace@example.com\"")
                    .contains("\"to\":[\"owner@example.com\"]")
                    .contains("Portfolio contact");
        } finally {
            server.stop(0);
        }
    }
}
