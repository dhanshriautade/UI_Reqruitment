import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { TeamService } from 'src/services/team.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {
  data;
  forgetForm: FormGroup;
  loading = false;
  submitted = false;
  spinner = false;
  constructor(private formBuilder: FormBuilder,public TeamService: TeamService,private toastr: ToastrService) { }

  ngOnInit() {
    this.forgetForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }
  get f() { return this.forgetForm.controls; }
  Forgot(){

    this.markFormTouched(this.forgetForm);
    if (this.forgetForm.valid) {
      
      var formValues = this.forgetForm.getRawValue;

    } else {
      
    }
    
    this.submitted = true;
    
    if (this.forgetForm.invalid) {
      return;
    }
    else{
      this.spinner = true;
      this.TeamService.forgot(this.forgetForm.value.email).subscribe((res:any) => {
      
      if(res.responseMessage=== 'Password Reset Link sent to Email'){
        this.toastr.success('Please check your Email !!!');
        this.spinner = false;
        this.forgetForm.get('email').setValue('');
      }
      
     
    },error => {
        this.toastr.error('Please check your network !!!');
        this.spinner = false;
      })
    this.forgetForm.reset();
   
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
