import { Component, OnInit } from '@angular/core';
import { Feedback } from 'src/app/models/feedback.model';
import { User } from 'src/app/models/user.model';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-adminviewfeedback',
  templateUrl: './adminviewfeedback.component.html',
  styleUrls: ['./adminviewfeedback.component.css']
})
export class AdminviewfeedbackComponent implements OnInit {
feedbacks: Feedback[]=[];
isPopupVisible = false;
currentUser:User;

  constructor(private feedbackService: FeedbackService) { }

  ngOnInit(): void {
    this.loadFeedbacks();
  }
  loadFeedbacks(): void {
    this.feedbackService.getFeedbacks().subscribe(
      (data: any[]) => {
        this.feedbacks = data;
        console.log("getting admin feedbacks", this.feedbacks);
      },
      (error) => {
        console.error('Error fetching feedbacks', error);
      }
    );
  }

  showProfile(user:User): void {
    this.isPopupVisible=true;
    this.currentUser=user;

  }
  closePopup():void{
    this.isPopupVisible=false;
  }
}
  