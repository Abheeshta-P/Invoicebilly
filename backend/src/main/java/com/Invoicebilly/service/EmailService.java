package com.Invoicebilly.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.client.WebClient;

import java.io.IOException;
import java.util.Base64;
import java.util.List;
import java.util.Map;

@Service
public class EmailService {

    private final WebClient brevoClient;

    @Value("${spring.mail.properties.mail.smtp.from}")
    private String fromEmail;

    @Value("${mail.sender.name:InvoiceBilly}")
    private String fromName;

    public EmailService(WebClient brevoClient) {
        this.brevoClient = brevoClient;
    }

    public void sendInvoiceEmail(String toEmail, MultipartFile file) throws IOException {

        String fileName = (file.getOriginalFilename() != null && !file.getOriginalFilename().isEmpty())
                ? file.getOriginalFilename()
                : "Invoice.pdf";

        String base64Data = Base64.getEncoder().encodeToString(file.getBytes());

        Map<String, Object> body = Map.of(
                "sender", Map.of("email", fromEmail, "name", fromName),
                "to", List.of(Map.of("email", toEmail)),
                "subject", "Invoice from InvoiceBilly",
                "htmlContent", """
                        <p>Hello,</p>
                        <p>Please find attached your invoice.</p>
                        <p>Best regards,<br/>InvoiceBilly Team</p>
                        """,
                "attachment", List.of(Map.of(
                        "name", fileName,
                        "content", base64Data
                ))
        );

        brevoClient.post()
                .uri("/smtp/email")
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(body)
                .retrieve()
                .bodyToMono(Void.class)
                .block();
    }
}
