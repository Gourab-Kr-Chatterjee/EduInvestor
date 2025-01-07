package com.examly.springapp.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.examly.springapp.exception.LoanAlreadyExistsException;
import com.examly.springapp.model.Loan;
import com.examly.springapp.service.LoanServiceImpl;

@RestController
@RequestMapping("/api/loan")
public class LoanController {
    @Autowired
    private LoanServiceImpl loanServiceImpl;

    //Gets all loans which can be accessed by both User and Admin
    @GetMapping
    @PreAuthorize("permitAll()")
    public ResponseEntity<List<Loan>> getAllLoans() {
        try {
            return ResponseEntity.status(200).body(loanServiceImpl.getAllLoans());
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }

    //Adds loan which can be accessed by Admin
    @PostMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> addLoan(@RequestBody Loan loan) {
        try {
            return ResponseEntity.status(201).body(loanServiceImpl.addLoan(loan));
        } catch (LoanAlreadyExistsException e) {
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }

    //Get loan by ID which can be accessed by Admin
    @GetMapping("/loanId")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Loan> getLoanById(@RequestParam Long loanId) {
        try {
            Optional<Loan> loan = loanServiceImpl.getLoanById(loanId);
            if (loan.isPresent()) {
                return ResponseEntity.status(200).body(loan.get());
            } else {
                return ResponseEntity.status(500).body(null);
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }

    //Updates loan ID which can be accessed by Admin
    @PutMapping("/{loanId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Loan> updateLoan(@PathVariable Long loanId, @RequestBody Loan updatedLoan) {
        try {
            Loan loan = loanServiceImpl.updateLoan(loanId, updatedLoan);
            if (loan != null) {
                return ResponseEntity.status(200).body(loan);
            } else {
                return ResponseEntity.status(500).body(null);
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }

    //Deletes loan by loanID which can be accessed by Admin
    @DeleteMapping("/{loanId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Loan> deleteLoan(@PathVariable Long loanId) {
        Loan deletedLoan = loanServiceImpl.deleteLoan(loanId);
        return ResponseEntity.status(200).body(deletedLoan);

    }

}
