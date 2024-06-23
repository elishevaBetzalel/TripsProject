import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Users } from '../clases/users';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { mergeNsAndName } from '@angular/compiler';
import { Trips } from '../clases/trip';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(public http: HttpClient, public a: ApiService) { }

  url: string = 'https://localhost:7056/api/User'
  currentUser: Users | null = new Users()
  manager: Users = new Users()

  getAll(): Observable<Array<Users>> {
    return this.http.get<Array<Users>>(`${this.url}`)
  }
  getById(id: number | undefined): Observable<Array<Trips>> {
    return this.http.get<Array<Trips>>(`${this.url}/${id}`)
  }
  getByEmailAndPassword(email?: string, password?: string): Observable<Users> {    
    return this.http.get<Users>(`${this.url}/${email}/${password}`)
  }

  Add(u: Users): Observable<number> {
    return this.http.post<number>(`${this.url}`, u)
  }

  update(u: Users) {
    return this.http.put<Users>(`${this.url}`, u).subscribe(suc => {
      this.currentUser = suc
    })
  }

  delete(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.url}/${id}`)
  }

}
