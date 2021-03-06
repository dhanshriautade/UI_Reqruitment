import { Component, OnInit } from '@angular/core';
import { TeamService } from 'src/services/team.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { EmployeeService } from 'src/services/employee.service';
import { ToastrService } from 'ngx-toastr';
@Component({
    selector: 'app-add-employee',
    templateUrl: './add-employee.component.html',
    styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {
    getAllEmployeedata;
    display = false;
    data;
    dataone;
    list;
    action = 'Save'
    designationList: any = [];
    submitted: boolean;
    useradd: boolean = false;
    infodetailemployee;
    configer;
    docArray = [];
    documentArray = [];
    editStatus = false;
    docidArray = [];
    infodetail = [];
    role;
    lengthItem;
    employeeForm = new FormGroup({
    });
    departmentsAndDesignations: any = [];
    constructor(public TeamService: TeamService, private toastr: ToastrService, private formBuilder: FormBuilder, public EmployeeService: EmployeeService) {
        this.role = localStorage.getItem('role');
        this.departmentsAndDesignations = [['Software', ["Android", "IOS", "Java"]],
        ["Embedded", ["Embedded department 1", "Embedded department 2", "Embedded department 3"]],
        ["Mechanical", ["Mechanical department 1", "Mechanical department 2", "Mechanical department 3"]]];
        this.getAllEmployeesList();

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
          if(this.infodetail.length != 0 ){
            this.lengthItem = this.infodetail.length
          }
          else{
              this.lengthItem = 0
          }
          this.configer = {
            itemsPerPage: 8,
            currentPage: 1,
            totalItems: this.lengthItem
          };
        //   console.log('list', this.infodetail);
        });
      }
   
    getDesignationList() {
        let dept = this.employeeForm.get('department').value;
        let map = new Map(this.departmentsAndDesignations);
        for (let entry of map.entries()) {
            if (dept === entry[0]) {
                this.designationList = entry[1];
            }
        }
        this.list = this.designationList;
    }

    pageChanged(event) {
        this.configer.currentPage = event;
      }
      
    EditEmployee(i: any) {
        // console.log('edit', this.infodetail[i].designation);

        this.action = ''
        this.display = true;
        this.editStatus = true;
        this.employeeForm.get('firstName').setValue(this.infodetail[i].firstName);
        this.employeeForm.get('lastName').setValue(this.infodetail[i].lastName);
        this.employeeForm.get('title').setValue(this.infodetail[i].title);
        this.employeeForm.get('email').setValue(this.infodetail[i].email);
        this.employeeForm.get('phoneNo').setValue(this.infodetail[i].phoneNo);
        this.employeeForm.get('department').setValue(this.infodetail[i].department);
        this.employeeForm.get('designation').setValue(this.infodetail[i].designation);
        this.employeeForm.get('dob').setValue(this.infodetail[i].dob);
        this.employeeForm.get('passport').setValue(this.infodetail[i].passport);
        this.employeeForm.get('pan').setValue(this.infodetail[i].pan);
        this.employeeForm.get('voterId').setValue(this.infodetail[i].voterId);
        this.employeeForm.get('adhar').setValue(this.infodetail[i].adhar);
        this.employeeForm.get('drivingLicence').setValue(this.infodetail[i].drivingLicence); 
        this.docArray = [];
        if(this.infodetail[i].adhar !== ""){
            this.docArray.push( 'Adhar Card' + ' ( ' + this.infodetail[i].adhar + ')');     
               
        }
        if(this.infodetail[i].passport !==  "" ){
            this.docArray.push('Passport' + ' ( ' + this.infodetail[i].passport + ')');
      
        }
        if(this.infodetail[i].pan !== ""){
            this.docArray.push('PAN Card' + ' ( ' +  this.infodetail[i].pan + ')');
               }
        if(this.infodetail[i].drivingLicence !== ""){
            this.docArray.push('Driving Lincese'+ ' ( ' + this.infodetail[i].drivingLicence + ' )');
      
        }
        if(this.infodetail[i].voterId !== "" ){
            this.docArray.push('Voter IDt'+ ' ( ' + this.infodetail[i].voterId + ') ')
   
        }
         }
    DeleteEmployee(email: any) {
       
        const emailData =
        {
            "email": email
        }
        this.EmployeeService.DeleteEmployee(emailData).subscribe(res => {
        })
        this.getAllEmployeesList();
    }    
    ngOnInit() {
        this.employeeForm = this.formBuilder.group({
            title: ['', Validators.required],
            firstName: ['', [Validators.required, Validators.pattern(/^\S*$/)]],
            lastName: ['', [Validators.required, Validators.pattern(/^\S*$/)]],
            email: ['', [Validators.required, Validators.email]],
            phoneNo: ['', [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]],
            // phone: ['', Validators.required],
            dob: ['', Validators.required],
            ID: ['', Validators.required],
            idno: ['', Validators.required],
            passport: [''],
            pan: [''],
            adhar: [''],
            drivingLicence: [''],
            voterId: ['',],
            status: [''],
            department: [''],
            designation: ['']
        })
    }
    get f() { return this.employeeForm.controls; }
    onSubmit(action) {
        console.log('action', action)
        this.submitted = true;
        if (this.employeeForm.invalid) {
            return;
        }
        this.data = {
            "title": this.employeeForm.value.title,
            "firstName": this.employeeForm.value.firstName,
            "lastName": this.employeeForm.value.lastName,
            "email": this.employeeForm.value.email,
            "phoneNo": this.employeeForm.value.phoneNo,
            //"contact": this.employeeForm.value.phone.number,
            "dob": this.employeeForm.value.dob,
            "passport": this.employeeForm.value.passport,
            "pan": this.employeeForm.value.pan,
            "adhar": this.employeeForm.value.adhar,
            "drivingLicence": this.employeeForm.value.drivingLicence,
            "voterId": this.employeeForm.value.voterId,
            "department": this.employeeForm.value.department,
            "designation": this.employeeForm.value.designation,
            "status": "1"
        };
         if (action == 'Save'){
           
            this.EmployeeService.AddEmployee(JSON.stringify(this.data)).subscribe((res:any) => {
                if(res.responseMessage === 'PhoneNo already exists'){
                this.toastr.success('Phone Number Already Exists !!!');
                return 0;
                } else if(res.responseMessage === 'Email id exists already'){
                    this.toastr.success('Email Id Already Exists !!!');
                    return 0;
                } else if(res.responseMessage === 'Success'){
                    this.toastr.success('Successfully Added Employee !!!');
                }
                this.submitted = false;
                this.employeeForm.reset();
                this.docArray = [];
                this.getAllEmployeesList();
                this.display = false;
                this.employeeForm.reset();
            })
        }
        else {
            this.EmployeeService.UpdateEmployee(JSON.stringify(this.data)).subscribe((res:any) => {
                  if(res.responseMessage === 'Success'){
                        this.toastr.success('Successfully Update Employee !!!');
                    }
                this.submitted = false;
                this.employeeForm.reset();
                this.docArray = [];
                this.display = false;
                this.getAllEmployeesList();
            })
        }
       
       
    }
    removeSkill() {
       
        if (this.action == 'Save'){
             this.employeeForm.reset();
        }
        else if(this.action == ''){ 
            this.action = 'Save';
            this.employeeForm.reset();
        }
        this.display = false;

    }
    addDocument() {
        if (this.action == 'Save'){
            if(this.employeeForm.get('ID').value == '')  {
            this.toastr.error('Please Select Identity Card');
            return 0;
            }
        }
        else{
        if(this.employeeForm.get('ID').value  == '' || this.employeeForm.get('idno').value == '' || this.employeeForm.get('idno').value == null ){
            this.toastr.error('Please Select Identity Card');
            return 0;
        }
        }
        
        console.log('type',this.docArray);
        this.docArray.push(this.employeeForm.get('ID').value + ' ('+ this.employeeForm.get('idno').value + ')')
        this.documentArray.push(this.employeeForm.get('idno').value)
        this.docidArray.push(this.employeeForm.get('ID').value);

        if (this.employeeForm.value.ID === 'Adhar Card') {
            this.employeeForm.value.adhar = this.employeeForm.get('idno').value;
        } else if (this.employeeForm.value.ID === 'Passport') {
            this.employeeForm.value.passport = this.employeeForm.get('idno').value;
        } else if (this.employeeForm.value.ID === 'PAN Card') {
            this.employeeForm.value.pan = this.employeeForm.get('idno').value;
        } else if (this.employeeForm.value.ID === 'Driving Lincese') {
            this.employeeForm.value.drivingLicence = this.employeeForm.get('idno').value;
        } else if (this.employeeForm.value.ID === 'Voter ID') {
            this.employeeForm.value.voterId = this.employeeForm.get('idno').value;
        }
    }
    removeDoc(i: any) {
        this.docArray.splice(i, 1);
    }
    PersonalInfo() {
        this.display = true;
        this.docArray = [];
    }
}
