import { Component, OnInit, OnDestroy } from '@angular/core';
import { TeamService } from 'src/services/team.service';
import { ToastrService } from 'ngx-toastr';


import { FormGroup, FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-applyjob',
  templateUrl: './applyjob.component.html',
  styleUrls: ['./applyjob.component.scss'],
  providers: [DatePipe],
})
export class ApplyjobComponent implements OnInit, OnDestroy {
  data;
  viewalljobid;
  display = false;
  dataone;
  role;
  info;
  disableButton = false;
  button;
  public apply: boolean = true;

  deptartment;
  dataApply;
  myDate = new Date();
  applyJobForm= new FormGroup({

  })
  constructor(public TeamService: TeamService,private formBuilder: FormBuilder,private toastr: ToastrService, private datePipe: DatePipe) {
    this.deptartment = [{ 'dept': 'IT' }, { 'dept': 'Computer' }, { 'dept': 'Meachanical' }, { 'dept': 'ENTC' }
    , { 'dept': 'Electrical' }, { 'dept': 'Civil' }, { 'dept': 'Electronic' }

  ]
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


   public checkIfJobAppliedAlready(){


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

  onSubmit(){
    this.data = {
    
      "emailId": localStorage.getItem('email'),
      "jobId": localStorage.getItem('ApplyJobId')
  
  }

  this.TeamService.ApplyJob(this.data).subscribe(res => {
    console.log('job', res);
  })

  this.dataApply = {
    

      "jobId":this.dataone.jobId,
      
      "candidateName": this.applyJobForm.value.candidateName,
      
      "candidateId" : localStorage.getItem('id'),
      
      "designation":this.applyJobForm.value.designation,
      
      "noticePeriod":this.applyJobForm.value.noticePeriod,
      
      "experienceInYears":this.applyJobForm.value.experienceInYears,
      
      "ctc":this.applyJobForm.value.ctc,
      
      "ectc":this.applyJobForm.value.ectc,
      
      "relevantExpInYears":this.applyJobForm.value.relevantExpInYears,
      
      "skills":this.dataone.skills,
      
      "department":this.applyJobForm.value.department,
      
      "seen":"false",
      
      "status":"slected",
      
      "proceedFurther": "false",
      
      "bookmarked": "false",
      
      "appliedDate":this.datePipe.transform(this.myDate, 'yyyy-MM-dd')
      
  }
  this.TeamService.saveCandidateJobApplication(this.dataApply).subscribe(res => {
    console.log('job', res);
    this.display = false;
    this.toastr.success('Successfully Apply Job !!!');
  })
  }
  ApplyJob() {

    this.display = true;   
   
  }

  ngOnInit() {
    this.applyJobForm = this.formBuilder.group({
      candidateName: [''],
      department: [''],
      relevantExpInYears: [''],
      ectc: [''],
      ctc: [''],
      experienceInYears: [''],
      noticePeriod: [''],
      designation: [''],
   
    })
  }
 
  ngOnDestroy() {
    localStorage.setItem("reloadPage", "false");
  }
}
