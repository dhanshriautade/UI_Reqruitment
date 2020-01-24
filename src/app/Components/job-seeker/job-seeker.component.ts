import { Component, OnInit } from '@angular/core';
import { TeamService } from 'src/services/team.service';

@Component({
  selector: 'app-job-seeker',
  templateUrl: './job-seeker.component.html',
  styleUrls: ['./job-seeker.component.scss']
})
export class JobSeekerComponent implements OnInit {
  data;
  term;
  constructor(public TeamService: TeamService) { 

    this.TeamService.Getalljob().subscribe(res => {
      console.log(res);
      this.data = res;
      console.log(this.data.length);
     })
  }

  ngOnInit() {
  }

}
