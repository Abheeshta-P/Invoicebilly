package com.Invoicebilly.controller;

import com.Invoicebilly.entity.Invoice;
import com.Invoicebilly.service.InvoiceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/invoices")
@CrossOrigin("*")
public class InvoiceController {
    private final InvoiceService invoiceService;

    @PostMapping
    public ResponseEntity<Invoice> saveInvoice(@RequestBody Invoice invoice){
        return ResponseEntity.ok(invoiceService.saveInvoice(invoice));
    }

    @GetMapping
    public ResponseEntity<List<Invoice>> fetchInvoices(){
        return ResponseEntity.ok(invoiceService.fetchInvoices());
    }
}
