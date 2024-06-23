import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { invite } from 'src/app/clases/bookoing-plases';
import { Trips } from 'src/app/clases/trip';
import { ApiService } from 'src/app/servises/api.service';
import { BookingPlasesService } from 'src/app/servises/booking-places.service';
import { TripTypesService } from 'src/app/servises/trip-types.service';
import { TripsService } from 'src/app/servises/trips.service';
import { UsersService } from 'src/app/servises/users.service';

@Component({
  selector: 'app-personal-area',
  templateUrl: './personal-area.component.html',
  styleUrls: ['./personal-area.component.css']
})
export class PersonalAreaComponent implements OnInit {
  allUserTrips: Array<Trips> = new Array<Trips>()
  allUserTripsPast: Array<Trips> = new Array<Trips>()
  allUserTripsFuture: Array<Trips> = new Array<Trips>()
  sortByTypes: Array<Trips> = new Array<Trips>()
  sortByPrice: Array<Trips> = new Array<Trips>()

  selectedTripTime: number = 0

  constructor(public r: Router, public s: TripsService, public ts: TripTypesService,
    public a: ApiService, public u: UsersService, public b: BookingPlasesService) { }

  ngOnInit(): void {
    this.u.getById(this.u.currentUser?.userId).subscribe(suc => {
      // filter
      // הבאת הטיולים של המשתמש
      this.allUserTrips = suc
      //הבאת טיולים של המשתמש שיבוצעו בעתיד
      this.allUserTripsFuture = this.allUserTrips.filter(element => new Date(element.tripDate!) > new Date())
      //הבאת טיולים של המשתמש שבוצעו בעבר
      this.allUserTripsPast = this.allUserTrips.filter(element => new Date(element.tripDate!) < new Date())
      // sort 
      this.sortByTypes = this.allUserTrips.sort((a, b) => a.tripTypeId! - b.tripTypeId!)
      this.sortByPrice = this.allUserTrips.sort((a, b) => a.price! - b.price!)

    })
  }
  // פונקציה שבודקת אם הטיול לא התקיים כבר
  isFuture(tripId: Date) {
    return new Date(tripId) > new Date()
  }
  // פונקציה שמביאה את ההזמנה של הטיול הנוכחי של המשתמש הנוכחי ומוחקת אותה
  unsubscribe(tripId: number) {
    this.b.getInvitationsToTrip(tripId).subscribe(suc => {
      this.b.delete(suc.find(e => e.invitationUserId == this.u.currentUser?.userId)?.invitationId).subscribe(s => {
        if (s == false)
          alert("The trip hasn't been yet")
        else
          alert("The order was canceled")
      })
    })
  }

}


