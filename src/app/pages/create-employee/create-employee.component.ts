import { Component, OnInit } from '@angular/core';
import groupData from 'src/data/group.json';
import { Group } from 'src/app/model/group';
import { Employee } from 'src/app/model/employee';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css'],
})
export class CreateEmployeeComponent implements OnInit {
  groupList: Group[] = groupData;
  buttonLabel: string = 'Select Group';
  statusOption: string[] = ["true", 'false']  
  errEmailMsg: string = '';
  emailError: boolean = false;
  currentDate!: string;
  employee: Employee = new Employee();

  constructor() {}

  ngOnInit(): void {
    this.getCurrentDate();
  }

  getCurrentDate(): void {
    const date = new Date();

    const year = date.toLocaleString('default', { year: 'numeric' });
    const month = date.toLocaleString('default', { month: '2-digit' });
    const day = date.toLocaleString('default', { day: '2-digit' });

    const formattedDate = year + '-' + month + '-' + day;
    this.currentDate = formattedDate;
  }

  submit(val: any): void {}

  onChangeEmail(): void {
    const email = this.employee.email
    if (email.includes('@') && email.includes('.com')) {
      const emailArr = email.split('@');

      //name from name@domain.com
      const name = emailArr[0];
      if (name.length < 3) {
        this.emailError = true;
        this.errEmailMsg = 'Email Minimal 3 Karakter';
      } else {
        this.emailError = false;
      }
    } else {
      this.emailError = true;
      this.errEmailMsg = 'Email Tidak Valid';
    }
  }

  searchGroup(val: string) {
    if (val.length > 0) {
      this.groupList = this.groupList.filter((el) => {
        return el.group?.toLocaleLowerCase().match(val.toLocaleLowerCase());
      });
    } else {
      this.groupList = groupData;
    }
  }

  select(val: any): void {
    console.log(val, 'vall');

    this.buttonLabel = val;
  }
}
