import { Component, OnInit } from '@angular/core';
import { TeamService } from 'src/services/team.service';
@Component({
  selector: 'app-hr-dashboard',
  templateUrl: './hr-dashboard.component.html',
  styleUrls: ['./hr-dashboard.component.scss']
})
export class HrDashboardComponent implements OnInit {
  data;
  term;
  constructor(public TeamService: TeamService) { }

  ngOnInit() {
    this.TeamService.Getalljob().subscribe(res => {
      this.data = res;
      console.log(this.data)

    })
  }

}
