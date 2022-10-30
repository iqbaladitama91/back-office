import { Component, OnInit } from '@angular/core'
import groupData from 'src/data/group.json'
import { Group } from 'src/app/model/group'
import { Employee } from 'src/app/model/employee'
import { Error } from 'src/app/model/error'
import { ErrorMessage } from 'src/app/model/errorMessage'
import formatter from 'src/app/formatter'
import { Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css'],
})
export class CreateEmployeeComponent implements OnInit {
  groupList: Group[] = groupData
  buttonLabel: string = 'Select Group'
  statusOption: string[] = ['true', 'false']
  error: Error = new Error()
  errMsg: ErrorMessage = new ErrorMessage()
  currentDate!: string
  group: string = ""
  employee: Employee = new Employee()
  formattedBasicSalary: string = ""
  isSubmited: boolean = false
  

  constructor(private router: Router, private toast : ToastrService) {}

  ngOnInit(): void {
    this.getCurrentDate()
    // console.log(this.num.toLocaleString('id-ID',{style:"currency", currency:"IDR"}));
    
  }
  

  formatBasicSalary(val: number) : void {
    console.log(val);
    
    if(val !== null) {
      const basicSalary = formatter.commaAmount(val)
      console.log(basicSalary);
    }    
    
  }

  getCurrentDate(): void {
    const date = new Date()

    const year = date.toLocaleString('default', { year: 'numeric' })
    const month = date.toLocaleString('default', { month: '2-digit' })
    const day = date.toLocaleString('default', { day: '2-digit' })

    const formattedDate = year + '-' + month + '-' + day
    this.currentDate = formattedDate
  }

  
  

  checkErrFirstName(val: string){
    if (val.length === 0) {
      this.error.firstNameError = true
      this.errMsg.errFirstNameMsg = 'First Name Is Required'
    } else if (val.length <= 2) {
      this.error.firstNameError = true
      this.errMsg.errFirstNameMsg = 'First Name Minimum 2 Character'
    } else {
      this.error.firstNameError = false
    }
  }

  checkErrLastName(val: string) {
    if (val.length === 0) {
      this.error.lastNameError = true
      this.errMsg.errLastNameMsg = 'Last Name Is Required'
    } else if (val.length <= 2) {
      this.error.lastNameError = true
      this.errMsg.errLastNameMsg = 'Last Name Minimum 2 Character'
    } else {
      this.error.lastNameError = false
    }
  }

  checkErrUsername(val: string) {
    if (val.length === 0) {
      this.error.usernameError = true
      this.errMsg.errUsernameMsg = 'Username Is Required'
    } else if (val.length <= 2) {
      this.error.usernameError = true
      this.errMsg.errUsernameMsg = 'Username Minimum 5 Character'
    } else {
      this.error.usernameError = false
    }
  }

  checkErrEmail(val: string) {
    if (val.length === 0 && (!val.includes('@') && !val.includes('.com'))) {
      this.error.emailError = true
      this.errMsg.errEmailMsg = "Email Is Required"
    }
     else if (val.includes('@') && val.includes('.com')) {
      const emailArr = val.split('@')

      //name from name@domain.com
      const name = emailArr[0]
      if (name.length < 3) {
        this.error.emailError = true
        this.errMsg.errEmailMsg = 'Email Minimum 3 Character'
      } else {
        this.error.emailError = false
      }
    } else {
      this.error.emailError = true
      this.errMsg.errEmailMsg = 'Email Not Valid'
    }
  }

  checkErrBirtDate(val:string) {
    if(val.length === 0) {
      this.error.birtDateError = true
      this.errMsg.errBirtDateMsg = "Birt Date Is Required"
    } else {
      this.error.birtDateError = false
    }
  }

  checkErrBasicSalary(val: number) {
    if(val === 0) {
      this.error.basicSalaryError = true
      this.errMsg.errBasicSalaryMsg = "Basic Salary Is Required"
    } else if (val < 1000000) {
      this.error.basicSalaryError = true
      this.errMsg.errBasicSalaryMsg = "Basic Salary Minimum Is 1.000.000"
    } else {
      this.error.basicSalaryError = false
    }
  }

  checkErrStatus(val: string) {
    if(val.length === 0) {
      this.error.statusError = true
      this.errMsg.errStatusMsg = "Status Is Required"
    } else {
      this.error.statusError = false
    }
  }

  checkErrGroup(val: string) {
    if(val.length === 0) {
      this.error.groupError = true
      this.errMsg.errGroupMsg = "Group Is Required"
    } else {
      this.error.groupError = false
    }
  }

  checkErrDescription(val: string) {
    if(val.length === 0) {
      this.error.descriptionError = true
      this.errMsg.errDescriptionMsg = "Description Is Required"
    } else {
      this.error.descriptionError = false
    }
  }

  onChangeEmail(val: string): void {
    this.checkErrEmail(val)
  }

  searchGroup(val: string) {
    if (val.length > 0) {
      this.groupList = this.groupList.filter((el) => {
        return el.group?.toLocaleLowerCase().match(val.toLocaleLowerCase())
      })
    } else {
      this.groupList = groupData
    }
  }

  onChangeFirstName(val: string): void {
    this.checkErrLastName(val)
  }

  onChangeLastName(val: string): void {
    this.checkErrLastName(val)
  }

  onChangeUsername(val: string) : void {
    this.checkErrUsername(val)
  }

  onChangeBirtDate(val: string) : void {
    this.checkErrBirtDate(val)
  }

  onChangeBasicSalary(val: number) : void {
    this.checkErrBasicSalary(val)
  }

  onChangeStatus(val: string) : void {
    this.checkErrStatus(val)
  }

  onChangeDescription(val : string) : void {
    this.checkErrDescription(val)
  }





  select(val: any): void {
    this.buttonLabel = val
    this.employee.group = val
  }

  submit(val: any): void {        
    this.isSubmited = true
    this.checkErrUsername(this.employee.username)
    this.checkErrFirstName(this.employee.firstName)
    this.checkErrLastName(this.employee.lastName)
    this.checkErrEmail(this.employee.email)
    this.checkErrBirtDate(this.employee.birtDate)
    this.checkErrBasicSalary(this.employee.basicSalary)
    this.checkErrStatus(this.employee.status)
    this.checkErrGroup(this.employee.group)
    this.checkErrDescription(this.employee.description)
    console.log(this.isSubmited && this.error.groupError);
    
    if(val.valid && !this.error.groupError) {
      this.toast.success("Success Add Employee")
    }
  }
}
