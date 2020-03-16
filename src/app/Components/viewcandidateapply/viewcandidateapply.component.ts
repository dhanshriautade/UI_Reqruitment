import { Component, OnInit } from '@angular/core';
import { TeamService } from 'src/services/team.service';
import { HttpClientModule, HttpHeaders, HttpClient, HttpRequest, HttpResponse, HttpEventType, HttpParams } from '@angular/common/http';
import { DatePipe, JsonPipe } from '@angular/common';
import { saveAs } from 'file-saver';

import { ToastrService } from 'ngx-toastr';
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
  department;
  selecteddepartment;
  selecteddesignation
  selectedemployee;
  dataone;
  displayjob = false;
  empdeptdata;
  NotificationGetData;
  path;
  departmentsAndDesignations: any = [];
  infodetail = [];
  designationList: any = [];
  list
  constructor(public TeamService: TeamService, private http: HttpClient, private toastr: ToastrService, public EmployeeService: EmployeeService) {
    this.email_id = localStorage.getItem('email');
    this.NotificationGetData = localStorage.getItem('NotificationGetData');
    this.NotificationGetDataJobId = localStorage.getItem('NotificationGetDataJobId');
    // this.department=[
    //   'Software','Embedded','Mechanical'
    // ]
    this.departmentsAndDesignations = [['Software', ["Android", "IOS", "Java"]],
    ["Embedded", ["Embedded department 1", "Embedded department 2", "Embedded department 3"]],
    ["Mechanical", ["Mechanical department 1", "Mechanical department 2", "Mechanical department 3"]]];
    console.log(this.NotificationGetData);
    this.getAllEmployeesList();
    this.getResume();
    this.getProfileEmployee();
  }
  getDesignationList() {
    let dept = this.selecteddepartment
    let map = new Map(this.departmentsAndDesignations);
    for (let entry of map.entries()) {
      if (dept === entry[0]) {
        this.designationList = entry[1];
      }
    }
    this.list = this.designationList;
  }
  // getDeparmentwiseEmpList() {
  //   let dept = this.selecteddepartment
  //   this.data = {
  //     "department": dept
  //   };
  //   this.TeamService.EmployeeByDepartment(this.data).subscribe((res: any) => {
  //     this.empdeptdata = [];
  //     this.dataone = res;
  //     var email = this.NotificationGetData;
  //   })
  // }
  getDesignationwiseEmpList() {
    let desig = this.selecteddesignation
    JSON.stringify(this.selecteddesignation)
    this.data = {
      "designation": desig
    };
    this.TeamService.EmployeeByDesignation(this.data).subscribe((res: any) => {
      this.empdeptdata = [];
      this.dataone = res;
      console.log("RANI",this.dataone)
      var email = this.NotificationGetData;
    })
  }
  AssignEmpployeeToInterview() {
    if (this.ResumeInfo != null) {
      this.path = this.ResumeInfo.resumePath;
    }
    else{
      this.path  = '';
    }
    this.data = {
      "jobId": this.NotificationGetDataJobId,
      "candidateEmail": this.ProfileData.email,
      "candidateDocument": this.path,
      "employeeId": this.selectedemployee,
    }
    this.TeamService.AssignEmployeeToInterview(this.data).subscribe((res: any) => {
      this.toastr.success('Successfully Assign Employee !!!');
      this.displayjob = false;
    })
  }
  ngOnInit() {
    this.getResume();
    this.getProfileEmployee();


    if (localStorage.getItem('role') == '2') {
      this.TeamService.getNotification().subscribe((res: any) => {
        console.log(res);
        this.notificationData = res.finalNotificationResponse;
        console.log('hiii', this.notificationData)
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
      if (this.ResumeInfo != null) {
        this.otherDocPathName = this.ResumeInfo.otherDocumentPaths;
      }
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
      console.log('data', this.ProfileData);
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
