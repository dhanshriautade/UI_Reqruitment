import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(private http: HttpClient) { }

  SignUp(data: any){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
     });
    return this.http.post(environment.signUp, data, { headers: headers });
  }
  
  // AddInformation(data: any){
  //   let headers = new HttpHeaders({
  //     'Content-Type': 'application/json'
  //    });
  //   return this.http.post(environment.AddInfo, data, { headers: headers });
  // }


  getNotification(){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
     });
    return this.http.get(environment.getnotification, { headers: headers });

  }
  getAllocatedJobseeker(email:any){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
     });
    return this.http.get(environment.getAllocatedJobseeker  + email , { headers: headers });

  }

  getJobIdWiseDetail(id:any){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
     });
    return this.http.get(environment.getJobIdWiseDetail  + id , { headers: headers });

  }
  getNotificationReminder(){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
     });
    return this.http.get(environment.getNotificationReminder, { headers: headers });

  }
  checkIfJobApplied(data: any) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(environment.AppliedJob, data, { headers: headers });
  }
  saveDetails(data: any) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(environment.UpdatePersonalDetails, data, { headers: headers });
  }
  RenameDocuments(data: any) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(environment.renameDocument, data, { headers: headers });
  }
  saveGraduationDetails(data: any) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(environment.UpdateCollegeEducationlDetails, data, { headers: headers });
  }
  savePosteducationDetails(data: any) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(environment.UpdatePostEducationlDetails, data, { headers: headers });
  }
  saveschoolDetails(data: any) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(environment.UpdateSchoolEducationlDetails, data, { headers: headers });
  }
  ApplyJob(data: any){
  let headers = new HttpHeaders({
    'Content-Type': 'application/json'
   });
  return this.http.post(environment.ApplyJob, data, { headers: headers });
  }

  saveCandidateJobApplication(data: any){
  let headers = new HttpHeaders({
    'Content-Type': 'application/json'
   });
  return this.http.post(environment.saveCandidateJobApplication, data, { headers: headers });
  }

  UpdateSecondarySkill(data: any){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
     });
    return this.http.post(environment.UpdateSecondarySkill, data, { headers: headers });
    }

  UpdatePrimarySkill(data: any){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
     });
    return this.http.post(environment.UpdatePrimarySkill, data, { headers: headers });
    }

  Login(data: any){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
     });
    return this.http.post(environment.login, data, { headers: headers });
  }

  sendemail(data: any){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
     });
    return this.http.get(environment.sendemail +'?' + data, { headers: headers });
  }

  searchDepartmentWiseJob(data:any){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
     });
    return this.http.get(environment.searchDepartmentWiseJob +'=' + data, { headers: headers });
  
  }
  getjobId(){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
     });
    return this.http.get(environment.getjobId, { headers: headers, responseType:'text' });
 
 
  }


  CreateJob(data: any){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
     });
    return this.http.post(environment.CreateJob, data, { headers: headers });
  }

  DeletejobId(id:any){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
     });
    return this.http.post(environment.DeletejobId + '?id=' + id, { headers: headers });
  
  }
  EditJob(data: any){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
     });
    return this.http.post(environment.EditJob, data, { headers: headers });
  }

  Getalljob(){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
     });
    return this.http.get(environment.getAllJob, { headers: headers });
 
  }

  GetAllEmployee(){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
     });
    return this.http.get(environment.Employeeget, { headers: headers });
 
 
  }
  AllocateTimeToJobSeeker(data: any) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(environment.allotTimetoJobseeker, data, { headers: headers });
  }
  GetProfile(data: any){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
     });
    return this.http.post(environment.getprofile, data, { headers: headers });
  
  }
  GetResume(formData){
  
    return this.http.post(environment.GetResume, formData);
  
  }
  EmployeeByDepartment(data:any){
    let headers = new HttpHeaders({
    'Content-Type': 'application/json'
    });
    return this.http.post(environment.getEmployeeByDepartment,data, { headers: headers });
    }
    EmployeeByDesignation(data:any){
      let headers = new HttpHeaders({
      'Content-Type': 'application/json'
      });
      return this.http.post(environment.getEmployeeByDesignation,data, { headers: headers });
      }
  
  AssignEmployeeToInterview(data:any){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
     });
    return this.http.post(environment.AssignEmployeeToInterview, data, { headers: headers });
  
  }
  // downloadResume(data){
  //   let headers = new HttpHeaders({
  //     'Content-Type': 'application/json'
  //    });
  //   return this.http.post(environment.downloadResume , data, { headers: headers });
   
  // }

  forgot(data: any){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
     });
    return this.http.get(environment.forgot + data, { headers: headers });
  }
 
  AlreadyUse(data: any){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
     });
     return this.http.post(environment.alreadyUser, data, { headers: headers });

  }

  // resumeUpload(data){
  //   let headers = new HttpHeaders({
  //     'Content-Type': 'application/x-www-form-urlencoded'
  //    });
  //    debugger;
  //    return this.http.post(environment.uploadresume, data, { headers: headers });

  // }
}
