import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { UsersComponent } from './comps/users/users.component';
import { TripsComponent } from './comps/trips/trips.component';
import { HomePageComponent } from './comps/home-page/home-page.component';
import { NavComponent } from './comps/nav/nav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DetailsComponent } from './comps/details/details.component';
import { PersonalAreaComponent } from './comps/personal-area/personal-area.component';
import { RegisterComponent } from './comps/register/register.component';
import { LoginComponent } from './comps/login/login.component';
import { BookingPlacesComponent } from './comps/booking-places/booking-places.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    TripsComponent,
    UsersComponent,
    HomePageComponent,
    NavComponent,
    LoginComponent,
    DetailsComponent,
    PersonalAreaComponent,
    RegisterComponent,
    BookingPlacesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
   ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
