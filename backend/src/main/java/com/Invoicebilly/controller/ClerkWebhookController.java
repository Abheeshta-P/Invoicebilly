package com.Invoicebilly.controller;

import com.Invoicebilly.entity.User;
import com.Invoicebilly.service.UserService;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/webhooks")
public class ClerkWebhookController {
    @Value("${clerk.webhook.key}")
    private String webhookSecrete;

    private final UserService userService;

    @PostMapping("/clerk")
    public ResponseEntity<?> handleClerkWebhook(@RequestHeader("svix-id") String svixId,
                                                @RequestHeader("svix-timestamp") String svixTimeStamp,
                                                @RequestHeader("svix-signature") String svixSignature,
                                                @RequestBody String payload){
        try{
            verifyWebhookSignature(svixId,svixTimeStamp,svixSignature,payload);
            ObjectMapper mapper = new ObjectMapper();
            JsonNode rootnode = mapper.readTree(payload);

            String eventType = rootnode.path("type").asText();

            switch (eventType){
                case "user.created":
                    handleUserCreated(rootnode.path("data"));;
                    break;
                case "user.updated":
                    handleUserUpdated(rootnode.path("data"));
                    break;
                case "user.deleted":
                    handleUserDeleted(rootnode.path("data"));
                    break;
            }
            return ResponseEntity.ok().build();
        }catch (Exception e){
            throw  new ResponseStatusException(HttpStatus.UNAUTHORIZED, e.getMessage());
        }

    }

    private void handleUserDeleted(JsonNode data) {
        String clerkId = data.path("id").asText();
        userService.deleteAccount(clerkId);
    }

    private void handleUserUpdated(JsonNode data) {
        String clerkId = data.path("id").asText();
        User existingUser = userService.getAccountByClerkId(clerkId);
        existingUser.setEmail(data.path("email_addresses").path(0).path("email_address").asText());
        existingUser.setFirstname(data.path("first_name").asText());
        existingUser.setLastName(data.path("last_name").asText());
        existingUser.setPhotoURL(data.path("image_url").asText());
        userService.saveOrUpdateUser(existingUser);
    }

    private void handleUserCreated(JsonNode data) {
        User newUser = User.builder()
                .clerkId(data.path("id").asText())
                .email(data.path("email_addresses").path(0).path("email_address").asText())
                .firstname(data.path("first_name").asText())
                .lastName(data.path("last_name").asText())
                .build();
        userService.saveOrUpdateUser(newUser);
    }

    private boolean verifyWebhookSignature(String svixId, String svixTimeStamp, String svixSignature, String payload) {
        //TODO: verify signature in production
        return true;
    }
}
