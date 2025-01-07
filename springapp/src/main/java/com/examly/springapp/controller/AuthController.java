package com.examly.springapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.examly.springapp.config.JwtUtils;
import com.examly.springapp.model.LoginDTO;
import com.examly.springapp.model.User;
import com.examly.springapp.service.UserService;

@RestController
@RequestMapping("/api")
public class AuthController {
    @Autowired
    private UserService userService;
    @Autowired
    private JwtUtils jwtService;
    @Autowired
    private AuthenticationManager authenticationManager;
    
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user)
    {
        User newUser=userService.createUser(user);
        return ResponseEntity.status(201).body(newUser);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User user)
    {
        Authentication authentication=authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword()));
        if(authentication.isAuthenticated())
        {
            User myUser=userService.findUserByEmail(user.getEmail());
            LoginDTO userDTO=new LoginDTO();
            userDTO.setUserId(myUser.getUserId());
            userDTO.setEmail(myUser.getEmail());
            userDTO.setUsername(myUser.getUsername());
            userDTO.setMobileNumber(myUser.getMobileNumber());
            userDTO.setUserRole(myUser.getUserRole());
            userDTO.setToken(jwtService.GenerateToken(myUser.getEmail()));
            return ResponseEntity.status(200).body(userDTO);
        }
        else{
            throw new UsernameNotFoundException("Invalid Request!!");
        }
        
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<User> getUserByUserId(@PathVariable int userId){
        return ResponseEntity.status(200).body(userService.getUserById(userId));
    }

}
