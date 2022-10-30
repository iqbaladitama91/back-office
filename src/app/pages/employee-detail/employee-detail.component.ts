import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import employeeData from 'src/data/mock.json';
import { Employee } from 'src/app/model/employee';
import formatter from 'src/app/formatter/index';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css'],
})
export class EmployeeDetailComponent implements OnInit, OnDestroy {
  employeeList: Employee[] = employeeData;
  routeSub!: Subscription;
  employee!: Employee;
  formattedSalary: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe((param) => {
      if (param['id']) {
        this.getData(param['id']);
      }
    });
  }

  getData(id: any) {
    const parsedId = parseInt(id);
    const index = this.employeeList.map((el) => el.id).indexOf(parsedId);
    this.employee = this.employeeList[index];
    this.formattedSalary = formatter.commaAmount(this.employee.basicSalary);
  }
  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }
}
