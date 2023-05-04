import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";

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
  hasNext: boolean
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
  hasNext = false

  start: Date | null = null
  end: Date | null = null


  filter = {
    manufacturer: "",
    startPrice: 0,
    endPrice: 0
  }

  constructor(
    private http: HttpClient
  ) {
    let p = localStorage.getItem('start')
    let d = localStorage.getItem('end')
     if (p != null && d != null) {
       this.start = new Date(p)
       this.end = new Date(d)
     }
  }

  ngOnInit(): void {
    this.get()
  }

  prev() {
    if (this.page >= 1) {
      this.page -= 1
      this.get()
    }
  }

  next() {
    this.page += 1
    this.get()
  }

  get() {
    let queryParams = new HttpParams();
    console.log(this.filter)
    if (this.start != null && this.end != null) {
      queryParams = queryParams.append("start",this.start.toDateString())
      queryParams = queryParams.append("end",this.start.toDateString())
    }
    queryParams = queryParams.append("filter", JSON.stringify(this.filter))

    this.http.get(`http://localhost:3001/cars/${this.page}`, {params: queryParams}).subscribe(res => {
      let result = res as ResT
      this.data = result.data
      this.state = 1
      this.hasNext = result.hasNext
    })

  }

}
