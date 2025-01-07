package com.examly.springapp.service;
import java.io.IOException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.examly.springapp.model.LoanApplication;
import com.examly.springapp.repository.LoanApplicationRepo;

@Service
public class LoanApplicationServiceImpl implements LoanApplicationService{
    @Autowired
    private LoanApplicationRepo loanApplicationRepo;

    //Adds loan Application along with image
    public LoanApplication addLoanApplication(MultipartFile file, LoanApplication loanApplication) throws IOException {
        loanApplication.setImageData(file.getBytes());
        loanApplication.setSubmissionDate(LocalDate.now());
        return loanApplicationRepo.save(loanApplication);
    }

    //Gets loanApplication by ID 
    public Optional<LoanApplication> getLoanApplicationById(Long loanApplicationId) {
        return loanApplicationRepo.findById(loanApplicationId);
    }

    //Gets all loanApplications 
    public List<LoanApplication> getAllLoanApplications() {
       return loanApplicationRepo.findAll();
    }

    //Updates loan Application
    public LoanApplication updateLoanApplication(Long loanApplicationId, LoanApplication updatedloanApplication) {
        Optional<LoanApplication> optId=loanApplicationRepo.findById(loanApplicationId);
        if(optId.isPresent())
        {
            LoanApplication loanApplication=optId.get();
            loanApplication.setSubmissionDate(LocalDate.now());
            loanApplication.setCourse(updatedloanApplication.getCourse());
            loanApplication.setInstitution(updatedloanApplication.getInstitution());
            loanApplication.setTuitionFee(updatedloanApplication.getTuitionFee());
            loanApplication.setLoanStatus(updatedloanApplication.getLoanStatus());
            loanApplication.setAddress(updatedloanApplication.getAddress());
            return loanApplicationRepo.save(loanApplication);
        }
        return null;
    }

    //Deletes Loan Application
    public LoanApplication deleteLoanApplication(Long loanApplicationId) {
       if(loanApplicationRepo.existsById(loanApplicationId))
       {
        LoanApplication loanApplication=loanApplicationRepo.findById(loanApplicationId).get();
        loanApplicationRepo.deleteById(loanApplicationId);
        return loanApplication;
       }
       return null;
    }

    //Get loanApplication By using UserID 
    @Override
    public List<LoanApplication> getLoanApplicationByUserId(Long userId) {
        List<LoanApplication> appliedLoans= new ArrayList<>();
        for(LoanApplication loanApplication: loanApplicationRepo.findAll()){
            if(loanApplication.getUser().getUserId()==userId){
                appliedLoans.add(loanApplication);
            }
        }
        return appliedLoans;
    }

}
