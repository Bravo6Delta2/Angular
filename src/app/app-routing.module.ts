import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {VerifyMailComponent} from "./verify-mail/verify-mail.component";


const routes: Routes = [
  {path:"verifyMail/:token", component: VerifyMailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
