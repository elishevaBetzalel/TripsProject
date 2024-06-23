import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Type } from '../clases/trip-types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TripTypesService {

  constructor(public http: HttpClient) { }

  url: string = 'https://localhost:7056/api/TypeTrip'

  getAll(): Observable<Array<Type>> {
    return this.http.get<Array<Type>>(`${this.url}`)
  }
  getById(id: number): Observable<Array<Type>> {
    return this.http.get<Array<Type>>(`${this.url}/${id}`)
  }
  add(t: Type) {
    return this.http.post<Array<Type>>(`${this.url}`, t)
  }
  delete(id: number): Observable<Array<Type>> {
    return this.http.delete<Array<Type>>(`${this.url}/${id}`)
  }
}
