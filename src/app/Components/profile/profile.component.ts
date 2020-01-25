import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { TeamService } from 'src/services/team.service';
import { HttpClientModule, HttpClient, HttpRequest, HttpResponse, HttpEventType, HttpParams } from '@angular/common/http';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [DatePipe],
  preserveWhitespaces: false
})
export class ProfileComponent implements OnInit {
  fileUploadProgress: string = null;
  selectedFile = null;
  myDate = new Date();
  fileToUpload: File = null;
  valid: boolean = false;
  errormassage: boolean = false;
  val: boolean = false;
  skillArray = [];
  secskillArray = [];
  displayEducation=false;
  submitted: boolean;
  email_id;
  sent_data;
  ProfileData;
  ResumeInfo;
  constructor(public TeamService: TeamService,private http: HttpClient,private datePipe: DatePipe) { 
    this.email_id = localStorage.getItem('email');
  }


  ngOnInit() {
    this.getProfileEmployee();
    this.getResume();
  }
  uploadResume(event: any) {
    this.fileToUpload = <File>event.target.files[0];
    for (var i = 0; i < event.target.files.length; i++) {
      var name = event.target.files[i].name;
      var type = event.target.files[i].type;
      var size = event.target.files[i].size;
      var modifiedDate = event.target.files[i].lastModifiedDate;
   
      var fileType = name.split('.').pop();

      if (Math.round(size / 1024)  <= 20000 && fileType == 'pdf' || fileType == 'docx') {

        this.valid = true;
        this.errormassage = false;
        const file = event.target.files[0];
        const formData = new FormData();
        this.sent_data = {
          "id": this.email_id,
          "date": this.datePipe.transform(this.myDate, 'yyyy-MM-dd')
        }
        formData.append('resume', file);
        formData.append('docsInfo', JSON.stringify(this.sent_data));
        formData.append('otherDocs', '');
        this.http.post('http://localhost:8081/uploadDocuments', formData, {
          reportProgress: true,
          observe: 'events'
        })
          .subscribe(events => {
            if (events.type === HttpEventType.UploadProgress) {
              this.fileUploadProgress = Math.round(events.loaded / events.total * 100) + '%';
              console.log(this.fileUploadProgress);
            } else if (events.type === HttpEventType.Response) {
              this.fileUploadProgress = 'Uploading Completed';
              console.log(events.body);
    
            }
    
          })
          this.getResume();

      } else {
        this.errormassage = true;

        this.valid = false;
      }


    }
  }
  getResume(){
    const formData = new FormData();
    var email = this.email_id;
    formData.append('id', email);
    this.TeamService.GetResume(formData).subscribe((res: any) => {
      this.ResumeInfo =res;
    })
      
  }

  downloadResume(){
    var filepath = this.ResumeInfo.documentPaths[0]
      var data = {
        documentPaths : [ this.ResumeInfo.documentPaths[0]]
      }
      debugger;
     this.TeamService.downloadResume(data).subscribe((res: any) => {
      this.ResumeInfo =res;
    })
  }

  getProfileEmployee(){
    var email = this.email_id;
    this.TeamService.GetProfile(email).subscribe((res: any) => {
      console.log(res);
      this.ProfileData = res;
    })
  }
  onUpload() {
    this.submitted=true;
  }
  addEducation(){
this.displayEducation=true
  }

  
  getFileDetails(event: any) {
    for (var i = 0; i < event.target.files.length; i++) {
      var name = event.target.files[i].name;
      var type = event.target.files[i].type;
      var size = event.target.files[i].size;
      var modifiedDate = event.target.files[i].lastModifiedDate;

      var fileType = name.split('.').pop();

      if (size <= 20000 && fileType == 'pdf' || fileType == 'docx') {

        this.valid = true;
        this.errormassage = false;
        

      } else {
        this.errormassage = true;

        this.valid = false;
      }

      console.log('Name: ' + fileType + "\n" +
        'Type: ' + type + "\n" +
        'Last-Modified-Date: ' + modifiedDate + "\n" +
        'Size: ' + Math.round(size / 1024) + " KB");

    }
  }

}
