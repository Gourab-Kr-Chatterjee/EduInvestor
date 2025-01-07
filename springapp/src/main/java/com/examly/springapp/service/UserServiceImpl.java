package com.examly.springapp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.examly.springapp.exception.DuplicateRecordException;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.UserRepo;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private PasswordEncoder passwordEncoder;

    //Gets all Users
    @Override
    public List<User> getAllUsers() {
        return userRepo.findAll();
    }

    //Gets user by ID
    @Override
    public User getUserById(int userId) {
        Optional<User> optUser=userRepo.findById(userId);
        if(optUser.isPresent())
        {
            return optUser.get();
        }
        return null;
    }

    //Adds New User
    @Override
    public User createUser(User user) {
       User existingUser=userRepo.findByEmail(user.getEmail()).orElse(null);
       if(existingUser!=null)
       {
        throw new DuplicateRecordException("Email already exists");
       }
       user.setPassword(passwordEncoder.encode(user.getPassword()));
       return userRepo.save(user);
    }

    //Updates User by userID
    @Override
    public User updateUser(int userId, User userDetails) {
       User user=userRepo.findById(userId).get();
       user.setEmail(userDetails.getEmail());
       user.setPassword(userDetails.getPassword());
       user.setUsername(userDetails.getUsername());
       user.setMobileNumber(userDetails.getMobileNumber());
       user.setUserRole(userDetails.getUserRole());
       return userRepo.save(user);
    }

    //Finds User object by using Email
    @Override
    public User findUserByEmail(String email) {
        return userRepo.findByEmail(email).orElse(null);
    }

    //Deletes user by ID
    @Override
    public void deleteUser(int userId) {
       userRepo.deleteById(userId);
    }

}
