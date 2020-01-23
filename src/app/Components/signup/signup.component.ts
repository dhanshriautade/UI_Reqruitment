import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators ,FormArray} from '@angular/forms';
import { MustMatch } from '../_helpers/must-match.validator';
import { map } from "rxjs/operators";
import { TeamService } from 'src/services/team.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  preserveWhitespaces: false
})
export class SignupComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  verifyemail= false;
  spinner= false;
  data;
  pattern = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  separateDialCode = true;

  constructor(private formBuilder: FormBuilder,public router: Router,private toastr: ToastrService, public TeamService: TeamService) { }

  ngOnInit() {
      this.registerForm = this.formBuilder.group({

          firstname: ['', [Validators.required, Validators.pattern(/^\S*$/)]],
          lastName: ['', [Validators.required, Validators.pattern(/^\S*$/)]],
          email: ['', [Validators.required, Validators.email]],
          phoneNumber: ['', [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]],
          countryCode:['', Validators.required],
          // phone: ['', Validators.required],
          password: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
          confpassword: ['', Validators.required]
      },
          {
              validator: MustMatch('password', 'confpassword')
          }
      );
  }

  // convenience getter for easy access to form fields
 


  onKey(event: any) { // without type info
      this.verifyemail = false;
      this.data = {
          "firstName": "",
          "lastName": "",
          "contact": "",
          "email": event.target.value,
          "password": "",
          "country": "",
          "reEnterPassword": ""
      }
      
      this.TeamService.AlreadyUse(this.data).subscribe((res:any) => {
         
          if(res!= null){
            if(res.message == 'already have an account in this Email'){
              this.verifyemail = true;
          }
        }
      })
  }
  get f() { return this.registerForm.controls; }
 
  onSubmit() {
      this.submitted = true;
       this.markFormTouched(this.registerForm);
       if (this.registerForm.valid) {
          var formValues = this.registerForm.getRawValue;
       }      
      this.data = {
          "firstName": this.registerForm.value.firstname,
          "lastName": this.registerForm.value.lastName,
          "contact": this.registerForm.value.phoneNumber,
          "email": this.registerForm.value.email,
          "password": this.registerForm.value.password,
          "countryCode": this.registerForm.value.countryCode,
          "reEnterPassword": this.registerForm.value.confpassword,

      }
      console.log('data',this.data);
      if (this.registerForm.invalid) {
          return;
    
        }
     
   
          this.spinner = true;  
       
         
          this.TeamService.SignUp(this.data).subscribe((res : any) => {
              if(res.code === '200' || res.code === 200  ){
              this.toastr.success('Successfully Created !!!');
              this.router.navigateByUrl('/login');
              this.spinner = false;
      
        
               }
          },error => {
            this.toastr.error('Please check your network !!!');
            this.spinner = false;
          })

          this.registerForm.reset();
        
   
      
  }
  markFormTouched(group: FormGroup | FormArray) {
      Object.keys(group.controls).forEach((key: string) => {
        const control = group.controls[key];
        if (control instanceof FormGroup || control instanceof FormArray) { control.markAsTouched(); this.markFormTouched(control); }
        else { control.markAsTouched(); };
      });
    };
}
      

  
