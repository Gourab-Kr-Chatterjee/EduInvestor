package com.examly.springapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.examly.springapp.model.LoanApplication;

@Repository
public interface LoanApplicationRepo extends JpaRepository<LoanApplication,Long> {
    
}
