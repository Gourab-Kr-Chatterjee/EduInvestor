package com.examly.springapp.service;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import com.examly.springapp.exception.LoanAlreadyExistsException;
import com.examly.springapp.model.Loan;
import com.examly.springapp.repository.LoanRepo;
@Service
public class LoanServiceImpl implements LoanService{
    @Autowired
    private LoanRepo loanRepo;

    //Adds loan to database
    public Loan addLoan(Loan loan) throws LoanAlreadyExistsException {
        List<Loan> allLoans=loanRepo.findAll();
        for(Loan l:allLoans)
        {
            if(l.getLoanType().equalsIgnoreCase(loan.getLoanType()))
            {
                throw new LoanAlreadyExistsException("Loan already exists");
            }
        }
        return loanRepo.save(loan);
    }

    //Gets loan By Id
    public Optional<Loan> getLoanById(Long loanId) {
        return loanRepo.findById(loanId);
    }

    //Get all loans
    @Cacheable(value="loans")
    public List<Loan> getAllLoans() {
        return loanRepo.findAll();
    }

    //Updates loan using ID
    public Loan updateLoan(Long loanId, Loan updatedLoan) {
       Optional<Loan> optLoan = loanRepo.findById(loanId);
       if(optLoan.isPresent()){
        Loan loan = optLoan.get();
        loan.setLoanType(updatedLoan.getLoanType());
        loan.setDescription(updatedLoan.getDescription());
        loan.setInterestRate(updatedLoan.getInterestRate());
        loan.setMaximumAmount(updatedLoan.getMaximumAmount());
        loan.setRepaymentTenure(updatedLoan.getRepaymentTenure());
        loan.setEligibility(updatedLoan.getEligibility());
        loan.setDocumentsRequired(updatedLoan.getDocumentsRequired());
        return loanRepo.save(loan);
       }
        return null;
    }
    
    //Deletes loan by ID
    public Loan deleteLoan(Long loanId) {
        Optional<Loan> optLoan = loanRepo.findById(loanId);
        if(optLoan.isPresent()){
            Loan loan = optLoan.get();
            loanRepo.deleteById(loanId);
            return loan;

        }
        return null;
    }
}
