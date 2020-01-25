import { Component, OnInit } from '@angular/core';
import { TeamService } from 'src/services/team.service';
@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {
  getAllEmployeedata;
  data
  infodetailemployee
  constructor(public TeamService: TeamService,) { 


    this.TeamService.GetAllEmployee().subscribe(res => {
      this.getAllEmployeedata = res;
      this.infodetailemployee = [];
       let keys = Object.keys(this.getAllEmployeedata);
     console.log('keys', keys);
      for (var i = 0; i < keys.length; i++) {
        this.infodetailemployee.push(this.getAllEmployeedata[keys[i]]);
      }

      console.log(this.infodetailemployee);
    
  })
  }

  ngOnInit() {
  }

}
