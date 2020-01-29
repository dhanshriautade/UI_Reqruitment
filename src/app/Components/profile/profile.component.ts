import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { TeamService } from 'src/services/team.service';
import { HttpClientModule, HttpHeaders, HttpClient, HttpRequest, HttpResponse, HttpEventType, HttpParams } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { saveAs } from 'file-saver';

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
  otherDoc;
  valid: boolean = false;
  errormassage: boolean = false;
  val: boolean = false;
  otherDocPathName;
  displayPrimarySkill = false;
  displayPriSkill = false;
  skillArray = [];
  sentPrimarySkill;
  secskillArray = [];
  displayEducation = false;
  displaySecSkill = false;
  otherFileName;
  PrimarySkillValue;
  submitted: boolean;
  sentSecondarySkill;
  email_id;
  sent_data;
  ProfileData;
  secondarySkillValue;
  ResumeInfo;
  data;
  constructor(public TeamService: TeamService, private http: HttpClient, private datePipe: DatePipe) {
    this.email_id = localStorage.getItem('email');
  }


  ngOnInit() {
    this.getProfileEmployee();
    this.getResume();
  }

  addPriSkill() {
    this.displayPriSkill = true;
  }

  uploadOtherDoc(event: any) {
    const formData = new FormData();
    this.otherFileName = [];
    for (var i = 0; i < event.target.files.length; i++) {
      this.otherFileName.push(<File>event.target.files[i]);
    }
    formData.append('resume', '');

    for (var i = 0; i < this.otherFileName.length; i++) {
      formData.append('otherDocs', this.otherFileName[i]);
    }

    this.sent_data = {
      "id": this.email_id,
      "date": this.datePipe.transform(this.myDate, 'yyyy-MM-dd')
    }
    formData.append('docsInfo', JSON.stringify(this.sent_data));
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

  }
  uploadResume(event: any) {
    this.fileToUpload = <File>event.target.files[0];
    for (var i = 0; i < event.target.files.length; i++) {
      var name = event.target.files[i].name;
      var type = event.target.files[i].type;
      var size = event.target.files[i].size;
      var modifiedDate = event.target.files[i].lastModifiedDate;

      var fileType = name.split('.').pop();

      if (Math.round(size / 1024) <= 20000 && fileType == 'pdf' || fileType == 'docx') {

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
  getResume() {
    const formData = new FormData();
    var email = this.email_id;
    formData.append('id', email);
    this.TeamService.GetResume(formData).subscribe((res: any) => {
      this.ResumeInfo = res;

      this.otherDocPathName = this.ResumeInfo.otherDocumentPaths;


    })

  }

  downloadResume() {
    var filepath = this.ResumeInfo.resumePath;
    var request = {
      downloadDocPath: filepath
    }

    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    this.http.post("http://localhost:8081/downloadCandidateDocument", request, { headers: headers, responseType: 'blob' }).subscribe((response: any) => {

      saveAs(response, this.ResumeInfo.resumePath.split('/')[this.ResumeInfo.resumePath.split('/').length - 1])
    });


  }

  downloadOtherDoc(dataone) {
    var filepath = dataone;
    var request = {
      downloadDocPath: filepath
    }

    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    this.http.post("http://localhost:8081/downloadCandidateDocument", request, { headers: headers, responseType: 'blob' }).subscribe((response: any) => {

      saveAs(response, filepath.split('/')[filepath.split('/').length - 1])
    });


  }

  PrimarySkill() {
    this.displayPrimarySkill = true;
  }

  getProfileEmployee() {
    var email = this.email_id;
    this.TeamService.GetProfile(email).subscribe((res: any) => {
      this.ProfileData = res;
    })
  }
  onUpload() {
    this.submitted = true;
  }
  addEducation() {
    this.displayEducation = true
  }
  cancelPrimarySkill() {
    this.displayPriSkill = false;
  }

  addSecSkill() {
    this.displaySecSkill = true;
  }

  cancelSecondarySkill() {
    this.displaySecSkill = false;
  }

  AddSecondarySkill() {
    this.sentSecondarySkill = this.ProfileData.secondarySkill;
    this.sentSecondarySkill.push(this.secondarySkillValue);
    debugger;
    this.data = {

      "email": localStorage.getItem('email'),
      "secondarySkill": this.sentSecondarySkill
    }
    this.TeamService.UpdateSecondarySkill(this.data).subscribe(res => {

    })
    this.getProfileEmployee();
  }

  removesecSkill(i: any) {
    this.sentSecondarySkill = this.ProfileData.secondarySkill;
    this.sentSecondarySkill.splice(i, 1);
    this.data = {

      "email": localStorage.getItem('email'),
      "secondarySkill": this.sentSecondarySkill
    }
    this.TeamService.UpdateSecondarySkill(this.data).subscribe(res => {

    })
    this.getProfileEmployee();
  }


  removePriSkill(i: any) {

    this.sentPrimarySkill = this.ProfileData.primarySkill;
    this.sentPrimarySkill.splice(i, 1);
    this.data = {
      "email": localStorage.getItem('email'),
      "primarySkill": this.sentPrimarySkill
    }

    this.TeamService.UpdatePrimarySkill(this.data).subscribe(res => {

    })
    this.getProfileEmployee();

  }
  AddPrimarySkill() {
    this.sentPrimarySkill = this.ProfileData.primarySkill;
    this.sentPrimarySkill.push(this.PrimarySkillValue);
    this.data = {

      "email": localStorage.getItem('email'),
      "primarySkill": this.sentPrimarySkill
    }

    this.TeamService.UpdatePrimarySkill(this.data).subscribe(res => {

    })
    this.getProfileEmployee();

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
