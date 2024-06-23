import { Component, OnInit } from '@angular/core';
import { Users } from 'src/app/clases/users';
import { UsersService } from 'src/app/servises/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit {

  constructor(public users: UsersService) { }

  AllUsers: Array<Users> = new Array<Users>()
  ngOnInit(): void {
    this.users.getAll().subscribe(
      success => {
        this.AllUsers = success;
      }
    )
  }
  deleteUser(userId:number):void{
    this.users.delete(userId).subscribe()
    
  }

}
