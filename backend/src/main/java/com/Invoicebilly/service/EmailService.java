package com.Invoicebilly.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${spring.mail.properties.mail.smtp.from}")
    private String fromEmail;

    public void sendInvoiceEmail(String toEmail, MultipartFile file)
            throws MessagingException, IOException {

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        helper.setFrom(fromEmail);
        helper.setTo(toEmail);
        helper.setSubject("Invoice from InvoiceBilly");
        helper.setText(
                "Hello,\n\nPlease find attached your invoice.\n\n" +
                        "If you have any questions, feel free to reach out.\n\n" +
                        "Best regards,\nInvoiceBilly Team"
        );

        String attachmentName = (file.getOriginalFilename() != null && !file.getOriginalFilename().isEmpty())
                ? file.getOriginalFilename()
                : "Invoice.pdf";

        helper.addAttachment(attachmentName, new ByteArrayResource(file.getBytes()));

        mailSender.send(message);
    }

}
