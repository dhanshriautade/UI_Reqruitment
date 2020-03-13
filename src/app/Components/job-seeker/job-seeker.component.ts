import { Component, OnInit } from '@angular/core';
import { TeamService } from 'src/services/team.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-job-seeker',
  templateUrl: './job-seeker.component.html',
  styleUrls: ['./job-seeker.component.scss']
})
export class JobSeekerComponent implements OnInit {
  data: any = [];
  term;
  ProfileData;
  constructor(public TeamService: TeamService, public router: Router, ) {

    this.TeamService.GetProfile(localStorage.getItem('email')).subscribe((res: any) => {
      this.ProfileData = res;
    })

    this.TeamService.Getalljob().subscribe(res => {
         this.data = res;
    console.log('HIII',this.data)
     })
  }


  viewJobId(jobid: any) {
    let selectedJobIdIndex: string = "";
    for (var i = 0; i < this.data.length; i++) {
      if (jobid === this.data[i].jobId) {

        selectedJobIdIndex = i + "";
        break;
      }
    }

    // console.log(index);
    localStorage.setItem('ViewJobId', selectedJobIdIndex);
    this.router.navigateByUrl('/User/ApplyJob');

  }
  ngOnInit() {
  }

}
