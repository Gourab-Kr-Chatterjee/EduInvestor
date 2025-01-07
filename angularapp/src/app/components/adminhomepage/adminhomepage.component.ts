import { Component, OnInit } from '@angular/core';
import { LoanApplication } from 'src/app/models/loanapplication.model';
import { LoanService } from 'src/app/services/loan.service';

@Component({
  selector: 'app-adminhomepage',
  templateUrl: './adminhomepage.component.html',
  styleUrls: ['./adminhomepage.component.css']
})
export class AdminhomepageComponent implements OnInit {
  loanApplications:LoanApplication[]=[]

  constructor(private loan : LoanService) { }

  ngOnInit(): void {
    this.startNewsSlider();
    this.getLoanAppliedApplications();
  }

  startNewsSlider(): void {
    const newsList = document.getElementById('news-list');
    if (newsList) {
      let top = 0;
      setInterval(() => {
        top -= 32; // Adjust this value based on the height of each news item
        if (top <= -newsList.scrollHeight) {
          top = 0;
        }
        newsList.style.top = `${top}px`;
      }, 1300); // Adjust the interval as needed
    }
  }

  getLoanAppliedApplications(){
    this.loan.getAllLoanApplications().subscribe((data : any[]) =>{
      this.loanApplications = data;
      console.log(data);
    })
  }
}
