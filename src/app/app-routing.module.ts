import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { SignupComponent } from './Components/signup/signup.component';
import { ForgotComponent } from './Components/forgot/forgot.component';
import { ResetPasswordComponent } from './Components/reset-password/reset-password.component';
import { MainComponent } from './Components/main/main.component';
import { JobSeekerComponent } from './Components/job-seeker/job-seeker.component';
import { HomeComponent } from './Components/home/home.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { EmployeeComponent } from './Components/employee/employee.component';
import { AdminComponent } from './Components/admin/admin.component';
import { HrDashboardComponent } from './Components/hr-dashboard/hr-dashboard.component';
import { ApplyjobComponent } from './Components/applyjob/applyjob.component';
import { AddEmployeeComponent } from './Components/add-employee/add-employee.component';
import { JobComponent } from './Components/job/job.component';
import { ViewcandidateapplyComponent } from './Components/viewcandidateapply/viewcandidateapply.component';

import { ProfileEmployeeComponent } from './Components/profile-employee/profile-employee.component';
import { JobDetailComponent } from './Components/job-detail/job-detail.component';
import { LatestOpningComponent } from './Components/latest-opning/latest-opning.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'forgot', component: ForgotComponent },
  {path: 'reset/password', component: ResetPasswordComponent },
  {
    path: 'User', component: MainComponent ,
    children:[
      { path: '', redirectTo: 'candidate', pathMatch: 'full' },
      { path: 'candidate', component: JobSeekerComponent},
      { path: 'home', component: HomeComponent}, 
      { path: 'Profile/Seeker', component: ProfileComponent},
      {path:'Profile', component: ProfileEmployeeComponent},
      { path: 'ApplyJob', component: ApplyjobComponent},
      { path: 'ViewCandidate', component: ViewcandidateapplyComponent},
      { path: 'job/detail', component: JobDetailComponent},
      { path: 'job/View', component: LatestOpningComponent}
    ]
  },
  {
    path: 'Employee', component: MainComponent ,
    children:[
      { path: '', redirectTo: 'info', pathMatch: 'full' },
      { path: 'info', component: EmployeeComponent},
      
    ]
  },
  {
    path: 'Admin', component: MainComponent ,
    children:[
      { path: '', redirectTo: 'admin', pathMatch: 'full' },
      { path: 'admin', component: AdminComponent},
      { path: 'job', component: JobComponent},
      
    ]
  },
  {
    path: 'HR', component: MainComponent ,
    children:[
      { path: '', redirectTo: 'HR', pathMatch: 'full' },
      { path: 'HR', component: HrDashboardComponent},
      {path: 'team', component: AddEmployeeComponent}
      
    ]
  },
 
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
