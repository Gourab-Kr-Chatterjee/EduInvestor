import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Loan } from 'src/app/models/loan.model';
import { LoanService } from 'src/app/services/loan.service';

@Component({
  selector: 'app-userviewloan',
  templateUrl: './userviewloan.component.html',
  styleUrls: ['./userviewloan.component.css']
})
export class UserviewloanComponent implements OnInit {
  loans : Loan[] = []
  searchTerm: string;
  tempLoans: any;
  sortTerm: string = "Sort by Amount";
  

  constructor(private loanService : LoanService, private router : Router) { }

  ngOnInit(): void {
    this.getAllLoans();
  }

  applyForLoan(loanId : number){
    this.router.navigate(['/loanform',loanId]);
  }

  getAllLoans(){
    this.loanService.getAllLoans().subscribe(data =>{
      this.loans = data;
      this.tempLoans=data;
    })
  }

  filterLoan(){
    let term:string = this.searchTerm.toLowerCase();
   this.loans = this.tempLoans.filter(loan => loan.loanType.toLowerCase().includes(term));
  }

  sortLoan(){
    if(this.sortTerm=="high"){
      this.loans.sort((l1,l2)=> l2.maximumAmount - l1.maximumAmount);
    }
    else if(this.sortTerm=="low"){
      
      this.loans.sort((l1,l2)=> l1.maximumAmount - l2.maximumAmount);
    }
    else{

    }
  }

  calculateRepayment(maximumAmount: number, interestRate: number, repaymentTenure: number): string {
    let time:number = repaymentTenure/12;
    let amount : number = maximumAmount+ ((maximumAmount*interestRate*time)/100);
    return ((amount*200)/(time*(200+(time-1)*interestRate))/12).toFixed(2);
  }
  

}
