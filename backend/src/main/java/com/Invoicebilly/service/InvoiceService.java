package com.Invoicebilly.service;

import com.Invoicebilly.entity.Invoice;
import com.Invoicebilly.repository.InvoiceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class InvoiceService {
    private final InvoiceRepository invoiceRepository;

    public Invoice saveInvoice(Invoice invoice){
        return invoiceRepository.save(invoice);
    }

    public List<Invoice> fetchInvoices(String clerkId){
        return invoiceRepository.findByClerkId(clerkId);
    }

    public void deleteInvoiceById(String id, String clerkId) {
        Invoice existingInvoice = invoiceRepository
                .findByClerkIdAndId(clerkId, id)
                .orElseThrow(() -> new RuntimeException("Invoice not found with id: " + id));

        invoiceRepository.delete(existingInvoice);
    }
}
