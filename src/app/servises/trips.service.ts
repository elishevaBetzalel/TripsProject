import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Trips } from '../clases/trip';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TripsService {

  constructor(public http:HttpClient) { }
  
  url:string='https://localhost:7056/api/Trip'

  getAll():Observable<Array<Trips>>{
    return this.http.get<Array<Trips>>(`${this.url}`)
  }
  getTripById(TripId:number | undefined){
    return this.http.get<Trips>(`${this.url}/GetById/${TripId}`)
  }
  getInvitesToTrip(TripId:number):Observable<Array<Trips>>{
    return this.http.get<Array<Trips>>(`${this.url}/GetIenvitesToTrip/${TripId}`)
  }
  Add(trip:Trips){
    return this.http.post<Array<Trips>>(`${this.url}`,trip)
  }
  update(trip:Trips):Observable<boolean>{
    return this.http.put<boolean>(`${this.url}`,trip)
  }
  delete(TripId:number):Observable<Array<Trips>>{
    return this.http.delete<Array<Trips>>(`${this.url}/${TripId}`)

  }
}
