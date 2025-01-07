import { Component, OnInit } from '@angular/core';
import { Feedback } from 'src/app/models/feedback.model';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-userviewfeedback',
  templateUrl: './userviewfeedback.component.html',
  styleUrls: ['./userviewfeedback.component.css']
})
export class UserviewfeedbackComponent implements OnInit {
  feedbacks: Feedback[] = [];
  currentFeedbackId:number;
  constructor(private feedbackService: FeedbackService) { }

  ngOnInit(): void {
    //i have to take userId from the local Storage and then pass
    this.getAllFeedbacks();
    
    
  }
  getAllFeedbacks(){
    this.feedbackService.getAllFeedbacksByUserId(+localStorage.getItem('userId')).subscribe(data=>{
      this.feedbacks=data;
      console.log('getting all feedbacks for userId', this.feedbacks );
  
    })

  }
  deleteFeedback(feedBackId: number) {
    this.feedbackService.deleteFeedbackByUser(feedBackId).subscribe(data=>{
      console.log("deleted successfully", data);
    });
    this.getAllFeedbacks();
  }
  showModal(feedBackId: number) {
    this.currentFeedbackId = feedBackId;
    document.getElementById('myModal').style.display = "block";
  }

  closeModal() {
    document.getElementById('myModal').style.display = "none";
  }

  confirmDelete() {
    this.deleteFeedback(this.currentFeedbackId);
    this.closeModal();
  }

}