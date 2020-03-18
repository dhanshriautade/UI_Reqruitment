// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const base_url = 'http://localhost:8081/';
const notify_url = 'http://localhost:8085/';
// const base_url = 'http://localhost:8080/MDPRecruitment/';
// const notify_url = 'http://localhost:8080/MDPNotification/';
export const environment = {
  production: false,
  Employeepost:base_url + 'addEmployee',
  UpdateEmployee:base_url + 'updateEmployee',
  DeleteEmployee:base_url + 'deleteEmployee',
  Employeeget:base_url + 'getAllEmployeesInfo',
  getjobseekercount: base_url + 'findByRole?role=0',
  getEmployeecount: base_url + 'findByRole?role=3',
  getAllJob:base_url + 'getalljobpostingdetails',
  signUp: base_url + 'signup',
  login:base_url + 'check/checkLogin',
  sendemail: base_url + 'sendemail',
  searchDepartmentWiseJob: base_url + 'searchDepartment?department',
  alreadyUser:base_url + 'verifyemail/eventhit',
  uploadresume:base_url + 'uploadDocuments',
  forgot: base_url + 'emailexists?email=',
  getprofile:base_url + 'getprofile',
  GetResume:base_url + 'getCandidateById',
  downloadResume: base_url + 'downloadCandidateDocument',
  AddInfo:base_url + 'experienceprofile',
  CreateJob: base_url + 'addjobcreation',
  DeletejobId : base_url + 'deletejobcreationbyid',
  EditJob: base_url + 'updatejobcreation',
  UpdatePrimarySkill: base_url + 'updatePrimarySkill',
  UpdateSecondarySkill: base_url + 'updateSecondarySkill',
  getjobId: base_url + 'getUniqueJobId',
  UpdateCollegeEducationlDetails:  base_url +'updateCollegeEducationlDetails',
  UpdateSchoolEducationlDetails: base_url +'updateSchoolEducationlDetails',
  UpdatePostEducationlDetails:  base_url +'updatePostEducationlDetails',
  UpdatePersonalDetails:  base_url +'updatePersonalDetails',
  AssignEmployeeToInterview: base_url + 'assignCandidateForInterview',
  getEmployeeByDepartment: base_url + 'getEmployeeInfoByDepartment',
  getEmployeeByDesignation: base_url + 'getEmployeeInfoByDesignation',
  saveCandidateJobApplication: base_url + 'savecandidatejobapplication',
  getJobIdWiseDetail:base_url + 'jobidwithcandidates?jobId=',
  allotTimetoJobseeker: base_url + 'allotTime',
  renameDocument: base_url + 'renameCandidateDocument',
  deleteDocument: base_url + 'deleteSpecificDocument',
  getappliedCountagainstJobid: base_url + 'candidatecountagainstjobid?jobId=',
  //Notification
  getnotification: notify_url + 'getAllNotification',
  getNotificationReminder: notify_url +'hrreminder',
  ApplyJob:  notify_url +'jobapplynotification',
  AppliedJob:  notify_url +'jobApplied',
  getAllocatedJobseeker: notify_url + 'getAssignCandidateInfoById?employeeId='

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
