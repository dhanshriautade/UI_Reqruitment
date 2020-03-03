import { Component, OnInit } from '@angular/core';
import { TeamService } from 'src/services/team.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-applyjob',
  templateUrl: './applyjob.component.html',
  styleUrls: ['./applyjob.component.scss'],
  providers: [DatePipe],
})
export class ApplyjobComponent implements OnInit {
  data;
  viewalljobid;
  display = false;
  dataone;
  role;
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
   this.role = localStorage.getItem('role');
    this.TeamService.Getalljob().subscribe(res => {
      this.data = res;
      this.dataone = (res[this.viewalljobid]);
      localStorage.setItem('ApplyJobId',  this.dataone.jobId);

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
      
      "status":"selected",
      
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

}
