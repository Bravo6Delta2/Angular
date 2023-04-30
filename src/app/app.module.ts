import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

import {AppRoutingModule} from "./app-routing.module";
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import {AdminModule} from "./admin/admin.module";
import {UserModule} from "./user/user.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminModule,
    UserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 1500,
    }),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
