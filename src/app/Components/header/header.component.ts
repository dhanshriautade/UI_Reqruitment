import { Component, OnInit } from '@angular/core';
import { TeamService } from 'src/services/team.service';
import { Router } from '@angular/router';
import { HttpClientModule, HttpHeaders, HttpClient, HttpRequest, HttpResponse, HttpEventType, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  notificationData;
  notificationDataReminder;
  count;
  allocatedJobSeeker;
  noteData;
  role;
  display= false;
  NotificationGetData;
  constructor(public TeamService: TeamService, public router: Router,private http: HttpClient) { 
  this.role =localStorage.getItem('role');
  console.log(this.role)
  
  }

  viewProfile(email:any,JobId:any){
    this.NotificationGetData = email;
    localStorage.setItem('NotificationGetData', this.NotificationGetData);
    localStorage.setItem('NotificationGetDataJobId', JobId);
   
    this.router.navigateByUrl('/User/ViewCandidate');
  
  
    }

    LogOut(){
        localStorage.clear();
        this.router.navigateByUrl('');
    }

    EmployeePage(){
      this.router.navigateByUrl('/HR/team');

    }
    job(){
      this.router.navigateByUrl('User/candidate');
    }

    EditProfileSeeker(){
      this.router.navigateByUrl('User/Profile/Seeker');
    }
    EditProfile(){
      this.router.navigateByUrl('User/Profile');
    }
    downloadResume(){
      var filepath = this.allocatedJobSeeker.candidateDocument;
      var request = {
        downloadDocPath: filepath
      }
  
      let headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });
      this.http.post("http://localhost:8081/downloadCandidateDocument", request, { headers: headers, responseType: 'blob' }).subscribe((response: any) => {
  
        saveAs(response, this.allocatedJobSeeker.candidateDocument.split('/')[this.allocatedJobSeeker.candidateDocument.split('/').length - 1])
      });
  
    }

  ngOnInit() {
    console.log(localStorage.getItem('role'));
    if(localStorage.getItem('role') == '2'){
      this.TeamService.getNotification().subscribe((res: any) => {
        // console.log(res);
        this.notificationData = res.finalNotificationResponse;
        this.count = this.notificationData.length; 
      })
       this.count = this.count;
      this.TeamService.getNotificationReminder().subscribe((res: any) => {
        this.notificationDataReminder = res.hrCandidateInterviewDto;
       
        this.count = this.count + this.notificationDataReminder.length;    
             })
             this.count =  this.count;

    }
  
    if(localStorage.getItem('role') == '3'){
      this.TeamService.getNotificationReminder().subscribe((res: any) => {
        if(localStorage.getItem('id') ===  res.hrCandidateInterviewDto[0].employeeId)
        {
          this.notificationDataReminder = res.hrCandidateInterviewDto;
          this.count = this.notificationDataReminder.length; 
   
        }
      })

      var email =  localStorage.getItem('email')
      this.TeamService.getAllocatedJobseeker(email).subscribe((res: any) => {
        this.allocatedJobSeeker =  res;
        this.count = this.count + this.allocatedJobSeeker.length;    
      
      })
      this.count =  this.count;
    }

  }

}
