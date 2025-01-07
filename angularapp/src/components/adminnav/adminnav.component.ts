import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-adminnav',
  templateUrl: './adminnav.component.html',
  styleUrls: ['./adminnav.component.css']
})
export class AdminnavComponent {
  currentLoggedinUser:string;
  showLogoutPopup = false;
  avatarSvg =`https://api.dicebear.com/9.x/initials/svg?seed=${localStorage.getItem('username')}&backgroundType=gradientLinear&fontFamily=Helvetica`

  constructor(private authService : AuthService, private router : Router){
    this.currentLoggedinUser=localStorage.getItem('username')
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
    localStorage.clear();
    this.showLogoutPopup = false;
  }

  


}

