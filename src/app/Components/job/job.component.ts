import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TeamService } from 'src/services/team.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss']
})
export class JobComponent implements OnInit {
  displayp=false
  display=false
  submitted: boolean;
  notice;
  id: string;
  spinner = false;
  data;
  skillArray = [];
  deptartment: {}[];
  createJobForm = new FormGroup({

  })
  constructor(private formBuilder: FormBuilder,private toastr: ToastrService, public TeamService: TeamService) { 
   

    this.notice = [
      { 'notes': 'one week' }, { 'notes': ' 15 days' }, { 'notes': '1 month' }, { 'notes': ' 2 month' }, { 'notes': '3 month' }, { 'notes': 'other' }

    ],
      this.deptartment = [{ 'dept': 'IT' }, { 'dept': 'Computer' }, { 'dept': 'Meachanical' }, { 'dept': 'ENTC' }
        , { 'dept': 'Electrical' }, { 'dept': 'Civil' }, { 'dept': 'Electronic' }

      ]
  }

  removeWindow(){
    this.display=false
  }
  removePriview(){
    this.displayp=false
  }

  addskill() {
    this.skillArray.push(this.createJobForm.get('skills').value);
    console.log(this.skillArray)
  }
  removeSkill(i: any) {
    console.log(i)
    this.skillArray.splice(i, 1);
  }
  createjob(){
    this.display=true
    this.TeamService.getjobId().subscribe((res:string) => {
        this.id= res;
     });
    
     }
   
  previewjob(){
    this.displayp = true;
    this.data = {
      "jobId": this.id,
      "designation": this.createJobForm.value.designation,
      "experienceInYears": this.createJobForm.value.experienceInYears,
      "noticePeriod": this.createJobForm.value.noticePeriod,
      "minPackage": this.createJobForm.value.minPackage,
      "maxPackage": this.createJobForm.value.maxPackage,
      "relevantExpInYears": this.createJobForm.value.relevantExpInYears,
      "department": this.createJobForm.value.department,
      "skills": this.skillArray,
      "jobDescription": this.createJobForm.value.jobDescription,
      "status": this.createJobForm.value.status,
      "jobStatus": this.createJobForm.value.jobStatus,


    }
  console.log(this.data)
   
  }

  onSubmit() {


    this.submitted = true;
    this.spinner = true;

    this.data = {
      "jobId": this.id,
      "designation": this.createJobForm.value.designation,
      "experienceInYears": this.createJobForm.value.experienceInYears,
      "noticePeriod": this.createJobForm.value.noticePeriod,
      "jobTitle":this.createJobForm.value.title,
      "location":this.createJobForm.value.location,
      "minPackage": this.createJobForm.value.minPackage,
      "maxPackage": this.createJobForm.value.maxPackage,
      "relevantExpInYears": this.createJobForm.value.relevantExpInYears,
      "department": this.createJobForm.value.department,
      "skills": this.skillArray,
      "jobDescription": this.createJobForm.value.jobDescription,
      "status": this.createJobForm.value.status,
      "jobStatus": this.createJobForm.value.jobStatus,
      "requiredEducation":[this.createJobForm.value.education],


    }
    this.TeamService.CreateJob(this.data).subscribe(res => {
      this.spinner = false;
      this.toastr.success('Successfully created job !!!');

    });

    this.createJobForm.reset();
    this.spinner = false;
    console.log('this is jobcreation', this.data);
    this.display = false;
   


  }
  ngOnInit() {
    this.createJobForm = this.formBuilder.group({
      jobId: [''],
      designation: ['', Validators.required],
      experienceInYears: ['', Validators.required],
      noticePeriod: ['', Validators.required],
      minPackage: ['', Validators.required],
      maxPackage: ['', Validators.required],
      department: ['', Validators.required],
      skills: ['', Validators.required],
      jobDescription: ['', Validators.required],
      relevantExpInYears: ['', Validators.required],
      status: [''],
      jobStatus: [''],
      education: [''],
      title: [''],
      location: [''],

    })

  }
}
