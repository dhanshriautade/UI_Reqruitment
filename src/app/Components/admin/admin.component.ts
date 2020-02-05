import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/services/employee.service';
import { TeamService } from 'src/services/team.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  data1: any;
  data2
  data3
  data4
  databar: any;
  infodetail = [];
  configer: any;
  data;
  jobseekercount;
  jobEmployeecount;
  totalItems = 0;
  Applyjobcount;
  JobCount;
  public datadonut: any[] = [
    {
      kind: 'Completed', share: 0.175,  color:'#37D7FF' 
    }, 
    {
      kind: 'On Hold', share: 0.175 , color:'#FF746D'
    },
     {
      kind: 'In Progress', share: 0.175 ,  color:'#FEE37B'
    }, 
    ];
  
    public labelContent(e: any): string {
      return e.category;
    }

  constructor(public EmployeeService: EmployeeService, public TeamService: TeamService,) {

    this.EmployeeService.getjobseekercount().subscribe(res => {
      this.jobseekercount = res.length
    })

    this.EmployeeService.getEmployeecount().subscribe(res => {
      this.jobEmployeecount = res.length
    })

    this.TeamService.getNotification().subscribe((res: any) => {
      this.Applyjobcount = res.finalNotificationResponse.length;
     
    })

    this.TeamService.Getalljob().subscribe((res:any) => {
      this.JobCount = res.length
 
  })

    http://localhost:8081/findByRole?role=0
    // this.data1 = {
    //   labels: ['A', 'B', 'C'],
    //   datasets: [
    //     {
    //       data: [300, 150,200],
    //       backgroundColor: [
    //         "#FF6384",
    //         "#36A2EB",
    //         "#FFCE56"
    //       ],
    //       hoverBackgroundColor: [
    //         "#FF6384",
    //         "#36A2EB",
    //         "#FFCE56"
    //       ]
    //     }]
    // };
    this.getAllEmployeesList();
    this.databar = {
      labels: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
        'u', 'v', 'w', 'x', 'y', 'z'],
      datasets: [
        {
          label: 'My First dataset',
          backgroundColor: '#BC9BF1',
          borderColor: '#1E88E5',
          data: [65, 59, 56, 85, 56, 55, 40, 59, 80, 51, 56, 65, 59, 76, 40, 56, 55, 40, 59, 80, 24, 56, 56, 55, 40, 59, 50,]
        },
      ]
    }
  }

  ngOnInit() {
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
      this.configer = {
        itemsPerPage: 8,
        currentPage: 1,
        totalItems: this.infodetail.length
      };
      console.log('list', this.infodetail);
    });
  }
  pageChanged(event) {
    this.configer.currentPage = event;
  }
}
