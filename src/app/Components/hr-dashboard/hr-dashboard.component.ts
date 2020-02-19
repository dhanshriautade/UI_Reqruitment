import { Component, OnInit } from '@angular/core';
import { TeamService } from 'src/services/team.service';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-hr-dashboard',
  templateUrl: './hr-dashboard.component.html',
  styleUrls: ['./hr-dashboard.component.scss']
})
export class HrDashboardComponent implements OnInit {
  data;
  mydata;
  editdisplay = false;
  dataPrivew;
  term;
  display = false;
  id:string;
  EditMydata;
  displayp=false;
  submitted: boolean;
  notice;
  spinner = false;
  skillArray = [];
  deptartment: {}[];
  role;
  createJobForm = new FormGroup({

  })

  EditJobForm = new FormGroup({

  })
  constructor(private formBuilder: FormBuilder,private toastr: ToastrService, public TeamService: TeamService) { 
   
    this.role =localStorage.getItem('role');
    this.notice = [
      { 'notes': 'one week' }, { 'notes': ' 15 days' }, { 'notes': '1 month' }, { 'notes': ' 2 month' }, { 'notes': '3 month' }, { 'notes': 'other' }

    ],
      this.deptartment = [{ 'dept': 'IT' }, { 'dept': 'Computer' }, { 'dept': 'Meachanical' }, { 'dept': 'ENTC' }
        , { 'dept': 'Electrical' }, { 'dept': 'Civil' }, { 'dept': 'Electronic' }

      ]
  }
  createjob(){
    this.display=true;
    this.skillArray =  [];
    this.TeamService.getjobId().subscribe((res:string) => {
        this.id= res;
     });
  }

  DeleteEmployee(id){
    this.TeamService.DeletejobId(id).subscribe((res:string) => {
      this.id= res;
   });
   this.getAllJobDetail();
  }
  EditEmployee(i:any){
       this.editdisplay = true;
       this.TeamService.Getalljob().subscribe(res => {
        this.data = res;
        console.log(this.data)
        console.log(i)
        console.log(this.data[i])
  
      })
       this.id = this.data[i].jobId;
       this.skillArray = this.data[i].skills;
       this.EditJobForm.get('title').setValue(this.data[i].jobTitle);
       this.EditJobForm.get('location').setValue(this.data[i].location);
       this.EditJobForm.get('designation').setValue(this.data[i].designation);
       this.EditJobForm.get('experienceInYears').setValue(this.data[i].experienceInYears);    
       this.EditJobForm.get('relevantExpInYears').setValue(this.data[i].relevantExpInYears);
       this.EditJobForm.get('minPackage').setValue(this.data[i].minPackage  );
       this.EditJobForm.get('maxPackage').setValue(this.data[i].maxPackage);    
       this.EditJobForm.get('department').setValue(this.data[i].department);
       this.EditJobForm.get('status').setValue(this.data[i].status);
       this.EditJobForm.get('jobStatus').setValue(this.data[i].jobStatus);    
       this.EditJobForm.get('noticePeriod').setValue(this.data[i].noticePeriod);
       this.EditJobForm.get('education').setValue(this.data[i].requiredEducation);
       this.EditJobForm.get('jobDescription').setValue(this.data[i].jobDescription);
    
    
  }

  removeeditWindow(){
    this.editdisplay = false;
  }
 

  EditJobData(){
   
    this.EditMydata = {
      "jobId": this.id,
      "designation": this.EditJobForm.value.designation,
      "experienceInYears": this.EditJobForm.value.experienceInYears,
      "noticePeriod": this.EditJobForm.value.noticePeriod,
      "jobTitle":this.EditJobForm.value.title,
      "location":this.EditJobForm.value.location,
      "minPackage": this.EditJobForm.value.minPackage,
      "maxPackage": this.EditJobForm.value.maxPackage,
      "relevantExpInYears": this.EditJobForm.value.relevantExpInYears,
      "department": this.EditJobForm.value.department,
      "skills": this.skillArray,
      "jobDescription": this.EditJobForm.value.jobDescription,
      "status": this.EditJobForm.value.status,
      "jobStatus": this.EditJobForm.value.jobStatus,
      "requiredEducation":this.EditJobForm.value.education,
    }

    this.TeamService.EditJob(this.EditMydata).subscribe(res => {
      this.spinner = false;
      this.toastr.success('Successfully Updated job !!!');
      this.getAllJobDetail();
      this.editdisplay = false;

    });
  }

  onSubmit() {

    this.display = false;
    this.submitted = true;
    this.spinner = true;

    this.mydata = {
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
    this.TeamService.CreateJob(this.mydata).subscribe(res => {
      this.spinner = false;
      this.toastr.success('Successfully created job !!!');
      this.getAllJobDetail();

    });

    this.createJobForm.reset();
    this.spinner = false;
    this.display = false;
   


  }
  previewjob(){
    this.displayp = true;
    this.dataPrivew = {
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
   
  }
  removeWindow(){
    this.display=false
  }
  removePriview(){
    this.displayp=false
  }

  addskill() {
    if(this.createJobForm.get('skills').value == '')
    {
        this.toastr.error('Please Add Skill');
         return 0 ;

    }
    this.skillArray.push(this.createJobForm.get('skills').value);
    console.log(this.skillArray)
  }

  addskilledit(){
    this.skillArray =  this.skillArray;
    if(this.EditJobForm.get('skills').value == '')
    {
        this.toastr.error('Please Add Skill');
         return 0 ;

    }
    if(this.skillArray == null){
      this.skillArray = [];
      this.skillArray.push(this.EditJobForm.get('skills').value);  
    }
    else{
      this.skillArray.push(this.EditJobForm.get('skills').value);  
  
    }
  }
  removeSkill(i: any) {
    console.log(i)
    this.skillArray.splice(i, 1);
  }

  getAllJobDetail(){
    this.TeamService.Getalljob().subscribe(res => {
      this.data = res;
        })
  }
 
  ngOnInit() {
      this.getAllJobDetail();
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
    this.EditJobForm = this.formBuilder.group({
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
