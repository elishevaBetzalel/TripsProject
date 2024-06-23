import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { invite } from 'src/app/clases/bookoing-plases';
import { BookingPlasesService } from 'src/app/servises/booking-places.service';

@Component({
  selector: 'app-booking-places',
  templateUrl: './booking-places.component.html',
  styleUrls: ['./booking-places.component.css']
})
export class BookingPlacesComponent implements OnInit {

  allInvitationsToTrip: Array<invite> = new Array<invite>()

  constructor(public a: ActivatedRoute, public b: BookingPlasesService) { }

  ngOnInit(): void {

    this.a.params.subscribe(data => {
      this.b.getInvitationsToTrip(data['tripId']).subscribe(suc => {
        this.allInvitationsToTrip = suc
      })
    })
  }
  
}
