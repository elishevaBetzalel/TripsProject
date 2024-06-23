import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { invite } from '../clases/bookoing-plases';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingPlasesService {

  constructor(public http:HttpClient) { }

  url:string='https://localhost:7056/api/Invitation'

  getAll():Observable<Array<invite>>{
    return this.http.get<Array<invite>>(`${this.url}`)
  }
  getById(id:number):Observable<invite>{
    return this.http.get<invite>(`${this.url}/GetById/${id}`)
  }
  getInvitationsToTrip(id:number): Observable<Array<invite>>{
    return this.http.get<Array<invite>>(`${this.url}/GetAllInvitationsToTrip/${id}`)
  }
  add(i: invite):Observable<number> {
    return this.http.post<number>(`${this.url}`, i)
  }
  delete(id: number | undefined): Observable<boolean> {
    return this.http.delete<boolean>(`${this.url}/${id}`)
  }
}
