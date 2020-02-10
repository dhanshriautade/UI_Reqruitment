import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TeamService } from 'src/services/team.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-latest-opning',
  templateUrl: './latest-opning.component.html',
  styleUrls: ['./latest-opning.component.scss']
})
export class LatestOpningComponent implements OnInit {
  
  public datadonut: any[] = [
    {
      kind: 'Completed', share: 0.175,  color:'#37D7FF' 
    }, 
    {
      kind: 'On Hold', share: 0.175 , color:'#FF746D'
    },
     {
      kind: 'In Progress', share: 0.175 ,  color:'#FEE37B'
    }, 
    ];
  
    public labelContent(e: any): string {
      return e.category;
    }

 currentStatus = true;
  display = false;
  displayPreview = false;
  displayp = false;
  submitted: boolean;
  getAllJob;
  notice;
  data;
  spinner = false;
  term;
  charts;
  deptartment: {}[];
  skillArray = [];
  createJobForm = new FormGroup({

  })
  previewjobForm = new FormGroup({

  })
  markFormTouched: any;
  config: { itemsPerPage: number; currentPage: number; totalItems: any; };
  name: {}[];
  constructor(private formBuilder: FormBuilder, public router: Router, private toastr: ToastrService, public TeamService: TeamService) {

    this.notice = [
      { 'notes': 'one week' }, { 'notes': ' 15 days' }, { 'notes': '1 month' }, { 'notes': ' 2 month' }, { 'notes': '3 month' }, { 'notes': 'other' }

    ],
      this.deptartment = [{ 'dept': 'IT' }, { 'dept': 'Computer' }, { 'dept': 'Meachanical' }, { 'dept': 'ENTC' }
        , { 'dept': 'Electrical' }, { 'dept': 'Civil' }, { 'dept': 'Electronic' }

      ]
   
  }



  createjob(){
    this.currentStatus = false;
    this.display = true;
    this.displayp = false
  }


  previewjob(){
    //  console.log(this.createJobForm.get('designation').value);
    this.displayp = true;
    this.displayPreview = true

    this.data = {
      "jobId": "A0013",
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

  removeWindow() {
    this.displayp = false;
    this.displayPreview = false;
  }
  closeWindow() {
    this.display = false;
    this.currentStatus = true;
    //this.displayp=true;

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


    })

    this.TeamService.Getalljob().subscribe(res => {
      console.log(res);
      this.getAllJob = res;
      this.config = {
        itemsPerPage: 2,
        currentPage: 1,
        totalItems: this.getAllJob.count
      };
    });

  }


  goToJob() {
    this.router.navigateByUrl('/main/job/detail');
  }
  goToAdmin() {
    this.router.navigateByUrl('/main/admin');

  }

  addskill() {
    this.skillArray.push(this.createJobForm.get('skills').value);
  }
  pageChanged(event) {
    this.config.currentPage = event;
  }

  removeSkill(i: any) {
    console.log(i)
    this.skillArray.splice(i, 1);
  }
  showDialog() {
    this.display = false;
  }
  onChange(deviceValue:any){
    console.log(deviceValue);
    this.TeamService.searchDepartmentWiseJob(deviceValue).subscribe(res => {
    })
  }
  selectedDepartment(selectedDepartment: any) {
    throw new Error("Method not implemented.");
  }
  onSubmit() {
    this.submitted = true;
    this.spinner = true;

    this.data = {
      "jobId": "A0023",
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
    this.TeamService.CreateJob(this.data).subscribe(res => {
      this.spinner = false;
      this.toastr.success('Successfully created job !!!');

    });

    this.createJobForm.reset();
    this.spinner = false;
    console.log('this is jobcreation', this.data);
    this.display = false;
    this.currentStatus = true;


  }

}


