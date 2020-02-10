import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.scss']
})
export class JobDetailComponent implements OnInit {
  displaydilog: boolean;
  isActive: boolean;

  constructor() { }

  showTest(){
    this.displaydilog=true;
  }
  onClick() {
    this.isActive = !this.isActive;
    
  }
 
  ngOnInit() {
  }

}

