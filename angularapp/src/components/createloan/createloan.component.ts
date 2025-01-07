import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoanService } from 'src/app/services/loan.service';

@Component({
  selector: 'app-createloan',
  templateUrl: './createloan.component.html',
  styleUrls: ['./createloan.component.css']
})
export class CreateloanComponent implements OnInit {
  loanForm : FormGroup
  isLoanAdded=false;
  duplicateErrorMessage:string = null;
  constructor(private formBuilder : FormBuilder, private loanService:LoanService,private router:Router) {
    this.loanForm = this.formBuilder.group({
      loanType : this.formBuilder.control("",Validators.required),
      description : this.formBuilder.control("",Validators.required),
      interestRate : this.formBuilder.control("",Validators.required),
      maximumAmount : this.formBuilder.control("",Validators.required),
      repaymentTenure : this.formBuilder.control("",Validators.required),
      eligibility : this.formBuilder.control("",Validators.required),
      documentsRequired : this.formBuilder.control("",Validators.required)
    })
   }

  ngOnInit(): void {
    this.loanForm = this.formBuilder.group({
      loanType : this.formBuilder.control("",Validators.required),
      description : this.formBuilder.control("",Validators.required),
      interestRate : this.formBuilder.control("",Validators.required),
      maximumAmount : this.formBuilder.control("",[Validators.required, Validators.min(0)]),
      repaymentTenure : this.formBuilder.control("",Validators.required),
      eligibility : this.formBuilder.control("",Validators.required),
      documentsRequired : this.formBuilder.control("",Validators.required)
    })
  }
  closePopup() {
    this.isLoanAdded = false;
    this.loanForm.reset();

  }
  onSubmit() {
    this.loanService.addLoan(this.loanForm.value).subscribe(data=>{
      console.log("Adding loan successfully", data);
      this.isLoanAdded=true;
     this.loanForm.reset();
    },
    error=>{
      console.error("error aaya", error)
      this.duplicateErrorMessage="This loan already exists!!"
      setTimeout(() => {
        this.duplicateErrorMessage=null;
      }, 3000);
    }
    )
  }
}