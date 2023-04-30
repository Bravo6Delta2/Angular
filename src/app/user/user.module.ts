import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CarsComponent } from './cars/cars.component';
import { CarComponent } from './car/car.component';
import { ProfileComponent } from './profile/profile.component';
import {FormsModule} from "@angular/forms";
import { CarCardComponent } from './car-card/car-card.component';

@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    CarsComponent,
    CarComponent,
    ProfileComponent,
    CarCardComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
  ],
  providers: [

  ],

})
export class UserModule { }
