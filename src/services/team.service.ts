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


  // getNotification(){
  //   let headers = new HttpHeaders({
  //     'Content-Type': 'application/json'
  //    });
  //   return this.http.get(environment.getnotification, { headers: headers });

  // }
  ApplyJob(data: any){
  let headers = new HttpHeaders({
    'Content-Type': 'application/json'
   });
  return this.http.post(environment.ApplyJob, data, { headers: headers });
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

  // searchDepartmentWiseJob(data:any){
  //   let headers = new HttpHeaders({
  //     'Content-Type': 'application/json'
  //    });
  //   return this.http.get(environment.searchDepartmentWiseJob +'=' + data, { headers: headers });
  
  // }
  // CreateJob(data: any){
  //   let headers = new HttpHeaders({
  //     'Content-Type': 'application/json'
  //    });
  //   return this.http.post(environment.CreateJob, data, { headers: headers });
  // }

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

  GetProfile(data: any){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
     });
    return this.http.post(environment.getprofile, data, { headers: headers });
  
  }
  GetResume(formData){
  
    return this.http.post(environment.GetResume, formData);
  
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
