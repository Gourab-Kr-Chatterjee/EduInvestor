package com.examly.springapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.examly.springapp.model.Feedback;
import com.examly.springapp.service.FeedbackServiceImpl;

@RestController
@RequestMapping("/api/feedback")
public class FeedbackController {
    @Autowired
    private FeedbackServiceImpl feedbackServiceImpl;

    //Gets all feedbacks which is accessed only by Admin
    @GetMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<List<Feedback>> getAllFeedbacks(){
        try {
            return ResponseEntity.status(200).body(feedbackServiceImpl.getAllFeedbacks());
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }

    //Deletes the feedback by feedbackId which is accessed by Admin
    @DeleteMapping("/{feedbackId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> deleteFeedback(@PathVariable Long feedbackId){
        
            return ResponseEntity.status(200).body(feedbackServiceImpl.deleteFeed(feedbackId));
    }

    //Deletes the feedback by FeedbackID which is accessed by User
    @DeleteMapping("/user/{feedbackId}")
    @PreAuthorize("hasAuthority('USER')")
    public ResponseEntity<?> deleteFeedbackByUser(@PathVariable Long feedbackId){
        
            return ResponseEntity.status(200).body(feedbackServiceImpl.deleteFeedbackByUser(feedbackId));
       
    }

    //Adds the feedback which can be done by User
    @PostMapping
     @PreAuthorize("hasAuthority('USER')")
    public ResponseEntity<Feedback> addFeedBack(@RequestBody Feedback feedback){
        try{
            return ResponseEntity.status(201).body(feedbackServiceImpl.addFeedback(feedback));
        }
        catch(Exception e){
            return ResponseEntity.status(500).body(null);
        }
    }

    //Gets the feedback by UserId which can be accessed by User
    @GetMapping("/user/{userId}")
    @PreAuthorize("hasAuthority('USER')")
    public ResponseEntity<List<Feedback>> getFeedbackByUserId(@PathVariable Long userId)
    {
    try{
        return ResponseEntity.status(200).body(feedbackServiceImpl.getFeedbackByUserId(userId));
    }
    catch(Exception e){
        return ResponseEntity.status(500).body(null);

    }
    }

}
