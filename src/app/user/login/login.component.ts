import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { z } from 'zod'
import { ToastrService } from 'ngx-toastr';
import { sha256 } from 'js-sha256';
import {Router} from "@angular/router";

const schema = z.object({
  email: z.string().email().min(5),
  password: z.string().min(6)
})

class State {
  constructor(
    public email: string,
    public password: string,
  ) {  }
}

interface Res {
  message: string,
  token: string | undefined
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  state = new State("","")

  constructor(private http: HttpClient, private toast: ToastrService, public router: Router) { }

  process(): void {

    var objc= {
        email: this.state.email,
        password: this.state.password
    }

    let valid = schema.safeParse(objc)

    if (!valid.success) {
      this.toast.error("Email or Password doesnt conform to requirements")
      return
    }

    objc.password = sha256(objc.password)

    this.http.post('http://localhost:3001/login', objc, {responseType: "json"})
      .subscribe(res => {
        let resT = res as Res
        if (resT.message == "Logged in" && resT.token != undefined) {
          localStorage.setItem("token", resT.token)
          this.toast.success(resT.message).onShown.subscribe( pp => {
            this.router.navigate(['/'])
          })

        } else {
          this.toast.error(resT.message)
        }
      })
  }

}
