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
  display= false;
  constructor(public TeamService: TeamService,) { 
    this.TeamService.getNotification().subscribe((res: any) => {
      console.log(res);
      this.notificationData = res.finalNotificationResponse;
     
    })
  
  }

  viewProfile(index:any){
    this.noteData=this.notificationData[index];
      this.display=true;
  
  
    }

  ngOnInit() {
  }

}
