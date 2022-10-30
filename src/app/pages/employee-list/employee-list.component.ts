import { Component, OnInit } from '@angular/core';
import data from '../../../data/mock.json';
import { Employee } from 'src/app/model/employee';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Error } from 'src/app/model/error';
import { ErrorMessage } from 'src/app/model/errorMessage';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent implements OnInit {
  employeeList: Employee[] = data;
  email: string = '';
  group: string = '';
  err: Error = new Error();
  errMsg: ErrorMessage = new ErrorMessage();
  optionPerPageList: number[] = [5, 10, 15, 20];
  reverse: boolean = false;
  key: string = 'id';
  p: number = 1;
  itemPerPage: number = 5;

  constructor(private router: Router, private toast: ToastrService) {}

  ngOnInit(): void {
    this.errMsg.errEmailMsg = 'Input Email';
    this.errMsg.errGroupMsg = 'Input Group';
  }

  search(): void {
    const email = this.email;
    const group = this.group;
    if (email.length > 0 && group.length > 0) {
      this.p = 1;
      this.err.emailError = false;
      this.err.groupError = false;
      this.employeeList = this.employeeList.filter((el) => {
        return (
          el.email?.toLocaleLowerCase().match(email.toLocaleLowerCase()) &&
          el.group?.toLocaleLowerCase().match(group.toLocaleLowerCase())
        );
      });
    } else if (email.length === 0 && group.length > 0) {
      this.err.emailError = true;
      this.errMsg.errEmailMsg = 'Email Is Required';
    } else if (email.length > 0 && group.length === 0) {
      this.err.groupError = true;
      this.errMsg.errGroupMsg = 'Group Is Required';
    } else if (email.length === 0 && group.length === 0) {
      this.err.emailError = true;
      this.errMsg.errEmailMsg = 'Email Is Required';
      this.err.groupError = true;
      this.errMsg.errGroupMsg = 'Group Is Required';
    } else {      
      this.employeeList = data;
    }
  }

  goToDetail(id: any): void {
    this.router.navigateByUrl(`/employee-list/${id}`);
  }
  reset(): void {
    this.employeeList = data;
  }
  sort(key: any): void {
    this.key = key;
    this.reverse = !this.reverse;
  }

  edit(): void {
    this.toast.warning('Edit Data Success', 'Edit Action');
  }
  delete(): void {
    this.toast.error('Delete Data Success', 'Delete Action');
  }
}
