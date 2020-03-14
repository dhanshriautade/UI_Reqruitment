import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl, NgForm } from '@angular/forms';
import { TeamService } from 'src/services/team.service';
import { HttpClientModule, HttpHeaders, HttpClient, HttpRequest, HttpResponse, HttpEventType, HttpParams } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { saveAs } from 'file-saver';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [DatePipe],
  preserveWhitespaces: false
})
export class ProfileComponent implements OnInit {
  today: number = Date.now();
  public options = [
    { value: 1, id: "Male" },
    { value: 2, id: "Female" },
  ]
  public courses = [
    { value: 1, id: "Full Time" }, { value: 2, id: "Part Time" }, { value: 2, id: "Correspondance/Distance learning" },
  ]
  fileUploadProgress: string = null;
  selectedFile = null;
  displayp = false
  msdata;
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
  sentLanguage: any = [];
  email_id;
  sent_data;
  ProfileData;
  secondarySkillValue;
  ResumeInfo;
  data;
  edudetails
  displayCertification = false;
  notes;
  note;
  value;
  detail;
  displayedit = false
  renameOtherDoc = false
  displayDetails = false;
  displayeducation = false;
  displayDocs = false;
  displaytweltheducation = false;
  displaytentheducation = false;
  displayposteducation = false;
  date;
  year
  month;
  selectBoard;
  selectMedium
  selectMath;
  selectEnglish;
  selectTotal;
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
  selectedGraduation;
  selectedGradCourse;
  selectSpecialization;
  selectUnivercity;
  selectedCorsetype;
  selectPassYear; selectedpostGraduation; selectPostGrade;
  selecttwelthEducation; selecttenthEducation;
  selectedpostCourse; selectpostSpecialization; selectpostUnivercity;
  selectpostCorsetype; selectpostPassYear; selecttwelthBoard; selecttenthBoard
  selectGrade; selecttwelthTotal; selecttenthTotal; selecttwelthEnglish; selecttenthEnglish;
  selecttwelthMath; selecttenthMath; selecttwelthPassYear; selecttenthPassYear;
  selecttenthMedium; selecttwelthMedium;
  doc1
  doc2
  mydata;
  mssdata
  selectedStatus;
  document
  dataDoc
  newDocName
  Document1
  Document2
  constructor(public TeamService: TeamService, private http: HttpClient, private datePipe: DatePipe,
    private toastr: ToastrService) {
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
  renameDoc() {
    var email = this.email_id;
    this.dataDoc = {
      "newFileName":this.Document2,
      "oldFileName":this.doc1,
      "id":this.email_id,
    }
    console.log('RANI',this.dataDoc)
    this.TeamService.RenameDocuments(this.dataDoc).subscribe((res: any) => {
      if(res.responseMessage === 'Success'){
        this.toastr.success('Successfully Updated  !!!');
        this.renameOtherDoc=false
        }
    }) 
  }
  getResume() {
    const formData = new FormData();
    var email = this.email_id;
    formData.append('id', email);
    this.TeamService.GetResume(formData).subscribe((res: any) => {
      this.ResumeInfo = res;
      this.otherDocPathName = this.ResumeInfo.otherDocumentPaths;
      console.log('HELLO',this.otherDocPathName)
      this.document = this.otherDocPathName
      this.doc1 = (this.document[1].split('/')[this.document[1].split('/').length - 1])
    })
  } 
  EditDocument() {
    this.renameOtherDoc=true
    this.Document1=this.doc1
  }
  removeeditDoc() {
    this.renameOtherDoc = false
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

      this.mydata = res;
      this.mssdata = res;
      this.sentPrimarySkill = this.ProfileData.primarySkill;
      // alert(JSON.stringify(this.mssdata.education))

      // console.log('Hello', this.ProfileData);
      // console.log('#######', this.mssdata);

      // console.log('@@@@@@@@@@@', this.mssdata);
      this.selectedDate = this.mydata.dob;
      this.selectedMale = this.mydata.gender;
      this.selectedAddress = this.mydata.permanentAddress;
      this.selectedPincode = this.mydata.areaPinCode;
      this.selectedHometown = this.mydata.homeTown;
      this.selectedCategory = this.mydata.category;
      this.selectedStatus = this.mydata.maritalStatus;
      this.sentLanguage = this.ProfileData.language;
      this.selectedGraduation = this.mssdata.education;
      this.selectedGradCourse = this.mssdata.course;
      this.selectSpecialization = this.mssdata.specialization;
      this.selectUnivercity = this.mssdata.university;
      this.selectedCorsetype = this.mssdata.courseType;
      this.selectPassYear = this.mssdata.passingYear;
      this.selectGrade = this.mssdata.gradeSystem;
      this.selecttwelthEducation = this.mssdata.education;
      this.selecttwelthBoard = this.mssdata.board;
      this.selecttwelthTotal = this.mssdata.totalMark;
      this.selecttwelthEnglish = this.mssdata.englishMarks;
      this.selecttwelthMath = this.mssdata.mathsMarks;
      this.selecttwelthPassYear = this.mssdata.passingYear;
      this.selecttwelthMedium = this.mssdata.schoolMedium;
      this.selecttenthEducation = this.mssdata.education;
      this.selecttenthBoard = this.mssdata.board;
      this.selecttenthTotal = this.mssdata.totalMark;
      this.selecttenthEnglish = this.mssdata.englishMarks;
      this.selecttenthMath = this.mssdata.mathsMarks;
      this.selecttenthPassYear = this.mssdata.passingYear;
      this.selecttenthMedium = this.mssdata.schoolMedium;
      this.selectedpostGraduation = this.mssdata.education;
      this.selectedpostCourse = this.mssdata.course;
      this.selectpostSpecialization = this.mssdata.specialization;
      this.selectpostUnivercity = this.mssdata.university;
      this.selectpostCorsetype = this.mssdata.courseType;
      this.selectpostPassYear = this.mssdata.passingYear;
      this.selectPostGrade = this.mssdata.gradeSystem;

    })
  }
  onUpload() {
    this.submitted = true;
  }
  addDocs() {
    this.displayDocs = true;
  }
  removeDocs() {
    this.displayDocs = false;
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
  addTenthDetails() {
    this.displaytentheducation = true;
  }
  removetenthEducation() {
    this.displaytentheducation = false;
  }
  removetenthdetails() {
    this.displaytentheducation = false;
  }
  addpostDetails() {
    this.displayposteducation = true;
  }
  removepostEducation() {
    this.displayposteducation = false;
  }
  removepostdetails() {
    this.displayposteducation = false;
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
  addTwelthDetails() {
    this.displaytweltheducation = true;
  }
  removetwelthEducation() {
    this.displaytweltheducation = false;
  }
  removetwelthdetails() {
    this.displaytweltheducation = false;
  }
  removeEducation() {
    this.displayeducation = false;
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
  savePersoanlDetails() {
    this.sentLanguage = this.ProfileData.language;
    this.sentLanguage.push(this.selectedLanguages);
    this.mydata = {
      "email": localStorage.getItem('email'),

      "dob": this.selectedDate,
      "gender": this.selectedMale,
      "permanentAddress": this.selectedAddress,
      "homeTown": this.selectedHometown,
      "areaPinCode": this.selectedPincode,
      "category": this.selectedCategory,
      "language": this.sentLanguage,
      "maritalStatus": this.selectedStatus,
    }

    // console.log('Ahdkjh',this.mydata)
    this.TeamService.saveDetails(this.mydata).subscribe((res: any) => {

    })
    this.getProfileEmployee();

  }

  // // removeLang(i: any) {

  // //   this.sentLanguage = this.ProfileData.language;
  // //   this.sentLanguage.splice(i, 1);
  // //   this.data = {
  // //     "email": localStorage.getItem('email'),
  // //     "language":this.sentLanguage,
  // //   }

  //   this.TeamService.saveDetails(this.mydata).subscribe(res => {

  //   })
  //   this.getProfileEmployee();

  // }

  saveEducationDetails() {
    this.mssdata = {
      "email": localStorage.getItem('email'),
      "education": this.selectedGraduation,
      "course": this.selectedGradCourse,
      "specialization": this.selectSpecialization,
      "university": this.selectUnivercity,
      "courseType": this.selectedCorsetype,
      "passingYear": this.selectPassYear,
      "gradeSystem": this.selectGrade,
    }

    alert(JSON.stringify(this.mssdata));

    this.TeamService.saveGraduationDetails(this.mssdata).subscribe((res: any) => {
      this.edudetails = res
      console.log('COLLEGE', this.edudetails)
    })
    this.getProfileEmployee();
  }
  saveTwelthEducation() {
    alert(JSON.stringify(this.mssdata));
    this.mssdata = {
      "email": localStorage.getItem('email'),
      "education": this.selecttwelthEducation,
      "board": this.selecttwelthBoard,
      "totalMark": this.selecttwelthTotal,
      "englishMarks": this.selecttwelthEnglish,
      "mathsMarks": this.selecttwelthMath,
      "passingYear": this.selecttwelthPassYear,
      "schoolMedium": this.selecttwelthMedium,
    }
    this.TeamService.saveGraduationDetails(this.mssdata).subscribe((res: any) => {
      this.mssdata = res;
      console.log('Twelth', this.mssdata)
    })
    this.getProfileEmployee();
  }
  saveTenthEducation() {
    this.mssdata = {
      "email": localStorage.getItem('email'),
      "education": this.selecttenthEducation,
      "board": this.selecttenthBoard,
      "totalMark": this.selecttenthTotal,
      "englishMarks": this.selecttenthEnglish,
      "mathsMarks": this.selecttenthMath,
      "passingYear": this.selecttenthPassYear,
      "schoolMedium": this.selecttenthMedium,
    }
    this.TeamService.saveschoolDetails(this.mssdata).subscribe((res: any) => {
      this.mssdata = res;
      console.log('Twelth', this.mssdata)
    })


  }
  savepostEducation() {
    this.mssdata = {
      "email": localStorage.getItem('email'),
      "education": this.selectedpostGraduation,
      "course": this.selectedpostCourse,
      "specialization": this.selectpostSpecialization,
      "university": this.selectpostUnivercity,
      "courseType": this.selectpostCorsetype,
      "passingYear": this.selectpostPassYear,
      "gradeSystem": this.selectPostGrade,
    }

    this.TeamService.savePosteducationDetails(this.mssdata).subscribe((res: any) => {
      this.mssdata = res;
      console.log('COLLEGE', this.mssdata)
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