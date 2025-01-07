package com.examly.springapp.service;

import java.util.List;
import java.util.Optional;

import com.examly.springapp.model.Feedback;

public interface FeedbackService {
    public Feedback addFeedback(Feedback feedback);
    public List<Feedback> getFeedbackByUserId(Long userId);
    public List<Feedback> getAllFeedbacks();
    public Optional<Feedback> getFeedbackById(Long id);
    public Feedback updateFeedback(Long id,Feedback updatedFeedback);
    public Feedback deleteFeed(Long id);
    public Feedback deleteFeedbackByUser(Long feedbackId);
}
