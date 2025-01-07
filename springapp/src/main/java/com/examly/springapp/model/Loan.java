package com.examly.springapp.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Loan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long loanId;
    private String loanType;
    private String description;
    private double interestRate;
    private int maximumAmount;
    private int repaymentTenure;
    private String eligibility;
    private String documentsRequired;

    public Loan() {
    }

    public Loan(long loanId, String loanType, String description, double interestRate, int maximumAmount,
            int repaymentTenure, String eligibility, String documentsRequired) {
        this.loanId = loanId;
        this.loanType = loanType;
        this.description = description;
        this.interestRate = interestRate;
        this.maximumAmount = maximumAmount;
        this.repaymentTenure = repaymentTenure;
        this.eligibility = eligibility;
        this.documentsRequired = documentsRequired;
    }
    
    public long getLoanId() {
        return loanId;
    }
    public void setLoanId(long loanId) {
        this.loanId = loanId;
    }
    public String getLoanType() {
        return loanType;
    }
    public void setLoanType(String loanType) {
        this.loanType = loanType;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public double getInterestRate() {
        return interestRate;
    }
    public void setInterestRate(double interestRate) {
        this.interestRate = interestRate;
    }
    public int getMaximumAmount() {
        return maximumAmount;
    }
    public void setMaximumAmount(int maximumAmount) {
        this.maximumAmount = maximumAmount;
    }
    public int getRepaymentTenure() {
        return repaymentTenure;
    }
    public void setRepaymentTenure(int repaymentTenure) {
        this.repaymentTenure = repaymentTenure;
    }
    public String getEligibility() {
        return eligibility;
    }
    public void setEligibility(String eligibility) {
        this.eligibility = eligibility;
    }
    public String getDocumentsRequired() {
        return documentsRequired;
    }
    public void setDocumentsRequired(String documentsRequired) {
        this.documentsRequired = documentsRequired;
    }
}
