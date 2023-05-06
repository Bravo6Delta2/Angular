import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

interface User {
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
}
interface Rent {
  _id: string
  userId: string
  carId: string
  start: Date
  end: Date
  price: number
}

interface ResT {
  message: string
  data: User
  rents: [Rent]
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  state = 0
  user!: User
  rents!: [Rent]
  total!: number
  constructor(private http: HttpClient) { }
  ngOnInit(): void {

    this.http.get('http://localhost:3001/user').subscribe(res => {
      let result = res as ResT
      this.user = result.data
      this.rents = result.rents
      this.state = 1

      this.total = this.rents.reduce((accumulator, object) => {
        return accumulator + object.price;
      }, 0);
    })

  }
}
