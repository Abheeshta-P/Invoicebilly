package com.Invoicebilly.repository;

import com.Invoicebilly.entity.Invoice;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface InvoiceRepository extends MongoRepository<Invoice, String> {
    List<Invoice> findByClerkId(String id);
    Optional<Invoice> findByClerkIdAndId(String clerkId, String id);
}
