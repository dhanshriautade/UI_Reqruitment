import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/services/employee.service';
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
  totalItems = 0;
  constructor(public EmployeeService: EmployeeService) {
    this.data1 = {
      datasets: [
        {
          data: [300, 150],
          backgroundColor: [
            "#04CF72",
            "#F4F6F9",
          ],
          hoverBackgroundColor: [
            "#04CF72",
            "#F4F6F9",
          ]
        }]
    };
    this.data2 = {
      datasets: [
        {
          data: [300, 100],
          backgroundColor: [
            "#F61C5E",
            "#F4F6F9",
          ],
          hoverBackgroundColor: [
            "#F61C5E",
            "#F4F6F9",
          ]
        }]
    };
    this.data3 = {
      datasets: [
        {
          data: [200, 300],
          backgroundColor: [
            "#006FCF",
            "#F4F6F9",
          ],
          hoverBackgroundColor: [
            "#006FCF",
            "#F4F6F9",
          ]
        }]
    };
    this.data4 = {
      datasets: [
        {
          data: [300, 200],
          backgroundColor: [
            "#F69C00",
            "#F4F6F9",
          ],
          hoverBackgroundColor: [
            "#F69C00",
            "#F4F6F9",
          ]
        }]
    };
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
