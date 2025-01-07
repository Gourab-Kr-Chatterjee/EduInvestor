import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Loan } from 'src/app/models/loan.model';
import { LoanService } from 'src/app/services/loan.service';

@Component({
  selector: 'app-admineditloan',
  templateUrl: './admineditloan.component.html',
  styleUrls: ['./admineditloan.component.css']
})
export class AdmineditloanComponent implements OnInit {
selectedLoan:any=null;
selectedId:number;
newLoan:Loan={
  loanType:"",
  description:"",
  interestRate:0,
  maximumAmount:0,
  repaymentTenure:0,
  eligibility:"",
  documentsRequired:""
}
  constructor(private loanService:LoanService, private route:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(param =>{
      this.selectedId = +param.get('loanId');
    })
    this.loanService.getLoanById(this.selectedId).subscribe(data=>{
      this.newLoan=data;
      console.log(this.newLoan)
    })
  }
  updateLoan()
  {
    this.loanService.updateLoan(this.selectedId,this.newLoan).subscribe((data)=>{
      console.log(data);
      this.selectedLoan=null;
      this.router.navigate(['/admin/allLoans'])
    });
  }
  getBack()
  {
    this.router.navigate(['/view-loan'])
  }
}
