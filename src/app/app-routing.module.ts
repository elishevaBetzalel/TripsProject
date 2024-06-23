import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './comps/login/login.component';
import { TripsComponent } from './comps/trips/trips.component';
import { DetailsComponent } from './comps/details/details.component';
import { PersonalAreaComponent } from './comps/personal-area/personal-area.component';
import { RegisterComponent } from './comps/register/register.component';
import { UsersComponent } from './comps/users/users.component';
import { BookingPlacesComponent } from './comps/booking-places/booking-places.component';
import { HomePageComponent } from './comps/home-page/home-page.component';

const routes: Routes = [
  {path:'',component:HomePageComponent},
  {path:'home-page',component:HomePageComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'trips',component:TripsComponent},
  {path:'details/:tripId',component:DetailsComponent},
  {path:'personalArea',component:PersonalAreaComponent},
  {path:'users',component:UsersComponent},
  {path:'booking-places/:tripId',component:BookingPlacesComponent}
];

@NgModule({
  
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
