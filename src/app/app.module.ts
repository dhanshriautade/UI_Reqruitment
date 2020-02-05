import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Components/login/login.component';
import { SignupComponent } from './Components/signup/signup.component';
import { ForgotComponent } from './Components/forgot/forgot.component';
import { HrDashboardComponent } from './Components/hr-dashboard/hr-dashboard.component';
import { AdminComponent } from './Components/admin/admin.component';
import { JobSeekerComponent } from './Components/job-seeker/job-seeker.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { HomeComponent } from './Components/home/home.component';
import { HeaderComponent } from './Components/header/header.component';
import { EmployeeComponent } from './Components/employee/employee.component';
import { JobComponent } from './Components/job/job.component';
import { ResetPasswordComponent } from './Components/reset-password/reset-password.component';
import { MainComponent } from './Components/main/main.component';
import { ToastrModule } from 'ngx-toastr';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {CardModule} from 'primeng/card';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApplyjobComponent } from './Components/applyjob/applyjob.component';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ViewJobComponent } from './Components/view-job/view-job.component';
import { AddEmployeeComponent } from './Components/add-employee/add-employee.component';
import {DialogModule} from 'primeng/dialog';
import {ChartModule} from 'primeng/chart';
import {NgxPaginationModule} from 'ngx-pagination';
import { ViewcandidateapplyComponent } from './Components/viewcandidateapply/viewcandidateapply.component';
import { ProfileEmployeeComponent } from './Components/profile-employee/profile-employee.component';
import { ChartsModule } from '@progress/kendo-angular-charts';
import 'hammerjs';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ForgotComponent,
    HrDashboardComponent,
    AdminComponent,
    JobSeekerComponent,
    ProfileComponent,
    HomeComponent,
    HeaderComponent,
    EmployeeComponent,
    JobComponent,
    ResetPasswordComponent,
    MainComponent,
    ApplyjobComponent,
    ViewJobComponent,
    AddEmployeeComponent,
    ViewcandidateapplyComponent,
    ProfileEmployeeComponent
   
  
  
  ],
  imports: [
    ChartsModule,
    NgxPaginationModule,
    ChartModule,
    DialogModule,
    OverlayPanelModule,
    BrowserModule,
    AppRoutingModule,
    AngularFontAwesomeModule,
    FormsModule,
     ReactiveFormsModule,
     DialogModule,
    BrowserAnimationsModule,
    ConfirmDialogModule,
    CardModule,
    Ng2SearchPipeModule,
    HttpClientModule, 
    ToastrModule.forRoot({
      closeButton: true,
      progressBar: true,
      preventDuplicates : true
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
