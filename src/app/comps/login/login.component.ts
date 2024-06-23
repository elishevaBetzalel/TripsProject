import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Users } from 'src/app/clases/users';
import { ApiService } from 'src/app/servises/api.service';
import { UsersService } from 'src/app/servises/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent implements OnInit {

  constructor(public u: UsersService, public r: Router, public a: ApiService) { }

  myForm: FormGroup = new FormGroup({})

  ngOnInit(): void {
    this.myForm = new FormGroup(
      {
        'email': new FormControl(null, [Validators.required, this.isValidEmail.bind(this)]),
        'pass': new FormControl(null, [this.isValidPassword.bind(this)])
      }
    )
  }

  // משתני הטופס
  get email() { return this.myForm.controls['email'] }
  get password() { return this.myForm.controls['pass'] }

  //תקינות מייל
  isValidEmail(email: AbstractControl) {
    if (!email.value)
      return { 'req': true };
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      return { 'notvalid': true };
    }
    return null;
  }

  //תקינות סיסמה
  isValidPassword(password: AbstractControl) {
    if (!password.value)
      return { 'req': true };
    if (password.value.length < 6)
      return { 'min': true };
    if (password && !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(password.value)) {
      return { 'notvalid': true };
    }
    return null;
  }

  user: Users = new Users()
  login() {
    return this.u.getByEmailAndPassword(this.user.email, this.user.password)
      .subscribe(
        suc => {
          this.u.currentUser = suc
          // בדיקה אם הוא מנהל
          if (this.u.currentUser?.email == this.u.manager.email &&
            this.u.currentUser?.password == this.u.manager.password)
            this.a.isManager = true
          if (this.u.currentUser?.email)
            this.r.navigate(['/trips'])
          else if (this.email.value && this.password.value)
            this.r.navigate(['./register'])
        }
      )

  }
}
