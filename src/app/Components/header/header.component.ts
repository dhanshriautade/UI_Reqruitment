import { Component, OnInit } from '@angular/core';
import { TeamService } from 'src/services/team.service';
import { Router } from '@angular/router';
import { HttpClientModule, HttpHeaders, HttpClient, HttpRequest, HttpResponse, HttpEventType, HttpParams } from '@angular/common/http';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  Selectedtime1
  Selectedtime2
  Selectedtime3
  time1
  time2
  time3
  dataone
  data
  empid
  ProfileData
  notificationData;
  notificationDataReminder;
  count;
  allocatedJobSeeker;
  noteData;
  role;
  email
  display = false;
  NotificationGetData;
  constructor(public TeamService: TeamService, public router: Router, private http: HttpClient) {
    this.role = localStorage.getItem('role');
    console.log(this.role)

    this.TeamService.GetProfile(localStorage.getItem('email')).subscribe((res: any) => {
      this.ProfileData = res;
    })

  }
  AssignTime() {
    //1st Interview Time
    var date = new Date(this.Selectedtime1),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2),
      hours = ("0" + date.getHours()).slice(-2),
      minutes = ("0" + date.getMinutes()).slice(-2),
      seconds = ("0" + date.getSeconds()).slice(-2);
    var mySQLDate = [date.getFullYear(), mnth, day].join("-");
    var mySQLTime = [hours, minutes, seconds].join(":");
    this.time1 = [mySQLDate, mySQLTime].join(" ")
    console.log('RANI', this.time1)
    //2nd Interview Time
    var date = new Date(this.Selectedtime2),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2),
      hours = ("0" + date.getHours()).slice(-2),
      minutes = ("0" + date.getMinutes()).slice(-2),
      seconds = ("0" + date.getSeconds()).slice(-2);
    var mySQLDate = [date.getFullYear(), mnth, day].join("-");
    var mySQLTime = [hours, minutes, seconds].join(":");
    this.time2 = [mySQLDate, mySQLTime].join(" ")
    console.log('RANI', this.time2)

    //3rd Interview Time
    var date = new Date(this.Selectedtime3),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2),
      hours = ("0" + date.getHours()).slice(-2),
      minutes = ("0" + date.getMinutes()).slice(-2),
      seconds = ("0" + date.getSeconds()).slice(-2);
    var mySQLDate = [date.getFullYear(), mnth, day].join("-");
    var mySQLTime = [hours, minutes, seconds].join(":");
    this.time3 = [mySQLDate, mySQLTime].join(" ")
    console.log('RANI', this.time3)

    this.data = {
      "employeeId": this.ProfileData.email,
      "candidateEmail": this.allocatedJobSeeker.candidateEmail,
      "time1": this.time1,
      "time2": this.time2,
      "time3": this.time3
    }
    console.log('RANI', this.data)
    this.TeamService.AllocateTimeToJobSeeker(this.data).subscribe(res => {
      this.dataone = res
      console.log('rani', this.dataone)
    })
  }

  viewProfile(email: any, JobId: any) {
    this.NotificationGetData = email;
    localStorage.setItem('NotificationGetData', this.NotificationGetData);
    localStorage.setItem('NotificationGetDataJobId', JobId);

    this.router.navigateByUrl('/User/ViewCandidate');


  }

  LogOut() {
    localStorage.clear();
    this.router.navigateByUrl('');
  }

  EmployeePage() {
    this.router.navigateByUrl('/HR/team');

  }
  job() {
    this.router.navigateByUrl('User/candidate');
  }

  EditProfileSeeker() {
    this.router.navigateByUrl('User/Profile/Seeker');
  }
  EditProfile() {
    this.router.navigateByUrl('User/Profile');
  }
  downloadResume() {
    var filepath = this.allocatedJobSeeker.candidateDocument;
    var request = {
      downloadDocPath: filepath
    }

    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    this.http.post("http://localhost:8081/downloadCandidateDocument", request, { headers: headers, responseType: 'blob' }).subscribe((response: any) => {

      saveAs(response, this.allocatedJobSeeker.candidateDocument.split('/')[this.allocatedJobSeeker.candidateDocument.split('/').length - 1])
    });

  }

  ngOnInit() {
    console.log(localStorage.getItem('role'));
    if (localStorage.getItem('role') == '2') {
      this.TeamService.getNotification().subscribe((res: any) => {
        // console.log(res);
        this.notificationData = res.finalNotificationResponse;
        this.count = this.notificationData.length;
      })
      this.count = this.count;
      this.TeamService.getNotificationReminder().subscribe((res: any) => {
        this.notificationDataReminder = res.hrCandidateInterviewDto;

        this.count = this.count + this.notificationDataReminder.length;
      })
      this.count = this.count;

    }

    if (localStorage.getItem('role') == '3') {
      this.TeamService.getNotificationReminder().subscribe((res: any) => {
        if (localStorage.getItem('id') === res.hrCandidateInterviewDto[0].employeeId) {
          this.notificationDataReminder = res.hrCandidateInterviewDto;
          this.count = this.notificationDataReminder.length;

        }
      })

      var email = localStorage.getItem('email')
      this.TeamService.getAllocatedJobseeker(email).subscribe((res: any) => {
        this.allocatedJobSeeker = res;
        this.count = this.count + this.allocatedJobSeeker.length;

      })
      this.count = this.count;
    }

  }
  onClickAssignTime() {
    this.display = true
  }
}
