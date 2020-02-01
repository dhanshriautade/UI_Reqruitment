import { Component, OnInit } from '@angular/core';
import { TeamService } from 'src/services/team.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  notificationData;
  noteData;
  role;
  display= false;
  constructor(public TeamService: TeamService,) { 
  this.role =localStorage.getItem('role');
  console.log(this.role)
  
  }

  viewProfile(index:any){
    this.noteData=this.notificationData[index];
      this.display=true;
  
  
    }

  ngOnInit() {
    console.log(localStorage.getItem('role'));
    if(localStorage.getItem('role') == '2'){
      this.TeamService.getNotification().subscribe((res: any) => {
        console.log(res);
        this.notificationData = res.finalNotificationResponse;
       
      })
    }
  
  }

}
