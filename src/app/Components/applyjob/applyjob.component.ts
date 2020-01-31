import { Component, OnInit } from '@angular/core';
import { TeamService } from 'src/services/team.service';

@Component({
  selector: 'app-applyjob',
  templateUrl: './applyjob.component.html',
  styleUrls: ['./applyjob.component.scss']
})
export class ApplyjobComponent implements OnInit {
  data;
  viewalljobid;
  dataone;
  constructor(public TeamService: TeamService) {
    this.viewalljobid = localStorage.getItem('ViewJobId')

    this.TeamService.Getalljob().subscribe(res => {
      this.data = res;
      this.dataone = (res[this.viewalljobid]);
      localStorage.setItem('ApplyJobId',  this.dataone.jobId);

    })
  }


  ApplyJob() {
   
    this.data = {
    
        "emailId": localStorage.getItem('email'),
        "jobId": localStorage.getItem('ApplyJobId')
    
    }

    this.TeamService.ApplyJob(this.data).subscribe(res => {
      console.log('job', res);
    })
  }

  ngOnInit() {
  }

}
