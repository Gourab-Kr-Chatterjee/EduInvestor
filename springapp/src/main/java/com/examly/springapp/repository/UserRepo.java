package com.examly.springapp.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.examly.springapp.model.User;

@Repository
public interface UserRepo  extends JpaRepository<User,Integer>{
    
    //Method to find User By using Email
    Optional<User> findByEmail(String email);
    
}