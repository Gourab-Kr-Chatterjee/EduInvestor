import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router,private authService: AuthService ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (!this.authService.isLoggedIn()) {
        return this.router.createUrlTree(['/login']);
      }
 
      const requiredRole = route.data['role'] as string;
      
      if (requiredRole === 'ADMIN' && !this.authService.isAdmin()) {
        return this.router.createUrlTree(['/forbidden']);
      }
 
      if (requiredRole === 'USER' && !this.authService.isUser()) {
        return this.router.createUrlTree(['/forbidden']);
      }
   
    return true;
  }
  
}
