import { Component, OnInit } from '@angular/core';
import { TeamService } from 'src/services/team.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  notificationData;
  notificationDataReminder;
  count;
  noteData;
  role;
  display= false;
  NotificationGetData;
  constructor(public TeamService: TeamService, public router: Router) { 
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
        debugger;
        this.count = this.count + this.notificationDataReminder.length;    
             })
             this.count =  this.count;

    }
  
    if(localStorage.getItem('role') == '3'){
      debugger;
      this.TeamService.getNotificationReminder().subscribe((res: any) => {
        if(localStorage.getItem('id') ===  res.hrCandidateInterviewDto[0].employeeId)
        {
          this.notificationDataReminder = res.hrCandidateInterviewDto;

        }
      })

      var email =  localStorage.getItem('email')
      this.TeamService.getAllocatedJobseeker(email).subscribe((res: any) => {
      })
    }

  }

}
