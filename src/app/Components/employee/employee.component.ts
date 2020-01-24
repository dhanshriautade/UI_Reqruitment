import { Component, OnInit } from '@angular/core';
import { TeamService } from 'src/services/team.service';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  data
  constructor(public TeamService: TeamService) { }

  ngOnInit() {
    this.TeamService.Getalljob().subscribe(res => {
      this.data = res;
      console.log(this.data)

    })
  }

}
