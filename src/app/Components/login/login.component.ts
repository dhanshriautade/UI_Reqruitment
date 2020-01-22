import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { TeamService } from 'src/services/team.service';
import { Router } from '@angular/router';

import { ConfirmationService } from 'primeng/api';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  
  providers: [ConfirmationService]
})
export class LoginComponent implements OnInit {
  [x: string]: any;
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  info;
  spinner = false;
  data;
  constructor(private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService,public router: Router,private toastr: ToastrService,public TeamService: TeamService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern(/^(\d{10}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3}))$/)])],
      password: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
    rememberset:['']
  });
  if (localStorage.getItem('email') != 'null' || localStorage.getItem('password') != 'null'){
    this.loginForm.setValue({
      email: localStorage.getItem('email'),
      password: localStorage.getItem('password'),
      rememberset : localStorage.getItem('rememberset'),
      })
    }
  }
  get f() { return this.loginForm.controls; }

  
  onSubmit(){
    // this.spinner =  true;
    this.spinner = true;
    this.markFormTouched(this.loginForm);
    if (this.loginForm.valid) {
      var formValues = this.loginForm.getRawValue;

    } else {
      this.loginForm.controls['rememberset'].setValue(false);
    }
    const rememberset = this.loginForm.value.rememberset;
    if (rememberset) {
      localStorage.setItem('email', this.loginForm.value.email);
      localStorage.setItem('password', this.loginForm.value.password);
      localStorage.setItem('rememberset', this.loginForm.value.rememberset);

  } 
  else 
  {
    localStorage.setItem('email', 'null');
    localStorage.setItem('password', 'null');
    localStorage.setItem('rememberset', 'null');
  }
    this.data = {
      "email": this.loginForm.value.email,
      "password": this.loginForm.value.password
    }
   
    this.submitted = true;
    
    if (this.loginForm.invalid) {
      return;

    }
    else{
        this.spinner = true;
        debugger;
      this.TeamService.Login(this.data).subscribe(res => { 
                  this.info = res;
                  localStorage.setItem('id',this.info.emp_id);
                  localStorage.setItem('email',this.info.email);
                  localStorage.setItem('name',this.info.empName);
                  localStorage.setItem('role',this.info.role);
                 this.spinner =false;
                  if(this.info.status ===  true && this.info.role == 0){
                    this.toastr.success('Successfully signin !!!');
                    this.router.navigateByUrl('/User');
                    this.spinner = false;             
                    this.loginForm.reset();
                    }
                    else if(this.info.status ===  true && this.info.role == 1){
                      this.toastr.success('Successfully signin !!!');
                      this.router.navigateByUrl('/Admin');
                      this.spinner = false;             
                      this.loginForm.reset();
                    }
                    else if(this.info.status ===  true && this.info.role == 2){  
                      this.toastr.success('Successfully signin !!!');                   
                      this.router.navigateByUrl('/HR');
                      this.spinner = false;             
                      this.loginForm.reset();
                    }
                    else if(this.info.status ===  true && this.info.role == 3){
                      this.toastr.success('Successfully signin !!!');
                      this.router.navigateByUrl('/Employee');
                      this.spinner = false;             
                      this.loginForm.reset();
                    }
                    else if(this.info.status ===  false && this.info.responseMessage === 'email not verified'){
                      this.confirmationService.confirm({
                        message: 'Do you want to delete this content ?',
                        header: 'Approve Confirmation',
                        icon: 'pi pi-info-circle',
                        accept: () => {
                         
                          var email = 'email=' + this.loginForm.value.email
                         
                          this.TeamService.sendemail(email).subscribe(res => { 
                          })
         
                        },
                        reject: () => {
                          this.toastr.error('The content could not be deleted, please try again.');
                        }
                      });   }
                    else
                    if (this.info.status === false ||this.info.status !=  true ){
                      this.toastr.error('Invalid credentials Oops !!!');
                
                    }                   
                    else
                    if (this.info.status === 401 ||this.info.responseMessage === 'Email id does not exist' ){
                      this.toastr.error('Invalid credentials Oops !!!');
                
                    }
                },error => {

                  if(error.status === 0){
                    this.toastr.error('Please check your network !!!');
                    this.spinner = false;
                  }
                }
                )
                
                // this.spinner = false;             
                  

     
    }
  
           
  }
  markFormTouched(group: FormGroup | FormArray) {
    Object.keys(group.controls).forEach((key: string) => {
      const control = group.controls[key];
      if (control instanceof FormGroup || control instanceof FormArray) { control.markAsTouched(); this.markFormTouched(control); }
      else { control.markAsTouched(); };
    });
  };
}
  

