import { Component, OnInit } from '@angular/core';
import { TeamService } from 'src/services/team.service';
import { HttpClientModule, HttpHeaders, HttpClient, HttpRequest, HttpResponse, HttpEventType, HttpParams } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { saveAs } from 'file-saver';
import { EmployeeService } from 'src/services/employee.service';
@Component({
  selector: 'app-viewcandidateapply',
  templateUrl: './viewcandidateapply.component.html',
  styleUrls: ['./viewcandidateapply.component.scss']
})
export class ViewcandidateapplyComponent implements OnInit {
  ProfileData;
  notificationData;
  NotificationGetDataJobId;
  email_id;
  data
  ResumeInfo;
  otherDocPathName;
  displayjob = false;
  NotificationGetData
  infodetail = [];
  constructor(public TeamService: TeamService, private http: HttpClient, public EmployeeService: EmployeeService) {
    this.email_id = localStorage.getItem('email');
    this.NotificationGetData = localStorage.getItem('NotificationGetData');
    this.NotificationGetDataJobId = localStorage.getItem('NotificationGetDataJobId');
   
    
    console.log(this.NotificationGetData);
    this.getAllEmployeesList();
    this.getResume();
    this.getProfileEmployee();
  }

  ngOnInit() {
    this.getResume();
    this.getProfileEmployee();
    

    if (localStorage.getItem('role') == '2') {
      this.TeamService.getNotification().subscribe((res: any) => {
        console.log(res);
        this.notificationData = res.finalNotificationResponse;
        console.log('hiii',this.notificationData)
      })
    }
  }

  viewjob() {
    this.displayjob = true;
  }
  removedialog() {
    this.displayjob = false;
  }
  getResume() {
    const formData = new FormData();
    var email = this.NotificationGetData;
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
  getProfileEmployee() {
    var email = this.NotificationGetData;
    this.TeamService.GetProfile(email).subscribe((res: any) => {
      this.ProfileData = res;
      console.log('data',this.ProfileData);
    })
  }
  getAllEmployeesList() {
    this.EmployeeService.getEmployee().subscribe(res => {
      this.infodetail = [];
      this.data = res;
      let keys = Object.keys(this.data);
      // console.log('keys', keys);
      for (var i = 0; i < keys.length; i++) {
        this.infodetail.push(this.data[keys[i]]);
      }
      console.log('list', this.infodetail);
    });
  }

}
