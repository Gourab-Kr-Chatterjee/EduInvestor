import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Loan } from 'src/app/models/loan.model';
import { LoanService } from 'src/app/services/loan.service';

@Component({
  selector: 'app-viewloan',
  templateUrl: './viewloan.component.html',
  styleUrls: ['./viewloan.component.css']
})
export class ViewloanComponent implements OnInit {
  allLoans: Loan[] = [];
  tempLoans: Loan[] = [];
  sortTerm = "sortbyAmount";
  currentLoanId:number;
  editLoanId:number;

  searchTerm: string = "";
  deleteErrorMessage: any=null;

  constructor(private loanService: LoanService, private router: Router) { }

  ngOnInit(): void {
    this.getAllLoans();
  }
  getAllLoans() {

    this.loanService.getAllLoans().subscribe(data => {
      this.allLoans = data;
      this.tempLoans = data;
      console.log("getting all data", this.allLoans);
    })
  }

  EditLoan(loanId: number) {
    this.router.navigate(['/admin/editLoan', loanId]);
  }

  DeleteLoan(loanId: number) {
    this.loanService.deleteLoan(loanId).subscribe(data => {
      console.log("loan deleted Successfully", data);
      this.getAllLoans();
    },
    error=>{
      this.deleteErrorMessage = "Can't Delete!! This loan is already assigned to a loan application."
      console.error("Nahi hoga delete.",error)
      setTimeout(() => {
        this.deleteErrorMessage=null;
      }, 3000);

    }
    )
  }

  showModal(loanId: number) {
    this.currentLoanId = loanId;
    document.getElementById('myModal').style.display = "block";
  }

  closeModal() {
    document.getElementById('myModal').style.display = "none";
  }

  giveModal(loanId: number) {
    this.editLoanId = loanId;
    document.getElementById('mModal').style.display = "block";
  }

  clModal() {
    document.getElementById('mModal').style.display = "none";
  }

  confirmEdit() {
    this.EditLoan(this.editLoanId);
    this.clModal();
  }


  confirmDelete() {
    this.DeleteLoan(this.currentLoanId);
    this.closeModal();
  }

  FilterLoan() {
    let term: string = this.searchTerm.toLowerCase();
    this.allLoans = this.tempLoans.filter(loan => loan.loanType.toLowerCase().includes(term));

  }

  sortLoan() {
    if (this.sortTerm == "high") {
      this.allLoans.sort((l1, l2) => l2.maximumAmount - l1.maximumAmount);
    }
    else if (this.sortTerm == "low") {

      this.allLoans.sort((l1, l2) => l1.maximumAmount - l2.maximumAmount);
    }
    else {

    }
  }

}
