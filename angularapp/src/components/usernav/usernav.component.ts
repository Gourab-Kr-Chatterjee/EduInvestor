import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-usernav',
  templateUrl: './usernav.component.html',
  styleUrls: ['./usernav.component.css']
})
export class UsernavComponent {
  constructor(private authService : AuthService, private router : Router) { }
  currentLoggedinUser:string;
  showLogoutPopup=false;
  



  avatarSvg =`https://api.dicebear.com/9.x/initials/svg?seed=${localStorage.getItem('username')}&backgroundType=gradientLinear&fontFamily=Helvetica`


  ngOnInit(): void {
    this.currentLoggedinUser=localStorage.getItem('username')
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
    localStorage.clear();
    this.showLogoutPopup=false;
  }
}
