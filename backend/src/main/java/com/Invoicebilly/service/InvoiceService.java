package com.Invoicebilly.service;

import com.Invoicebilly.entity.Invoice;
import com.Invoicebilly.repository.InvoiceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class InvoiceService {
    private final InvoiceRepository invoiceRepository;

    public Invoice saveInvoice(Invoice invoice){
        return invoiceRepository.save(invoice);
    }

    public List<Invoice> fetchInvoices(){
        return invoiceRepository.findAll();
    }
}
