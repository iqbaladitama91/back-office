import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Error } from 'src/app/model/error';
import { ErrorMessage } from 'src/app/model/errorMessage';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  //data
  username: string = '';
  password: string = '';
  error: Error = new Error()
  errMsg: ErrorMessage = new ErrorMessage()
  isSubmited: boolean = false;

  constructor(private router: Router, private toast: ToastrService) {}

  ngOnInit(): void {}

  //method
  onChangeUsername(val: any) {
    const errUsername = val.form.controls.username.errors;
    const username = val.value.username;

    if (errUsername === null && username.length < 5) {
      this.error.usernameError = true;
      this.errMsg.errUsernameMsg = 'Username Minimal 5 Karakter';
    } else {
      this.error.usernameError = false;
      this.errMsg.errUsernameMsg = '';
    }
  }

  onChangePassword(val: any) {
    const errPassword = val.form.controls.password.errors;
    const password = val.value.password;

    if (errPassword === null && password.length < 5) {
      this.error.passwordError = true;
      this.errMsg.errPasswordMsg = 'Password Minimal 5 Karakter';
    } else {
      this.error.passwordError = false;
      this.errMsg.errPasswordMsg = '';
    }
  }

  submit(login: any) {
    const errUsername = login.form.controls.username.errors;
    const errPassword = login.form.controls.password.errors;
    this.isSubmited = true;

    if (errUsername !== null) {
      this.error.usernameError = true;
      this.errMsg.errUsernameMsg = 'Username Wajib Di Isi!!';
    }

    if (errPassword !== null) {
      this.error.passwordError = true;
      this.errMsg.errPasswordMsg = 'Password Wajib Di Isi!';
    }

    if (
      (this.username && this.password) !== 'admin' &&
      !errUsername &&
      !errPassword
    ) {
      this.toast.error('Username atau Password Salah');
    }

    if ((this.username && this.password) === 'admin') {
      this.router.navigateByUrl('/employee-list');
    }
  }
}
