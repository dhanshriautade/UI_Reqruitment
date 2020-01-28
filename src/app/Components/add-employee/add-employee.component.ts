import { Component, OnInit } from '@angular/core';
import { TeamService } from 'src/services/team.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { EmployeeService } from 'src/services/employee.service';
@Component({
selector: 'app-add-employee',
templateUrl: './add-employee.component.html',
styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {
getAllEmployeedata;
display = false;
data;
dataone
designationList: any = [];
submitted: boolean;
infodetailemployee
docArray = [];
documentArray = [];
editStatus = false;
docidArray = [];
employeeForm = new FormGroup({
});
departmentsAndDesignations: any = [];
constructor(public TeamService: TeamService, private formBuilder: FormBuilder, public EmployeeService: EmployeeService) {
this.departmentsAndDesignations = [['Software', ["Android", "IOS", "Java"]], ["Embedded", ["Embedded department 1", "Embedded department 2", "Embedded department 3"]], ["Mechanical", ["Mechanical department 1", "Mechanical department 2", "Mechanical department 3"]]];

this.TeamService.GetAllEmployee().subscribe(res => {
this.getAllEmployeedata = res;
this.infodetailemployee = [];
let keys = Object.keys(this.getAllEmployeedata);
//console.log('keys', keys);
for (var i = 0; i < keys.length; i++) {
this.infodetailemployee.push(this.getAllEmployeedata[keys[i]]);
}
//console.log(this.infodetailemployee);
})
}

getDesignationList() {
let dept = this.employeeForm.get('department').value;
let map = new Map(this.departmentsAndDesignations);

for (let entry of map.entries()) {
if (dept === entry[0]) {
this.designationList = entry[1];
}
}
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
console.log(this.employeeForm)
}
get f() { return this.employeeForm.controls; }
onSubmit() {
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
"status": "1"
};
this.EmployeeService.AddEmployee(JSON.stringify(this.data)).subscribe(res => {
this.submitted = false;
this.employeeForm.reset();
this.docArray = [];
this.dataone=res
console.log(this.dataone)

})
}
removeSkill() {
this.display = false;
//this.displaylist = true;
}
addDocument() {
this.docArray.push(this.employeeForm.get('ID').value + this.employeeForm.get('idno').value)
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
}
}