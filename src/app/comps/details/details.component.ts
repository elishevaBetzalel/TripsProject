import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { invite } from 'src/app/clases/bookoing-plases';
import { Trips } from 'src/app/clases/trip';
import { Users } from 'src/app/clases/users';
import { BookingPlasesService } from 'src/app/servises/booking-places.service';
import { TripsService } from 'src/app/servises/trips.service';
import { UsersService } from 'src/app/servises/users.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  currentTrip: Trips = new Trips()
  constructor(public ar: ActivatedRoute, public s: TripsService, public i: BookingPlasesService, public u : UsersService) { }

  ngOnInit(): void {
    this.ar.params.subscribe(data => {
      this.s.getTripById(data['tripId']).subscribe(suc =>
        this.currentTrip = suc
      )!
    })!
  }
  //בדיקת מס המקומות והצגת הודעה מתאימה 
  num: number = 0
  flag: boolean = false
  currentBooking: invite = new invite()

  checkPlaces(): void {
    debugger
    if ((this.currentTrip.tripEmptyPlace!) - this.num < 0)
      alert("sorry try another trip")
    else {
      this.currentTrip.tripEmptyPlace=(this.currentTrip.tripEmptyPlace!) - this.num
      this.currentBooking.invitationUserId = this.u.currentUser?.userId
      this.currentBooking.invitationTripId = this.currentTrip.tripId
      this.currentBooking.tripDuration = this.currentTrip.tripDuration
      this.currentBooking.placeNumber = this.num
      this.currentBooking.invitationUserName = ""
      this.currentBooking.invitationTripYhad = ""
      this.i.add(this.currentBooking).subscribe(success=>{
          alert("welcome to our trip")
          this.flag = false
        }
      )
    }
  }
}
