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
  noteData;
  role;
  display= false;
  NotificationGetData;
  constructor(public TeamService: TeamService, public router: Router) { 
  this.role =localStorage.getItem('role');
  console.log(this.role)
  
  }

  viewProfile(email:any){
    this.NotificationGetData = email;
    localStorage.setItem('NotificationGetData', this.NotificationGetData);
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
        console.log(res);
        this.notificationData = res.finalNotificationResponse;
       
      })

      this.TeamService.getNotificationReminder().subscribe((res: any) => {
        console.log(res);
        this.notificationDataReminder = res.hrCandidateInterviewDto;
       
      })
    }
  
    if(localStorage.getItem('role') == '3'){
      this.TeamService.getNotificationReminder().subscribe((res: any) => {
        if(localStorage.getItem('id') ===  res.hrCandidateInterviewDto[0].employeeId)
        {
          this.notificationDataReminder = res.hrCandidateInterviewDto;
        }
      })
    }

  }

}
