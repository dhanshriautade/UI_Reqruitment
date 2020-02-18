import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl, NgForm } from '@angular/forms';
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
  public options = [
    {value: 1, id:"Male"},
    {value: 2, id:"Female"},
  ]
  fileUploadProgress: string = null;
  selectedFile = null;
  displayp = false
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
  sentSecondarySkill: any = [];
  email_id;
  sent_data;
  ProfileData;
  secondarySkillValue;
  ResumeInfo;
  data;
  displayCertification = false;
  notes;
  note;
  value;
  detail;
  displayDetails = false;
  displayeducation = false;
  displaytweltheducation=false;
  displaytentheducation=false;
  displayposteducation=false;
  date;
  year
  month;
  sentDetails;
  selectedDate;
  selectedYear
  selectedMonth;
  selectedFemale;
  selectedMale;
  selectedAddress;
  selectedHometown;
  selectedCategory;
  selectedPincode;
  selectedLanguages;
  mydata;
  selectedStatus;

  constructor(public TeamService: TeamService, private http: HttpClient, private datePipe: DatePipe) {
    this.email_id = localStorage.getItem('email');

    this.date = [
      { 'id': 1 }, { 'id': 2 }, { 'id': 3 }, { 'id': 4 }, { 'id': 5 }, { 'id': 6 }, { 'id': 7 }, { 'id': 8 }, { 'id': 9 }, { 'id': 10 }, { 'id': 11 },
      { 'id': 12 }, { 'id': 13 }, { 'id': 14 }, { 'id': 15 }, { 'id': 16 }, { 'id': 17 }, { 'id': 18 }, { 'id': 19 }, { 'id': 20 }, { 'id': 21 }, { 'id': 22 },
      { 'id': 23 }, { 'id': 24 }, { 'id': 25 }, { 'id': 26 }, { 'id': 27 }, { 'id': 28 }, { 'id': 29 }, { 'id': 30 }, { 'id': 31 }
    ],
      this.month = [
        { 'name': 1 }, { 'name': 2 }, { 'name': 3 }, { 'name': 4 }, { 'name': 5 }, { 'name': 6 }, { 'name': 7 },
        { 'name': 8 }, { 'name': 9 }, { 'name': 10 }, { 'name': 11 }, { 'name': 12 }
      ],
      this.year = [
        { 'value': 2002 }, { 'value': 2001 }, { 'value': 2000 }, { 'value': 1999 }, { 'value': 1998 }, { 'value': 1997 }, { 'value': 1996 },
        { 'value': 1995 }, { 'value': 1994 }, { 'value': 1993 }, { 'value': 1992 },
        { 'value': 1991 }, { 'value': 1990 }, { 'value': 1989 }, { 'value': 1988 }, { 'value': 1987 }, { 'value': 1986 }, { 'value': 1985 },
        { 'value': 1984 }, { 'value': 1983 }, { 'value': 1982 }, { 'value': 1981 }, { 'value': 1980 }, { 'value': 1979 }, { 'value': 1978 },
        { 'value': 1977 }, { 'value': 1976 }, { 'value': 1975 }, { 'value': 1974 }, { 'value': 1973 }, { 'value': 1972 },
        { 'value': 1971 }, { 'value': 1970 }, { 'value': 1969 }, { 'value': 1968 }, { 'value': 1967 }, { 'value': 1966 },
      ]
  }


  ngOnInit() {
    this.getProfileEmployee();
    this.getResume();
  }

  addPriSkill() {
    this.displayPriSkill = true;
  }
  addCertification() {
    this.displayCertification = true;
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
          this.getResume();
        } else if (events.type === HttpEventType.Response) {
          this.fileUploadProgress = 'Uploading Completed';
          console.log(events.body);
          this.getResume();

        }

      })


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
              this.getResume();
            } else if (events.type === HttpEventType.Response) {
              this.fileUploadProgress = 'Uploading Completed';
              console.log(events.body);
              this.getResume();

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
    // const formData = new FormData();
    // var email = this.email_id;
    // formData.append('id', email);
    // this.TeamService.GetResume(formData).subscribe((res: any) => {
    // this.ResumeInfo = res;

    // this.otherDocPathName = this.ResumeInfo.otherDocumentPaths;


    // })

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


  EditEmployee() {
    this.displayp = true;
  }
  removeWindow() {
    this.displayp = false
  }
  PrimarySkill() {
    this.displayPrimarySkill = true;
  }

  getProfileEmployee() {
    var email = this.email_id;
    this.TeamService.GetProfile(email).subscribe((res: any) => {
      this.ProfileData = res;
     
     
      this.mydata=res;
      this.sentPrimarySkill = this.ProfileData.primarySkill;
      // console.log('Hello', this.ProfileData)
    })
  }
  onUpload() {
    this.submitted = true;
  }
  addEducation() {
    this.displayeducation = true;
  }
  cancelPrimarySkill() {
    this.displayPriSkill = false;
  }
  removedetails() {
    this.displayeducation = false;
  }

  addSecSkill() {
    this.displaySecSkill = true;
  }

  cancelSecondarySkill() {
    this.displaySecSkill = false;
  }
  removepersonaldetail() {
    this.displayDetails = false;

  }
  addTenthDetails(){
this.displaytentheducation=true;
  }
  removetenthEducation(){
    this.displaytentheducation=false;
  }
  removetenthdetails(){
    this.displaytentheducation=false;
  }
  addpostDetails(){
    this.displayposteducation=true;
  }
  removepostEducation(){
    this.displayposteducation=false;
  }
  removepostdetails(){
    this.displayposteducation=false;
  }
 
  removecertificates() {
    this.displayCertification = false;
  }
  removecertificate() {
    this.displayCertification = false;
  }
  removeproject() {
    this.displayCertification = false;
  }
  addDetails() {
    this.displayDetails = true;
  }
  addTwelthDetails(){
    this.displaytweltheducation=true;
  }
  removetwelthEducation(){
    this.displaytweltheducation=false;
  }
  removetwelthdetails(){
    this.displaytweltheducation=false;
  }
  removeEducation(){
    this.displayeducation=false;
  }

  remove() {
    this.displayDetails = false;
  }

  AddSecondarySkill() {
 
     alert(JSON.stringify(this.ProfileData));
    this.sentSecondarySkill = this.ProfileData.secondarySkill;
    this.sentSecondarySkill.push(this.secondarySkillValue);
    //debugger;
    this.data = { 

      "email": localStorage.getItem('email'),
      "secondarySkill":this.sentSecondarySkill
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
    
      // alert(JSON.stringify(this.ProfileData));
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
  savePersoanlDetails(){   
    this.mydata={
      "email": localStorage.getItem('email'),
      "dob": this.selectedDate,
      "gender":this.selectedMale,
      "permanatAddress":this.selectedAddress,
      "homeTown":this.selectedHometown,
      "areaPinCode":this.selectedPincode,
      "category":this.selectedCategory,
      "language":this.selectedLanguages,
      "maritialStatus":this.selectedStatus,
    }
   
    console.log('Ahdkjh',this.mydata)
    this.TeamService.saveDetails(this.mydata).subscribe((res:any) => {
     
     
 
  
    })
  
   
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