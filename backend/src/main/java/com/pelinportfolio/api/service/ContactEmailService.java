package com.pelinportfolio.api.service;

import com.pelinportfolio.api.exception.ContactDeliveryException;
import com.pelinportfolio.api.model.ContactMessage;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClientException;
import org.springframework.web.util.HtmlUtils;

import java.util.List;
import java.util.Map;

@Service
public class ContactEmailService {

    private final RestClient restClient;
    private final boolean enabled;
    private final String apiKey;
    private final String toEmail;
    private final String fromEmail;

    public ContactEmailService(
            @Value("${app.mail.enabled:false}") boolean enabled,
            @Value("${app.mail.resend.api-key:}") String apiKey,
            @Value("${app.mail.to-email:}") String toEmail,
            @Value("${app.mail.from-email:}") String fromEmail,
            @Value("${app.mail.resend.base-url:https://api.resend.com}") String baseUrl
    ) {
        this.restClient = RestClient.builder().baseUrl(baseUrl).build();
        this.enabled = enabled;
        this.apiKey = apiKey;
        this.toEmail = toEmail;
        this.fromEmail = fromEmail;
    }

    public boolean send(ContactMessage message) {
        if (!enabled) {
            return false;
        }

        ensureConfigured();

        String safeName = HtmlUtils.htmlEscape(message.getName());
        String safeEmail = HtmlUtils.htmlEscape(message.getEmail());
        String safeSubject = HtmlUtils.htmlEscape(message.getSubject());
        String safeMessage = HtmlUtils.htmlEscape(message.getMessage()).replace("\n", "<br />");

        Map<String, Object> body = Map.of(
                "from", fromEmail,
                "to", List.of(toEmail),
                "reply_to", message.getEmail(),
                "subject", "Portfolio message: " + message.getSubject(),
                "text", "Name: " + message.getName()
                        + "\nEmail: " + message.getEmail()
                        + "\nSubject: " + message.getSubject()
                        + "\n\n" + message.getMessage(),
                "html", """
                        <div style="font-family: Inter, Arial, sans-serif; color: #3E2C44; line-height: 1.6;">
                          <h2>New portfolio message</h2>
                          <p><strong>Name:</strong> %s</p>
                          <p><strong>Email:</strong> %s</p>
                          <p><strong>Subject:</strong> %s</p>
                          <hr />
                          <p>%s</p>
                        </div>
                        """.formatted(safeName, safeEmail, safeSubject, safeMessage)
        );

        try {
            restClient.post()
                    .uri("/emails")
                    .header(HttpHeaders.AUTHORIZATION, "Bearer " + apiKey)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(body)
                    .retrieve()
                    .toBodilessEntity();
            return true;
        } catch (RestClientException exception) {
            throw new ContactDeliveryException("Your message could not be sent right now.", exception);
        }
    }

    private void ensureConfigured() {
        if (apiKey.isBlank() || toEmail.isBlank() || fromEmail.isBlank()) {
            throw new ContactDeliveryException("Contact email is not configured.");
        }
    }
}
