import {Component, OnInit} from '@angular/core';
import * as jose from 'jose'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  state = 0
  ngOnInit(): void {
    let tkn = localStorage.getItem("token")
    if (tkn) {

      let dec = jose.decodeJwt(tkn)
      if (dec['name']) {
        this.state = 1
      }

    }
  }

}
