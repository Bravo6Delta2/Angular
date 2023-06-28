import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";

interface Car {
  description: string
  displaySymbol: string
  symbol: string
  type: string
}

interface ResT2 {
  message: string
}
interface ResT {
  c: number
  d: number
  dp: number
  h: number
  l: number
  o: number
  pc: number
  t: number
}

interface ResT1 {
  c: [number]
  h: [number]
  l: [number]
  o: [number]
  s: string
  t: [number]
  v: [number]
}

interface ResT1 {
  message: string
}


@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})

export class CarComponent implements OnInit,OnDestroy {
  id : Car | null = null
  private sub: any;
  state = 0
  time: string = "1Y"

  data: ResT | null = null
  state1 = 0;

  multi: any[];
  view: [number, number] = [1200, 500];
  legend: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Time';
  yAxisLabel: string = 'Price';
  timeline: boolean = true;

  numberOfStocks = 0

  constructor(private route: ActivatedRoute, private http: HttpClient, private toast: ToastrService) {
    this.multi = []
  }
  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.id = JSON.parse(params['id']) as Car
      this.http.get(`https://finnhub.io/api/v1/quote?symbol=${this.id.symbol}&token=ci9ivrhr01qtqvvf2q70ci9ivrhr01qtqvvf2q7g`).subscribe(res => {
        this.state = 1
        this.data = res as ResT
      })
      this.getData()
      this.foo()
    });
  }

  foo = () => {
    this.http.get(`https://finnhub.io/api/v1/quote?symbol=${this.id?.symbol}&token=ci9ivrhr01qtqvvf2q70ci9ivrhr01qtqvvf2q7g`).subscribe(res => {
      this.state = 1
      this.data = res as ResT
    })
    // setTimeout(this.foo, 5000);
  }

  getData() {
    const day = 86400
    let to = new Date().valueOf() / 1000
    let from = to - day
    let rez = "60"

    if (this.time == "5D") {
      from = to - (day * 5)
      rez = "D"
    }

    if (this.time == "1M") {
      from = to - (day * 30)
      rez = "D"
    }

    if (this.time == "6M") {
      from = to - (day * 30 * 6)
      rez = "W"
    }

    if (this.time == "1Y") {
      from = to - (day * 364)
      rez = "W"
    }


    this.http.get(`https://finnhub.io/api/v1/stock/candle?symbol=${this.id?.symbol}&resolution=${rez}&from=${from.toFixed(0)}&to=${to.toFixed(0)}&token=ci9ivrhr01qtqvvf2q70ci9ivrhr01qtqvvf2q7g`).subscribe(res => {
      let re = res as ResT1

      let arr = []

      for(let i = 0; i < re.c.length; i++) {
        let d = new Date(re.t[i] * 1000)
        if (rez == "60") {
          arr[i] =  {name: d.toTimeString().split(" ")[0], "value": re.c[i]} // @ts-ignore
        } else {
          arr[i] =  {name: d.toDateString(), "value": re.c[i]} // @ts-ignore
        }
      }

      this.multi = [{
        name: this.id?.symbol,
        series: arr
      }]

      this.state1 = 1
    })
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  d1() {
    this.time = "1D"
    this.getData()
  }

  d5() {
    this.time = "5D"
    this.getData()
  }

  m1() {
    this.time = "1M"
    this.getData()
  }

  m6() {
    this.time = "6M"
    this.getData()
  }

  y1() {
    this.time = "1Y"
    this.getData()
  }

  buy() {
    let data = {
      numberOfStocks: this.numberOfStocks,
      price: this.data?.c,
      symbol: this.id?.symbol,
      name: this.id?.description,
      buy: true
    }

    this.http.post('http://localhost:3001/buy', data).subscribe(res => {
      let rez = res as ResT2
      this.toast.info(rez.message)
    })

  }
}
