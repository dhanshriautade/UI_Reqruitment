import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EmailValidator } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  
  constructor(private http: HttpClient) { }

  AddEmployee(data: any) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
     });
    return this.http.post(environment.Employeepost, data,{ headers: headers });
  }

  UpdateEmployee(data: any){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
     });
    return this.http.post(environment.UpdateEmployee, data,{ headers: headers });
 
  }
  DeleteEmployee(email:any){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
     });
    return this.http.post(environment.DeleteEmployee, email,{ headers: headers });
 
  }

  getEmployee(){
    return this.http.get<any>(environment.Employeeget);
  }
  getjobseekercount(){
    return this.http.get<any>(environment.getjobseekercount);
  }

  getEmployeecount(){
    return this.http.get<any>(environment.getEmployeecount);
  }

  getAllJob(){
    return this.http.get<any>(environment.getAllJob); 
  }
}
