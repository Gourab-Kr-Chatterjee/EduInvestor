import { Component, OnInit } from '@angular/core';
import { Loan } from 'src/app/models/loan.model';
import { LoanApplication } from 'src/app/models/loanapplication.model';
import { User } from 'src/app/models/user.model';
import { LoanService } from 'src/app/services/loan.service';

@Component({
  selector: 'app-requestedloan',
  templateUrl: './requestedloan.component.html',
  styleUrls: ['./requestedloan.component.css']
})
export class RequestedloanComponent implements OnInit {
  loanApplications:LoanApplication[]=[]
  isPopupVisible = false;
  currentUser:User;
  unableToDelete:string=null;

  constructor(private loan : LoanService) { }

  ngOnInit(): void {
    this.getLoanAppliedApplications();
  }

  getLoanAppliedApplications(){
    this.loan.getAllLoanApplications().subscribe((data : any[]) =>{
      this.loanApplications = data;
      console.log(data);
    })
  }

  showMore(user : User){
    this.isPopupVisible=true;
    this.currentUser=user;
  }

  approve(loanapplication : LoanApplication){
    if(loanapplication.loanStatus < 0){
      this.unableToDelete="Loan already rejected!!";

      setTimeout(() => {
        this.unableToDelete=null
      }, 3000);
    }else{
      loanapplication.loanStatus = 1;
      this.loan.updateLoanStatus(loanapplication.loanApplicationId,loanapplication).subscribe(() =>{
        this.getLoanAppliedApplications();
      })
    }
  }

  reject(loanapplication : LoanApplication){
    if(loanapplication.loanStatus > 0){
      this.unableToDelete="Loan already approved!!";

      setTimeout(() => {
        this.unableToDelete=null
      }, 3000);
    }else{
      loanapplication.loanStatus = -1;
      this.loan.updateLoanStatus(loanapplication.loanApplicationId,loanapplication).subscribe(() =>{
        this.getLoanAppliedApplications();
      })
    }
  }

  closePopup():void{
    this.isPopupVisible=false;
  }


}
