package com.examly.springapp.service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.web.multipart.MultipartFile;

import com.examly.springapp.model.LoanApplication;

public interface LoanApplicationService {
    public LoanApplication addLoanApplication( MultipartFile file, LoanApplication loanApplication) throws IOException;
    public Optional<LoanApplication> getLoanApplicationById(Long loanApplicationId);
    public List<LoanApplication> getAllLoanApplications();
    public LoanApplication updateLoanApplication(Long loanApplicationId,LoanApplication updatedloanApplication);
    public LoanApplication deleteLoanApplication(Long loanApplicationId);
    public List<LoanApplication> getLoanApplicationByUserId(Long userId);
}
