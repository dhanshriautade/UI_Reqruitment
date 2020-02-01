import { Component, OnInit } from '@angular/core';
import { TeamService } from 'src/services/team.service';


@Component({
  selector: 'app-viewcandidateapply',
  templateUrl: './viewcandidateapply.component.html',
  styleUrls: ['./viewcandidateapply.component.scss']
})
export class ViewcandidateapplyComponent implements OnInit {
  ProfileData;
  email_id;
  constructor(public TeamService: TeamService,) {
    this.email_id = localStorage.getItem('email');
   }
  
  ngOnInit() {
    this.getProfileEmployee();
  }
  getProfileEmployee() {
    var email = this.email_id;
    this.TeamService.GetProfile(email).subscribe((res: any) => {
      this.ProfileData = res;
    })
  }

}
