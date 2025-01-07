import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Loan } from 'src/app/models/loan.model';
import { LoanApplication } from 'src/app/models/loanapplication.model';
import { LoanService } from 'src/app/services/loan.service';

@Component({
  selector: 'app-loanform',
  templateUrl: './loanform.component.html',
  styleUrls: ['./loanform.component.css']
})
export class LoanformComponent implements OnInit {
  loanApplicationForm: FormGroup;
  isApplicationSubmitted=false;

  loanApplication: LoanApplication = {
    user: {
      userId: 0
    },
    loan: {
      loanId: 0
    }
  };

  loans: Loan[] = [];
  errorLoanLimit: string;
  currentTutionFee: number;
  currentSelectedLoanId: number;
  currentSelectedLoan: Loan[] = [];
  selectedFile: File;

  constructor(private formBuilder: FormBuilder, private loanService: LoanService, private router: Router) { 
    this.loanApplicationForm = this.formBuilder.group({
      institution: ['', Validators.required],
      course: ['', Validators.required],
      tuitionFee: [null, Validators.required],
      address: ['', Validators.required],
      file: ['', Validators.required],
      selectedLoanId: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loanApplicationForm = this.formBuilder.group({
      institution: ['', Validators.required],
      course: ['', Validators.required],
      tuitionFee: [null, Validators.required],
      address: ['', Validators.required],
      file: ['', Validators.required],
      selectedLoanId: ['', Validators.required],
    });

    this.loanService.getAllLoans().subscribe(data => {
      this.loans = data;
    });
  }

  onSubmit() {
    if (this.validateTutionFee()) {
      this.loanApplication.user.userId = +localStorage.getItem('userId');
      this.loanApplication.loan.loanId = this.loanApplicationForm.value.selectedLoanId;
      this.loanApplication.institution = this.loanApplicationForm.value.institution;
      this.loanApplication.course = this.loanApplicationForm.value.course;
      this.loanApplication.tuitionFee = this.loanApplicationForm.value.tuitionFee;
      this.loanApplication.loanStatus = 0;
      this.loanApplication.address = this.loanApplicationForm.value.address;

      const formData = new FormData();
      formData.append('file', this.selectedFile);
      formData.append('course', this.loanApplication.course);
      formData.append('institution', this.loanApplication.institution);
      formData.append('tuitionFee', this.loanApplication.tuitionFee.toString());
      formData.append('loanStatus', this.loanApplication.loanStatus.toString());
      formData.append('address', this.loanApplication.address);
      formData.append('user.userId', this.loanApplication.user.userId.toString());
      formData.append('loan.loanId', this.loanApplication.loan.loanId.toString());

      this.loanService.addLoanApplication(formData).subscribe(data => {
        console.log('successfully added loan application', data);
        this.isApplicationSubmitted=true;
        this.loanApplicationForm.reset();
      });
    } else {
      console.log("Not possible to apply this Loan");
      this.isApplicationSubmitted = false;
      this.loanApplicationForm.reset();
    }
  }

  selectedLoan() {
    this.currentSelectedLoan = this.loans.filter(loan => loan.loanId == this.currentSelectedLoanId);
  }

  validateTutionFee() {
    if (this.currentTutionFee > this.currentSelectedLoan[0].maximumAmount) {
      this.errorLoanLimit = `Tuition fee should be less than Rs. ${this.currentSelectedLoan[0].maximumAmount}`;
      return false;
    } else {
      this.errorLoanLimit = null;
      return true;
    }
  }

  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
  }

  closePopup() {
    this.isApplicationSubmitted = false;
    this.loanApplicationForm.reset();

  }
}
