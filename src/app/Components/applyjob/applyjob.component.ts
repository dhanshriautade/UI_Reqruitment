import { Component, OnInit, OnDestroy } from '@angular/core';
import { TeamService } from 'src/services/team.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-applyjob',
  templateUrl: './applyjob.component.html',
  styleUrls: ['./applyjob.component.scss']
})
export class ApplyjobComponent implements OnInit, OnDestroy {
  data;
  viewalljobid;
  dataone;
  role;
  info;
  disableButton = false;
  button;
  public apply: boolean = true;
  constructor(public TeamService: TeamService, private toastr: ToastrService) {
    this.viewalljobid = localStorage.getItem('ViewJobId')
    // alert(this.viewalljobid)
    this.role = localStorage.getItem('role');
    this.TeamService.Getalljob().subscribe(res => {
      this.data = res;
     
      this.dataone = (res[this.viewalljobid]);
      localStorage.setItem('ApplyJobId', this.dataone.jobId);
      // Check if job applied already
      this.checkIfJobAppliedAlready();
    });



  }


  public checkIfJobAppliedAlready(): void {


    this.data = {

      "emailId": localStorage.getItem('email'),
      "jobId": localStorage.getItem('ApplyJobId')
     
    }
    console.log('hello',this.data);
    this.TeamService.checkIfJobApplied(this.data).subscribe((res: any) => {
      localStorage.setItem("reloadPage", "false");
      alert(JSON.stringify(res))
      if (res.code === '211') {
        this.apply = true;
        this.disableButton = false;

      } else if (res.code === '210') {
        this.apply = false;
        this.disableButton = true;
      }
    })

  }




  public ApplyJob(): void {


    this.data = {

      "emailId": localStorage.getItem('email'),
      "jobId": localStorage.getItem('ApplyJobId')

    }
    this.TeamService.ApplyJob(this.data).subscribe((res: any) => {
      localStorage.setItem("reloadPage", "false");

      //this.toastr.success('Successfully Applied !!!');
      console.log(JSON.stringify(res))
      if (res.code === '200') {
        this.apply = false;
        this.disableButton = true;
        this.toastr.success('Successfully Applied !!!');
      }


      // if(this.text=== 'Apply' && res.code === '200'){
      //   this.text = 'Applied'
      //   this.disableButton=true; 
      //   this.toastr.success('Successfully Applied !!!'); 
      //  } 

      //  if(res.code === '210'){
      //   this.text=== 'Applied'
      //   this.disableButton=true;

      // } else{
      //   this.text=== 'Apply'
      //   this.disableButton=false;
      // }


      console.log('job', res);
    })

  }
  ngOnInit() {

  }
  ngOnDestroy() {
    localStorage.setItem("reloadPage", "false");
  }
}
