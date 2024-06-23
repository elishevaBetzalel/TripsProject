import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/servises/users.service';
import { Router } from "@angular/router"
import { Users } from 'src/app/clases/users';
import { ApiService } from 'src/app/servises/api.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private r: Router, public u: UsersService, public a: ApiService) { }

  ngOnInit(): void {
    // אתחול המנהל 
    this.u.manager.email = "m@gmail.com"
    this.u.manager.password = "mmmm"
  }

}