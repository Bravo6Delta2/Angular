import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CarsComponent } from './cars/cars.component';
import { CarComponent } from './car/car.component';
import { ProfileComponent } from './profile/profile.component';
import {FormsModule} from "@angular/forms";
import { CarCardComponent } from './car-card/car-card.component';
import { CalendarModule } from '@syncfusion/ej2-angular-calendars';
import {BarChartModule, LineChartModule, PieChartModule} from "@swimlane/ngx-charts";
import { NewsComponent } from './news/news.component';

@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    CarsComponent,
    CarComponent,
    ProfileComponent,
    CarCardComponent,
    NewsComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    NgOptimizedImage,
    CalendarModule,
    LineChartModule,
    BarChartModule,
    PieChartModule
  ],
  providers: [

  ],

})
export class UserModule { }
