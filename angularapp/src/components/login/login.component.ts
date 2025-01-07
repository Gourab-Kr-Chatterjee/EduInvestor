import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginError: string =null;

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')
      ]]
    });
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')
      ]]
    });
  }

  onSubmit() {
    
      this.authService.login(this.loginForm.value).subscribe(data => {
        console.log("Login Successful", data);
        console.log(localStorage.getItem('userRole'));
        if (localStorage.getItem('userRole') == 'ADMIN') {
          this.router.navigate(['/adminHomePage']);
        }
        else if (localStorage.getItem('userRole') == 'USER') {
          this.router.navigate(['/userHomePage']);
        }
      },
      error=>{
        this.loginError="Invalid Login Credentials!!";
        this.loginForm.reset();
        setTimeout(() => {
          this.loginError=null;
        }, 3000);
      }
      );
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
}