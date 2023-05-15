import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { HomeComponent } from './home/home.component';
import {FormsModule} from "@angular/forms";
import {LineChartModule} from "@swimlane/ngx-charts";


@NgModule({
  declarations: [
    HomeComponent
  ],
    imports: [
        CommonModule,
        AdminRoutingModule,
        FormsModule,
        LineChartModule
    ]
})
export class AdminModule { }
