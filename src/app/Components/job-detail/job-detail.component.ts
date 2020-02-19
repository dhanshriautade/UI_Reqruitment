import { Component, OnInit } from '@angular/core';

import { TeamService } from 'src/services/team.service';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.scss']
})
export class JobDetailComponent implements OnInit {
  displaydilog: boolean;
  isActive: boolean;
  data;
  term;

  constructor(public TeamService: TeamService) {
    this.TeamService.getJobIdWiseDetail(localStorage.getItem('jobByIdDetail')).subscribe((res: any) => {
      this.data =  res;
       
    })
   }

  showTest(){
    this.displaydilog=true;
  }
  onClick() {
    this.isActive = !this.isActive;
    
  }
 
  ngOnInit() {
  }

}

