import { Component, OnInit } from '@angular/core';
import data from '../../../data/mock.json'
import { Employee } from 'src/app/model/employee';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employeeList : Employee[] = data
  email: string = ""
  group: string = ""
  optionPerPageList :number[] = [5,10,15,20]
  reverse: boolean = false
  key: string = "id"
  p: number = 1
  itemPerPage: number = 5


  constructor(private router : Router, private toast: ToastrService) { }

  ngOnInit(): void {  
    console.log(this.employeeList);
      
  }

  search(): void {
    const email = this.email
    const group = this.group
    if(email.length > 0 && group.length > 0 ){
      this.employeeList = this.employeeList.filter( el => {
        return el.email?.toLocaleLowerCase().match(email.toLocaleLowerCase()) 
        && el.group?.toLocaleLowerCase().match(group.toLocaleLowerCase());
      })
    } else {
      console.log(email !== undefined, group !== undefined);
      
      this.employeeList = data
    }
  }
  reset(): void {
    this.employeeList = data
  }
  sort(key: any) : void {
    this.key = key
    this.reverse= !this.reverse
  }

  edit() : void {
    this.toast.warning("Edit Data Success", "Edit Action")
  }
  delete() : void {
    this.toast.error("Delete Data Success", "Delete Action")
  }
}
