package com.examly.springapp.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import com.examly.springapp.model.User;
import com.examly.springapp.repository.UserRepo;

@Component
public class MyUserDetailsService implements UserDetailsService {
    @Autowired
    UserRepo userRepo;

    private static final Logger logger=LoggerFactory.getLogger(MyUserDetailsService.class);
    
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        logger.debug("Entering in loadUserByUsername method.....");
        User user = userRepo.findByEmail(email).orElse(null);
        if (user == null) {
            logger.error("Email not Found: "+email);
            throw new UsernameNotFoundException("Invalid Email");
        }
        logger.info("User Authenticated successfully...!!!!!");
        return new UserPrinciple(user);
    }

}

