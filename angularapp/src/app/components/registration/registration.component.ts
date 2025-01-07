import { Component, OnInit } from '@angular/core';

import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';
import { LoanService } from 'src/app/services/loan.service';

@Component({

  selector: 'app-registration',


  templateUrl: './registration.component.html',

  styleUrls: ['./registration.component.css']

})

export class RegistrationComponent implements OnInit {
  registerErrorMessage:string=null;
  registrationForm: FormGroup;
  user = {
    username: '',
    email:'',
    password: '',
    confirmPassword: '',
    role: ''
  };
  isRegistrationSuccessful = false;
  constructor(private fb: FormBuilder, private authService: AuthService, private loanService: LoanService,private router:Router) {

  }
  
  ngOnInit(): void {

    this.registrationForm = this.fb.group({

      email: ['', [Validators.required, Validators.email]],

      password: ['', [

        Validators.required,

        Validators.minLength(8),

        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')

      ]],

      confirmPassword: ['', Validators.required],
      
      username: ['', Validators.required],

      userRole: ['', Validators.required],

      mobileNumber: ['', [

        Validators.required,

        Validators.pattern('^[0-9]{10}$')

      ]]
    },
    {validators: this.mustMatch(
      'password','confirmPassword'
      )});
  }

    mustMatch(controlName: string, matchingControlName: string) {
      return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];
   
        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
          return;
        }
   
        if (control.value !== matchingControl.value) {
          matchingControl.setErrors({ mustMatch: true });
        } else {
          matchingControl.setErrors(null);
        }
      };
    }

  onSubmit() {
    this.authService.register(this.registrationForm.value).subscribe(data => {
      console.log("User successfully registerd", data);
      this.isRegistrationSuccessful = true;

    },
    error=>{
      this.registerErrorMessage="Username or mobile number already registered.";
      setTimeout(() => {
        this.registerErrorMessage=null;
        this.registrationForm.reset();
      }, 3000);
    }
    
    )

  }
   
  closePopup() {
    this.isRegistrationSuccessful = false;
    this.registrationForm.reset();

  }

  togglePasswordVisibility(fieldId: string, iconId: string): void {
    const passwordInput = document.getElementById(fieldId) as HTMLInputElement;
    const toggleIcon = document.getElementById(iconId) as HTMLElement;

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleIcon.classList.remove('fa-eye');
        toggleIcon.classList.add('fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        toggleIcon.classList.remove('fa-eye-slash');
        toggleIcon.classList.add('fa-eye');
    }
}
  

  randomImageUrl: string;
  randomImageUrlFunc(callback: (url: string) => void): void {
    this.loanService.randomImageUrl().subscribe(blob => {
      const reader = new FileReader();
      reader.onloadend = () => {
        this.randomImageUrl = reader.result as string;
        callback(this.randomImageUrl);
      };
      reader.readAsDataURL(blob);
    });
  }

}
