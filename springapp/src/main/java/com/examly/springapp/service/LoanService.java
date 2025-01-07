package com.examly.springapp.service;

import java.util.List;
import java.util.Optional;

import com.examly.springapp.exception.LoanAlreadyExistsException;
import com.examly.springapp.model.Loan;

public interface LoanService {
    public Loan addLoan(Loan loan) throws LoanAlreadyExistsException;
    public Optional<Loan> getLoanById(Long loanId);
    public List<Loan> getAllLoans();
    public Loan updateLoan(Long loanId,Loan updatedLoan);
    public Loan deleteLoan(Long loanId);
}
