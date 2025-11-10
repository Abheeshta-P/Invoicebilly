package com.Invoicebilly.controller;

import com.Invoicebilly.entity.Invoice;
import com.Invoicebilly.service.EmailService;
import com.Invoicebilly.service.InvoiceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/invoices")
//@CrossOrigin("*")
public class InvoiceController {
    private final InvoiceService invoiceService;
    private final EmailService emailService;

    @PostMapping
    public ResponseEntity<Invoice> saveInvoice(@RequestBody Invoice invoice){
        return ResponseEntity.ok(invoiceService.saveInvoice(invoice));
    }

    @GetMapping
    public ResponseEntity<List<Invoice>> fetchInvoices(){
        return ResponseEntity.ok(invoiceService.fetchInvoices());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String>  deleteInvoice(@PathVariable String id){
        System.out.println(id);
        try {
            invoiceService.deleteInvoiceById(id);
            return ResponseEntity.status(204).body("Invoice deleted successfully");
        } catch (RuntimeException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Invoice not found: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to delete invoice: " + e.getMessage());
        }
    }

    @PostMapping("/sendinvoice")
    public ResponseEntity<?> sendInvoice(@RequestPart("file") MultipartFile file, @RequestPart("email") String customerEmail){
        try{
            emailService.sendInvoiceEmail(customerEmail,file);
            return ResponseEntity.ok().body("Invoice sent successfully!");
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to send Invoice.");
        }
    }
}
