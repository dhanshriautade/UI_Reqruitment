import { Component, OnInit } from '@angular/core';
import { TeamService } from 'src/services/team.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-job-seeker',
  templateUrl: './job-seeker.component.html',
  styleUrls: ['./job-seeker.component.scss']
})
export class JobSeekerComponent implements OnInit {
  data;
  term;
  constructor(public TeamService: TeamService,public router: Router,) { 

    this.TeamService.Getalljob().subscribe(res => {
         this.data = res;
    
     })
  }


  viewJobId(index:any){
    // console.log(index);
    localStorage.setItem('ViewJobId', index);
    this.router.navigateByUrl('/User/ApplyJob');

   }
  ngOnInit() {
  }

}
