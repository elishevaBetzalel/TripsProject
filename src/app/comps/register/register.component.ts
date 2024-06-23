import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Users } from 'src/app/clases/users';
import { UsersService } from 'src/app/servises/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {

  constructor(public u: UsersService, public r: Router) { }

  user: Users = new Users()
  myForm: FormGroup = new FormGroup({})

  ngOnInit(): void {
    this.myForm = new FormGroup(
      {
        'firstName': new FormControl(this.u.currentUser?.firstName, [this.isValidName.bind(this)]),
        'lastName': new FormControl(this.u.currentUser?.lastName, [this.isValidName.bind(this)]),
        'phone': new FormControl(this.u.currentUser?.phone, [Validators.required, Validators.minLength(9), Validators.maxLength(10)]),
        'email': new FormControl(this.u.currentUser?.email, [Validators.required, this.isValidEmail.bind(this)]),
        'pass': new FormControl(this.u.currentUser?.password, [this.isValidPassword.bind(this)]),
        'passValidation': new FormControl(this.u.currentUser?.password, [this.ismatched.bind(this)]),
        'isFirstAid': new FormControl(this.u.currentUser?.isFirstAid)
      }
    )
  }

  // משתני הטופס
  get firstName() { return this.myForm.controls['firstName'] }
  get lastName() { return this.myForm.controls['lastName'] }
  get phone() { return this.myForm.controls['phone'] }
  get email() { return this.myForm.controls['email'] }
  get password() { return this.myForm.controls['pass'] }
  get passwordValidation() { return this.myForm.controls['passValidation'] }
  get isFirstAid() { return this.myForm.controls['isFirstAid'] }

  //תקינות שם
  isValidName(name: AbstractControl) {
    if (!name.value)
      return { 'req': true };
    if (name.value.length < 3)
      return { 'min': true };
    if (name.value && (!/^[א-ת\s]+$/.test(name.value) && !/^[a-zA-Z]+$/.test(name.value))) {
      return { 'notvalid': true };
    }
    return null;
  }

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

  // אימות סיסמה
  ismatched(password: AbstractControl) {
    if (!password.value)
      return { 'req': true };
    if (password.value != this.password.value)
      return { 'notvalid': true };
    return null;
  }
  // הרשמה
  register() {

    //   ההכנסה של נתוני המנהל
    //  this.user.userId=8
    //  this.user.isFirstAid=true
    //  localStorage.setItem('manager',JSON.stringify(this.user)) 
    this.u.Add(this.user).subscribe(() => 
      this.u.getByEmailAndPassword(this.user.email,this.user.password).subscribe(s=>
        this.u.currentUser = s
      )
    )
    console.log(this.u.currentUser?.email)
    debugger
    this.r.navigate(['/trips'])
  }

  // עדכון פרטי המשתמש
  update() {
    this.user.userId = this.u.currentUser?.userId
    this.u.update(this.user)
  }

  // מחיקת משתמש בתנאי שאין לו טיולים שלא יתקימו
  removal() {
    return this.u.delete(this.u.currentUser?.userId!).subscribe(suc => {
      if (suc == true)
        this.u.currentUser = null
    })
  }

}
