package com.examly.springapp.service;

import java.util.List;

import com.examly.springapp.model.User;

public interface UserService {
    public List<User> getAllUsers();
    public User getUserById(int userId);
    public User createUser(User user);
    public User updateUser(int userId,User userDetails);
    public User findUserByEmail(String email);
    public void deleteUser(int userId);
}
