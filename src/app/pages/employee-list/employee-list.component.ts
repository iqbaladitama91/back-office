import { Component, OnInit } from '@angular/core';
import data from '../../../data/mock.json'
import { Employee } from 'src/app/model/employee';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employeeList : Employee[] = data
  optionPerPageList :number[] = [5,10,15,20]
  email?: any
  group?: any
  reverse: boolean = false
  key: string = "id"
  p: number = 1
  itemPerPage: number = 5

  constructor() { }

  ngOnInit(): void {    
  }

  search(): void {
    if(this.email !== undefined && this.group !== undefined ){
      this.employeeList = this.employeeList.filter( el => {
        return el.email?.toLocaleLowerCase().match(this.email?.toLocaleLowerCase()) 
        && el.group?.toLocaleLowerCase().match(this.group.toLocaleLowerCase());
      })
    } else {
      console.log(this.email !== undefined, this.group !== undefined);
      
      this.employeeList = data
      console.log("Salahhhh");
    }
  }
  reset(): void {
    this.employeeList = data
  }
  sort(key: any) : void {
    this.key = key
    this.reverse= !this.reverse
  }
}
