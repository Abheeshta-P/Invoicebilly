package com.Invoicebilly.controller;

import com.Invoicebilly.entity.Invoice;
import com.Invoicebilly.service.EmailService;
import com.Invoicebilly.service.InvoiceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

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
    public ResponseEntity<List<Invoice>> fetchInvoices(Authentication authentication){
        return ResponseEntity.ok(invoiceService.fetchInvoices(authentication.getName()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String>  deleteInvoice(@PathVariable String id, Authentication authentication){
        try {
            if(authentication.getName() != null){
                invoiceService.deleteInvoiceById(id, authentication.getName());
                return ResponseEntity.status(204).body("Invoice deleted successfully");
            }
            throw new ResponseStatusException(HttpStatus.FORBIDDEN,"User does not have permission to access this resource");
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
