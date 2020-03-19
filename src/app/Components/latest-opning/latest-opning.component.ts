import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TeamService } from 'src/services/team.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { share } from 'rxjs/operators';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-latest-opning',
  templateUrl: './latest-opning.component.html',
  styleUrls: ['./latest-opning.component.scss']
})
export class LatestOpningComponent implements OnInit {
  currentStatus = true;
  display = false;
  displayPreview = false;
  displayp = false;
  submitted: boolean;
  getAllJob;
  notice;
  mydata
  data;
  jobopeningcount
  spinner = false;
  term;
  charts;
  id: string;
  deptartment: {}[];
  getcount: {}[]
  skillArray = [];
  role;
  EditMydata;
  dataPrivew
  editdisplay = false;
  computer
  ENTC
  softwareCount
  embededCount
  mechanicalCount
  jobid
  jobopening
  createJobForm = new FormGroup({

  })
  previewjobForm = new FormGroup({

  })
  EditJobForm = new FormGroup({

  })
  markFormTouched: any;
  config: { itemsPerPage: number; currentPage: number; totalItems: any; };
  name: {}[];
  constructor(private formBuilder: FormBuilder, public router: Router, private toastr: ToastrService, public TeamService: TeamService) {

    this.role = localStorage.getItem('role');

    this.notice = [
      { 'notes': 'one week' }, { 'notes': ' 15 days' }, { 'notes': '1 month' }, { 'notes': ' 2 month' }, { 'notes': '3 month' }, { 'notes': 'other' }

    ],
      this.deptartment = [{ 'dept': 'Software' }, { 'dept': 'Embedded' }, { 'dept': 'Mechanical' }]
  }
  public autofit = true;
  public datadonut: any[] = [
    {
      jobs: 'java dev', appliedCount: 4, color: '#A3A0FB'
    },
    {
      jobs: 'UI Dev', appliedCount: 7, color: '#6DD8FD'
    },
    {
      jobs: 'Android', appliedCount: 2, color: '#EB8172'
    },
  ];
  public labelContent(e: any): string {
    return e.category;
  }
  onChange(deviceValue: any) {
    console.log(deviceValue);
    this.TeamService.searchDepartmentWiseJob(deviceValue).subscribe((res: any) => {

      this.jobopening = res
      this.jobopeningcount = this.jobopening.length
      // console.log(JSON.stringify(this.jobopening))
      this.datadonut = []

    })
    console.log('**********************',this.jobopening.length)
    for (let i = 0; i <= this.jobopening.length; i++) {
      
      // this.datadonut.push('kind', this.jobopening[i].designation)
    //  this.datadonut.push( 'jobs' + ' :' + this.jobopening[i].designation);
     this.datadonut.push({'jobs':this.jobopening[i].designation})
      this.getappliedCountagainstJobid(this.jobopening[i].jobId)
      this.datadonut= [
        {
          color: '#A3A0FB'
        },
        {
         color: '#6DD8FD'
        },
        {
          color: '#EB8172'
        },
      ];
    }
   
  }
  getappliedCountagainstJobid(jobId) {
    this.jobid = jobId;
    // console.log('@@@@',jobId)
    this.TeamService.getappliedCountagainstJobid(this.jobid).subscribe((res: any) => {
      //  console.log('@@@@', res)
      this.datadonut.push('appliedCount', res)
      
    })
    // console.log('HIIIII', this.datadonut)
  }
  getjobcount() {
    this.data = "Software"
    this.TeamService.searchDepartmentWiseJob(this.data).subscribe((res: any) => {
      this.softwareCount = res.length
      this.getcount = [
        {
          kind: 'Software:' + this.softwareCount, share: this.softwareCount, color: '#EB8172'
        },
        {
          kind: 'Embedded:' + this.embededCount, share: this.embededCount, color: '#A3A0FB'
        },
        {
          kind: 'Mechanical:' + this.mechanicalCount, share: this.mechanicalCount, color: '#6DD8FD'
        },
      ];
    })
    this.data = "Embedded"
    this.TeamService.searchDepartmentWiseJob(this.data).subscribe((res: any) => {
      this.embededCount = res.length
      this.getcount = [
        {
          kind: 'Software:' + this.softwareCount, share: this.softwareCount, color: '#EB8172'
        },
        {
          kind: 'Embedded:' + this.embededCount, share: this.embededCount, color: '#A3A0FB'
        },
        {
          kind: 'Mechanical:' + this.mechanicalCount, share: this.mechanicalCount, color: '#6DD8FD'
        },
      ];
    })
    this.data = "Mechanical"
    this.TeamService.searchDepartmentWiseJob(this.data).subscribe((res: any) => {
      this.mechanicalCount = res.length
      this.getcount = [
        {
          kind: 'Software:' + this.softwareCount, share: this.softwareCount, color: '#EB8172'
        },
        {
          kind: 'Embedded:' + this.embededCount, share: this.embededCount, color: '#A3A0FB'
        },
        {
          kind: 'Mechanical:' + this.mechanicalCount, share: this.mechanicalCount, color: '#6DD8FD'
        },
      ];
    })
  }

  createjob() {
    this.display = true;
    this.skillArray = [];
    this.TeamService.getjobId().subscribe((res: string) => {
      this.id = res;
    });
  }
  DeleteEmployee(id) {
    this.TeamService.DeletejobId(id).subscribe((res: string) => {
      this.id = res;
    });
    this.getAllJobDetail();
  }
  EditEmployee(i: any) {
    this.editdisplay = true;
    this.TeamService.Getalljob().subscribe(res => {
      this.data = res;
      // console.log(this.data)
      // console.log(i)
      // console.log(this.data[i])

    })
    this.id = this.data[i].jobId;
    this.skillArray = this.data[i].skills;
    this.EditJobForm.get('title').setValue(this.data[i].jobTitle);
    this.EditJobForm.get('location').setValue(this.data[i].location);
    this.EditJobForm.get('designation').setValue(this.data[i].designation);
    this.EditJobForm.get('experienceInYears').setValue(this.data[i].experienceInYears);
    this.EditJobForm.get('relevantExpInYears').setValue(this.data[i].relevantExpInYears);
    this.EditJobForm.get('minPackage').setValue(this.data[i].minPackage);
    this.EditJobForm.get('maxPackage').setValue(this.data[i].maxPackage);
    this.EditJobForm.get('department').setValue(this.data[i].department);
    this.EditJobForm.get('status').setValue(this.data[i].status);
    this.EditJobForm.get('jobStatus').setValue(this.data[i].jobStatus);
    this.EditJobForm.get('noticePeriod').setValue(this.data[i].noticePeriod);
    this.EditJobForm.get('education').setValue(this.data[i].requiredEducation);
    this.EditJobForm.get('jobDescription').setValue(this.data[i].jobDescription);
  }
  removeeditWindow() {
    this.editdisplay = false;
  }
  EditJobData() {
    this.EditMydata = {
      "jobId": this.id,
      "designation": this.EditJobForm.value.designation,
      "experienceInYears": this.EditJobForm.value.experienceInYears,
      "noticePeriod": this.EditJobForm.value.noticePeriod,
      "jobTitle": this.EditJobForm.value.title,
      "location": this.EditJobForm.value.location,
      "minPackage": this.EditJobForm.value.minPackage,
      "maxPackage": this.EditJobForm.value.maxPackage,
      "relevantExpInYears": this.EditJobForm.value.relevantExpInYears,
      "department": this.EditJobForm.value.department,
      "skills": this.skillArray,
      "jobDescription": this.EditJobForm.value.jobDescription,
      "status": this.EditJobForm.value.status,
      "jobStatus": this.EditJobForm.value.jobStatus,
      "requiredEducation": this.EditJobForm.value.education,
    }

    this.TeamService.EditJob(this.EditMydata).subscribe(res => {
      this.spinner = false;
      this.toastr.success('Successfully Updated job !!!');
      this.getAllJobDetail();
      this.editdisplay = false;

    });
  }

  previewjob() {
    //  console.log(this.createJobForm.get('designation').value);
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

  removeWindow() {
    this.display = false;
  }
  closeWindow() {
    this.display = false;
    this.currentStatus = true;
  }
  removePriview() {
    this.displayp = false
  }
  getAllJobDetail() {
    this.TeamService.Getalljob().subscribe((res: any) => {
      this.data = res;
      // console.log('**************',this.data.length)
    })
  }
  ngOnInit() {
    // this.getappliedCountagainstJobid()
    this.getjobcount()
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
      title: [''],
      location: [''],

    })

    this.TeamService.Getalljob().subscribe(res => {
      // console.log(res);
      this.getAllJob = res;
      this.config = {
        itemsPerPage: 6,
        currentPage: 1,
        totalItems: this.getAllJob.count
      };
    });


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
  goToJob(id) {
    localStorage.setItem('jobByIdDetail', id);
    this.router.navigateByUrl('/User/job/detail');
  }
  goToAdmin() {
    this.router.navigateByUrl('/main/admin');

  }
  addskill() {
    if (this.createJobForm.get('skills').value == '') {
      this.toastr.error('Please Add Skill');
      return 0;

    }
    this.skillArray.push(this.createJobForm.get('skills').value);
    console.log(this.skillArray)
  }
  addskilledit() {
    this.skillArray = this.skillArray;
    if (this.EditJobForm.get('skills').value == '') {
      this.toastr.error('Please Add Skill');
      return 0;

    }
    if (this.skillArray == null) {
      this.skillArray = [];
      this.skillArray.push(this.EditJobForm.get('skills').value);
    }
    else {
      this.skillArray.push(this.EditJobForm.get('skills').value);

    }
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
  selectedDepartment(selectedDepartment: any) {
    throw new Error("Method not implemented.");
  }
  onSubmit() {
    this.display = false;
    this.submitted = true;
    this.spinner = true;

    this.mydata = {
      "jobId": this.id,
      "location": this.createJobForm.value.location,
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
    console.log(this.mydata)
    this.TeamService.CreateJob(this.mydata).subscribe(res => {
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


