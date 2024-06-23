import { Component, OnInit } from '@angular/core';
import { Data, Route, Router } from '@angular/router';
import { Trips } from 'src/app/clases/trip';
import { TripsService } from 'src/app/servises/trips.service';
import { Type } from 'src/app/clases/trip-types';
import { TripTypesService } from 'src/app/servises/trip-types.service';
import { ApiService } from 'src/app/servises/api.service';
import { UsersService } from 'src/app/servises/users.service';
import { BookingPlasesService } from 'src/app/servises/booking-places.service';
import { invite } from 'src/app/clases/bookoing-plases';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css']
})
export class TripsComponent implements OnInit {
[x: string]: any;
  //מערך של כל הטיולים
  allTrips: Array<Trips> = new Array<Trips>()
  newAllTrips: Array<Trips> = new Array<Trips>()
  allTripsTypes: Array<Type> = new Array<Type>()
  allInvitationsToTrip: Array<invite> = new Array<invite>()
  //מחזיק את סוג הטיול שנבחר 
  selectedTripType:number=0
  
  constructor( public r: Router, public s: TripsService, public ts: TripTypesService,
    public a:ApiService, public u: UsersService, public b: BookingPlasesService) { }

  ngOnInit(): void {
    this.s.getAll().subscribe(suc =>{
       this.allTrips = suc
       this.getAllByTime()
  })
    this.ts.getAll().subscribe(succ => this.allTripsTypes = succ)
  }
  moreDetails(tripId: number) {
    this.r.navigate(['/details', tripId])
  }
  // newalltrip מביא רק את התאריכים שעוד לא היו ומציב אותם ב
  getAllByTime() {
    this.newAllTrips = this.allTrips.filter(element => new Date(element.tripDate!) > new Date())
  }
  // פונקציה רק למנהל
  // מחזירה את כל ההזמנות של הטיול
  getParticipants (tripId: number){
    this.r.navigate(['booking-places', tripId])
  }

}
