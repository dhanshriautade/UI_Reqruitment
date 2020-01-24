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
       console.log(res[ this.viewalljobid]);
      this.data = res;
      console.log(this.data.length);
     this.dataone=(res[ this.viewalljobid]);
     })
  }


  ngOnInit() {
  }

}
