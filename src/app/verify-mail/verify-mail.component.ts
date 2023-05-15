import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";

interface ResT {
  message: string
}

@Component({
  selector: 'app-verify-mail',
  templateUrl: './verify-mail.component.html',
  styleUrls: ['./verify-mail.component.css']
})
export class VerifyMailComponent implements OnInit, OnDestroy{
  token = ""
  state = 2
  private sub: any

  constructor(private route: ActivatedRoute, private http: HttpClient) {  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.token = params['token']

      this.http.get("http://localhost:3001/verifyEmail/" + this.token).subscribe(res => {
        let result = res as ResT
        if ( result.message === "User Added") {
          this.state = 1
        } else {
          this.state = 2
        }
      })
    })
  }
}
