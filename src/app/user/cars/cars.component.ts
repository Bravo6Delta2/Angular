import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

interface Car {
  _id: string,
  plateNumber: string
  model: string
  manufacturer: string
  year: number
  color:string
  price:number
  type: string
  images: [string]
}

interface ResT {
  message: string
  data: [Car]
}

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {
  state = 0
  data: [Car] | null = null

  page = 1
  constructor(
    private http: HttpClient
  ) {}
  ngOnInit(): void {
    this.http.get("http://localhost:3001/cars/0").subscribe(res => {
      let result = res as ResT
      this.data = result.data
      this.state = 1
    })
  }

  prev() {

    if (this.page >= 1)
      this.page -= 1
  }

  next() {
    this.page += 1
  }
}
