import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import { z } from "zod"
import { sha256 } from 'js-sha256';

class State {
  constructor(
    public email: string,
    public password: string,
    public firstName: string,
    public lastName: string,
    public phoneNumber: string
  ) { }
}

interface ResT {
  message: string
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  state = new State("","","","","")
  formOk = {
    email : 0,
    password : 0,
    firstName: 0,
    lastName: 0,
    phoneNumber: 0
  }


  constructor(private http: HttpClient, private toast: ToastrService) { }

  process() {
    type ObjectKey = keyof typeof this.formOk;

    let schema = z.object({
      email: z.string().email("Email is not in correct format"),
      password: z.string().min(6, "Password is must have minimum 6 chars"),
      firstName: z.string().min(1,"First Name must be entered"),
      lastName: z.string().min(1,"Last Name must be entered"),
      phoneNumber: z.string().min(4,"Phone Number must be entered")
    })

    let val = schema.safeParse(this.state)

    if (!val.success) {

      for (let key in this.formOk) {
        this.formOk[key as ObjectKey] = 1
      }

      val.error.errors.forEach( err => {
          let idx = err.path[0]
          if (idx in this.formOk && typeof idx == 'string') {
            this.formOk[idx as ObjectKey] = 2
          }
      })

    } else {
      let data = {
         email: this.state.email,
         password: sha256(this.state.password),
         firstName: this.state.firstName,
         lastName: this.state.lastName,
         phoneNumber: this.state.phoneNumber
      }
      this.http.post("http://localhost:3001/register",data).subscribe(res => {
        let result = res as ResT

        if (result.message == "email used") {
          this.formOk.email = 2
          this.toast.error(result.message)
        } else if (result.message == "Verification email sent") {
          this.toast.success(result.message)
        } else {
          this.toast.error(result.message)
        }

      })
    }

  }
}
