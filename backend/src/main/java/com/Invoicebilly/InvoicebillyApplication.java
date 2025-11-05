package com.Invoicebilly;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.config.EnableMongoAuditing;

@SpringBootApplication
@EnableMongoAuditing
public class InvoicebillyApplication {

	@Value("${spring.data.mongodb.uri}")
	private String mongoUri;

	public static void main(String[] args) {
		SpringApplication.run(InvoicebillyApplication.class, args);
	}

	@PostConstruct
	public void logMongoUri() {
		System.out.println("Mongo URL: " + mongoUri);
	}
}
