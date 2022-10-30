import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  //data
  username!: string;
  password!: string;
  usernameError: boolean = false
  passwordError: boolean = false
  errUsernameMsg?: string
  errPasswordMsg?: string
  errUserPass: boolean = false
  isSubmited: boolean = false

  constructor(private router : Router, private toast: ToastrService) {  }

  ngOnInit(): void {
  }

  //method
  onChangeUsername(val: any) {
    const errUsername = val.form.controls.username.errors

    if(this.username.length < 5) {
      this.usernameError = true
      this.errUsernameMsg = "Username Minimal 5 Karakter"
    } else {
      this.usernameError = false
      this.errUsernameMsg = ""
    }
    if(errUsername == null) {
      this.usernameError = false
    } else {
      this.usernameError = true
    }
  }

  onChangePassword(val: any) {    
    const errPassword = val.form.controls.password.errors

    if(this.password.length < 5) {
      this.passwordError = true
      this.errPasswordMsg = "Password Minimal 5 Karakter"
    } else {
      this.passwordError = false
      this.errPasswordMsg = ""
    }

    if(errPassword == null) {
      this.passwordError = false
    } else {
      this.passwordError = true
    }
  }

  submit(login : any){
    const errUsername = login.form.controls.username.errors
    const errPassword = login.form.controls.password.errors
    this.isSubmited = true

    if(errUsername !== null) {
      this.usernameError = true
      this.errUsernameMsg = "Email Wajib Di Isi!!"
    } 
    
    if(this.username !== undefined) {
      if(this.username.length < 5 ) {
        this.usernameError = true
        this.errUsernameMsg = "Username Minimal 5 Karakter"
      } else if(this.username.length >= 5) {
        this.usernameError = false
        this.errUsernameMsg = ""
      }
    }
    
    if(this.password !== undefined) {
      if(this.password.length < 5 ) {
        this.passwordError = true
        this.errPasswordMsg = "Password Minimal 5 Karakter"
      } else {
        this.usernameError = false
        this.errUsernameMsg = ""
      }
    }
    
    if(errPassword !== null) {
      this.passwordError = true
      this.errPasswordMsg = "Password Wajib Di Isi!"
    } 

    if((this.username && this.password) !== "ADMIN" && !(errUsername && errPassword)) {
      this.toast.error("Username atau Password Salah")
    }

    if((this.username && this.password) === "ADMIN"){
      this.router.navigateByUrl("/employee-list")
    }
    console.log(login)
  }

}
