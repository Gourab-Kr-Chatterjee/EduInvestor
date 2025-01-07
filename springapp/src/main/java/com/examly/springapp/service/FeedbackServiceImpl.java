package com.examly.springapp.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examly.springapp.model.Feedback;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.FeedbackRepo;
import com.examly.springapp.repository.UserRepo;

@Service
public class FeedbackServiceImpl implements FeedbackService {

    @Autowired
    private FeedbackRepo feedbackRepo;

    @Autowired
    private UserRepo userRepo;

    //Adds feedback by setting with particular User 
    @Override
    public Feedback addFeedback(Feedback feedback) {
        feedback.setDate(LocalDate.now());
        int userId = feedback.getUser().getUserId();
        User user = userRepo.findById(userId).orElse(null);
        feedback.setUser(user);
        return feedbackRepo.save(feedback);
    }

    //Gets feedback using UserId
    @Override
    public List<Feedback> getFeedbackByUserId(Long userId) {
        List<Feedback> allFeedbacks = feedbackRepo.findAll();
        List<Feedback> userFeedbacks = new ArrayList<>();
        for (Feedback feedback : allFeedbacks) {
            if (feedback.getUser().getUserId() == userId) {
                userFeedbacks.add(feedback);
            }
        }
        return userFeedbacks;
    }

    //Getting all the feedbacks 
    @Override
    public List<Feedback> getAllFeedbacks() {
        return feedbackRepo.findAll();
    }

    //Getting all the feedbacks related to particular UserId
    @Override
    public Optional<Feedback> getFeedbackById(Long id) {
        return feedbackRepo.findById(id);
    }

    //Updates feedback based on id 
    @Override
    public Feedback updateFeedback(Long id, Feedback updatedFeedback) {
        Optional<Feedback> existingFeedback = feedbackRepo.findById(id);
        if (existingFeedback.isPresent()) {
            Feedback feedback = existingFeedback.get();
            feedback.setFeedbackText(updatedFeedback.getFeedbackText());
            feedback.setDate(LocalDate.now());
            return feedbackRepo.save(feedback);
        }
        return null;
    }

    //Deletes the feedback by ID
    @Override
    public Feedback deleteFeed(Long id) {
        Feedback feedback = feedbackRepo.findById(id).orElse(null);
        if (feedback != null) {
            feedbackRepo.deleteById(id);
        }
        return feedback;
    }

    //Deletes the feedback by UserID
    @Override
    public Feedback deleteFeedbackByUser(Long feedbackId) {
        Feedback feedback = feedbackRepo.findById(feedbackId).orElse(null);
        if (feedback != null) {
            feedbackRepo.deleteById(feedbackId);
        }
        return feedback;
    }

}