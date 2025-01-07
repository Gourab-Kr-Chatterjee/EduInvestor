import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feedback } from 'src/app/models/feedback.model';
import { AuthService } from 'src/app/services/auth.service';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-useraddfeedback',
  templateUrl: './useraddfeedback.component.html',
  styleUrls: ['./useraddfeedback.component.css']
})
export class UseraddfeedbackComponent implements OnInit {
  feedbackForm: FormGroup;
  showPopup: boolean = false;
  feedback: Feedback = {
    feedbackText:'',
    user:{
      userId:0,
      email:'',
      password:'',

    }
    
  };
  constructor(private fb: FormBuilder, private feedbackService: FeedbackService, private authService: AuthService) { }

  ngOnInit(): void {
    this.feedbackForm = this.fb.group({
      feedbackText: ['', Validators.required]
    });
  }

  
  onSubmit() {
    this.feedback.feedbackText= this.feedbackForm.value.feedbackText;
    this.feedback.user.userId = +localStorage.getItem('userId');
    
    this.feedbackService.sendFeedback(this.feedback).subscribe(data => {
      console.log("feedback Submitted",data);
    })

    if (this.feedbackForm.valid) {
      this.showPopup = true;
    }
  }
  
  closePopup() {
    this.showPopup = false;
    this.feedbackForm.reset();
  }
  get feedbackText() {
    return this.feedbackForm.get('feedbackText');
  }
}
