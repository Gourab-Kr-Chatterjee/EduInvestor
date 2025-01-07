package com.examly.springapp.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.examly.springapp.model.LoanApplication;
import com.examly.springapp.service.LoanApplicationService;

@RestController
@RequestMapping("/api/loanapplication")
public class LoanApplicationController {
    @Autowired
    private LoanApplicationService loanApplicationService;

    //Adds loan Application which is accessed by User
    @PostMapping
    @PreAuthorize("hasAuthority('USER')")
    public ResponseEntity<?> addLoanApplication(
            @RequestParam("file") MultipartFile file,
            @ModelAttribute LoanApplication loanApplication) {
        try {
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(loanApplicationService.addLoanApplication(file, loanApplication));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }

    //Gets all loanApplications which can be accessed by Admin
    @GetMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> getAllLoanApplications() {
        try {
            return ResponseEntity.status(200).body(loanApplicationService.getAllLoanApplications());
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }

    //Updates LoanApplication by ID which can be accessed by Admin
    @PutMapping("/{loanapplicationId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> updateLoanApplication(@PathVariable long loanapplicationId,
            @RequestBody LoanApplication updatedLoanApplication) {
        try {
            LoanApplication loanApplication = loanApplicationService.updateLoanApplication(loanapplicationId,
                    updatedLoanApplication);
            if (loanApplication != null)
                return ResponseEntity.status(200).body(loanApplication);
            else
                return ResponseEntity.status(500).body(null);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }

    //Deletes loanApplication by ID which can be done by both user and admin
    @DeleteMapping("/{loanapplicationId}")
    @PreAuthorize("permitAll()")
    public ResponseEntity<?> deleteLoanApplication(@PathVariable long loanapplicationId) {
        try {
            LoanApplication loanApplication = loanApplicationService.deleteLoanApplication(loanapplicationId);
            if (loanApplication != null)
                return ResponseEntity.status(200).body(loanApplication);
            else
                return ResponseEntity.status(500).body(null);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }

    //Gets all loanApplication by User which can be accessed by User
    @GetMapping("/user/{userId}")
    @PreAuthorize("hasAuthority('USER')")
    public ResponseEntity<?> getLoanApplicationByUserId(@PathVariable Long userId) {
        return ResponseEntity.status(200).body(loanApplicationService.getLoanApplicationByUserId(userId));
    }

    //Gets loanApplication by ID
    @GetMapping("/{id}")
    public ResponseEntity<byte[]> getLoanApplication(@PathVariable Long id) {
        LoanApplication loanApplication = loanApplicationService.getLoanApplicationById(id).get();
        if (loanApplication != null) {
            return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(loanApplication.getImageData());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
}
