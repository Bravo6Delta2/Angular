import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

interface ResT {
  description: string
  displaySymbol: string
  symbol: string
  type: string
}

interface ResT1 {
  count: number
  result: [ResT]
}

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})

export class CarsComponent implements OnInit {
  state = 0
  data1: [ResT] | null = null
  data: [ResT] | null = null
  page = 1;
  hasNext = true;
  search : any = null


  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.search = this.router.getCurrentNavigation()?.extras?.state
  }

  ngOnInit(): void {
    this.get()
  }

  get() {
    if (this.search == null) {
      this.http.get('https://finnhub.io/api/v1/stock/symbol?exchange=US&token=ci9ivrhr01qtqvvf2q70ci9ivrhr01qtqvvf2q7g').subscribe(res => {
        this.data1 = res as [ResT]
        this.data1 = this.data1.sort((a,b) => {
          return a.description > b.description ? -1 : 1
        })
        // @ts-ignore
        this.data = this.data1.slice(0,20)
        console.log(this.data)
        this.state = 1
      })
      return
    }
    console.log("XD")
    this.http.get(`https://finnhub.io/api/v1/search?q=${this.search}&token=ci9ivrhr01qtqvvf2q70ci9ivrhr01qtqvvf2q7g`).subscribe(res => {
      this.data1 = (res as ResT1).result
      // @ts-ignore
      this.data1 = this.data1.filter( e => {
        return e.type.length > 0
      })
      // @ts-ignore
      this.data = this.data1.slice(0,20)
      this.state = 1
    })

  }

  prev() {
    if (this.page == 1)
      return
    this.page -= 1
    // @ts-ignore
    this.data = this.data1?.slice((this.page - 1) * 20, this.page * 20)

    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  next() {
    // @ts-ignore
    if (this.data?.length < 20) {
      return
    }
    this.page += 1
    // @ts-ignore
    this.data = this.data1?.slice((this.page - 1) * 20, this.page * 20)

    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
}
