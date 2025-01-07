import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { CreateloanComponent } from './components/createloan/createloan.component';
import { AdminhomepageComponent } from './components/adminhomepage/adminhomepage.component';
import { UserhomepageComponent } from './components/userhomepage/userhomepage.component';
import { RequestedloanComponent } from './components/requestedloan/requestedloan.component';
import { AdminviewfeedbackComponent } from './components/adminviewfeedback/adminviewfeedback.component';
import { UserviewloanComponent } from './components/userviewloan/userviewloan.component';
import { LoanformComponent } from './components/loanform/loanform.component';
import { UseraddfeedbackComponent } from './components/useraddfeedback/useraddfeedback.component';
import { UserappliedloanComponent } from './components/userappliedloan/userappliedloan.component';
import { AdmineditloanComponent } from './components/admineditloan/admineditloan.component';
import { ViewloanComponent } from './components/viewloan/viewloan.component';
import { UserviewfeedbackComponent } from './components/userviewfeedback/userviewfeedback.component';
import { ErrorComponent } from './components/error/error.component';
import { ContactusComponent } from './components/contactus/contactus.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"login",component:LoginComponent},
  {path:"register",component:RegistrationComponent},

  
  {path:"admin/edu-loans",component:CreateloanComponent,canActivate: [AuthGuard], data: { role:'ADMIN'}},
  {path:"admin/edu-loan-requests",component:RequestedloanComponent,canActivate: [AuthGuard], data: { role:'ADMIN'}},
  {path:"admin/feedbacks",component:AdminviewfeedbackComponent,canActivate: [AuthGuard], data: { role:'ADMIN'}},
  {path:"admin/editLoan/:loanId",component:AdmineditloanComponent,canActivate: [AuthGuard], data: { role:'ADMIN'}},
  {path:"admin/allLoans",component:ViewloanComponent,canActivate: [AuthGuard], data: { role:'ADMIN'}},
  {path:"view-loan",component:ViewloanComponent,canActivate: [AuthGuard], data: { role:'ADMIN'}},


  {path:"userHomePage",component:UserhomepageComponent,canActivate: [AuthGuard], data: { role:'USER'}},
  {path:"adminHomePage",component:AdminhomepageComponent,canActivate: [AuthGuard], data: { role:'ADMIN'}},


  {path:"edu-loans",component:UserviewloanComponent,canActivate: [AuthGuard], data: { role:'USER'}},
  {path:"apply-loan",component:LoanformComponent,canActivate: [AuthGuard], data: { role:'USER'}},
  {path:"feedback",component:UseraddfeedbackComponent,canActivate: [AuthGuard], data: { role:'USER'}},
  {path:"userFeedback",component:UserviewfeedbackComponent,canActivate: [AuthGuard], data: { role:'USER'}},
  {path:"applied-loan",component:UserappliedloanComponent,canActivate: [AuthGuard], data: { role:'USER'}},
  {path:"contactus",component:ContactusComponent,canActivate: [AuthGuard], data: { role:['USER', 'ADMIN']}},
  
  {path:"**",component:ErrorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
