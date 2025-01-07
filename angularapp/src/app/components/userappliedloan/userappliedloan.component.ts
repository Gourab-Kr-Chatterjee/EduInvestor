import { Component, OnInit } from '@angular/core';
import { LoanApplication } from 'src/app/models/loanapplication.model';
import { LoanService } from 'src/app/services/loan.service';

@Component({
  selector: 'app-userappliedloan',
  templateUrl: './userappliedloan.component.html',
  styleUrls: ['./userappliedloan.component.css']
})
export class UserappliedloanComponent implements OnInit {
  appliedLoans: LoanApplication[] = []
  showImagePopup = false;
  selectedImageData: string | null = null;
  constructor(private loanService: LoanService) { }

  ngOnInit(): void {
    this.getAppliedLoans(+localStorage.getItem('userId'));
  }

  getAppliedLoans(userId: number) {
    this.loanService.getAppliedLoans(userId).subscribe(data => {
      this.appliedLoans = data;
      console.log(this.appliedLoans);
    });
  }


  showProof(imageData: string) {
    this.selectedImageData = imageData;
    this.showImagePopup = true;
  }


  closePopup() {
    this.showImagePopup = false;
    this.selectedImageData = null;
  }

}
