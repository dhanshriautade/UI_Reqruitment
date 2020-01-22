import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Components/login/login.component';
import { SignupComponent } from './Components/signup/signup.component';
import { ForgotComponent } from './Components/forgot/forgot.component';
import { HrDashboardComponent } from './Components/hr-dashboard/hr-dashboard.component';
import { EmpDashboardComponent } from './Components/emp-dashboard/emp-dashboard.component';
import { AdminComponent } from './Components/admin/admin.component';
import { JobSeekerComponent } from './Components/job-seeker/job-seeker.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { HomeComponent } from './Components/home/home.component';
import { HeaderComponent } from './Components/header/header.component';
import { EmployeeComponent } from './Components/employee/employee.component';
import { JobComponent } from './Components/job/job.component';
import { ResetPasswordComponent } from './Components/reset-password/reset-password.component';
import { MainComponent } from './Components/main/main.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ForgotComponent,
    HrDashboardComponent,
    EmpDashboardComponent,
    AdminComponent,
    JobSeekerComponent,
    ProfileComponent,
    HomeComponent,
    HeaderComponent,
    EmployeeComponent,
    JobComponent,
    ResetPasswordComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
