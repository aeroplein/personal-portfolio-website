package com.pelinportfolio.api;

import com.pelinportfolio.api.exception.ContactDeliveryException;
import com.pelinportfolio.api.repository.ContactMessageRepository;
import com.pelinportfolio.api.service.ContactEmailService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.test.context.bean.override.mockito.MockitoBean;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.boot.test.context.SpringBootTest.WebEnvironment.RANDOM_PORT;

@SpringBootTest(webEnvironment = RANDOM_PORT)
class ContactDeliveryFailureTests {

    @LocalServerPort
    private int port;

    @Autowired
    private ContactMessageRepository contactMessageRepository;

    @MockitoBean
    private ContactEmailService contactEmailService;

    @Test
    void resendFailureReturns502AndRollsBackStoredMessage() throws Exception {
        long messagesBeforeRequest = contactMessageRepository.count();
        when(contactEmailService.send(any()))
                .thenThrow(new ContactDeliveryException("Your message could not be sent right now."));

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("http://127.0.0.1:" + port + "/api/contact"))
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString("""
                        {
                          "name": "Grace Hopper",
                          "email": "grace@example.com",
                          "subject": "Portfolio contact",
                          "message": "Hello from the rollback integration test.",
                          "website": ""
                        }
                        """))
                .build();

        HttpResponse<String> response = HttpClient.newHttpClient().send(
                request,
                HttpResponse.BodyHandlers.ofString()
        );

        assertThat(response.statusCode()).isEqualTo(502);
        assertThat(response.body()).contains("Your message could not be sent right now.");
        assertThat(contactMessageRepository.count()).isEqualTo(messagesBeforeRequest);
    }
}
