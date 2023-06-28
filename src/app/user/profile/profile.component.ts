import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

interface User {
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  money: number
}
interface Rent {
  symbol: string
  numberOfStocks: number
  totalValue: number
  averagePrice: number

}

interface ResT {
  user: User
  portfolio: [Rent]
}

interface ResT1 {
  c: number
  d: number
  dp: number
  h: number
  l: number
  o: number
  pc: number
  t: number
}

interface ResT2 {
  message: string
}

interface Root {
  buy: number
  hold: number
  period: string
  sell: number
  strongBuy: number
  strongSell: number
  symbol: string
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

  state1= 0
  // @ts-ignore
  multi: any[];
  // @ts-ignore
  multi1: any[];
  view: [number, number] = [700, 300];
  view1: [number, number] = [700, 200];
  legend: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Time';
  yAxisLabel: string = '#Analyst';
  timeline: boolean = true;

  // @ts-ignore
  numberOfStocks: [number: number] = [];
  constructor(private http: HttpClient, private toast: ToastrService, private router: Router) { }
  ngOnInit(): void {

    this.http.get('http://localhost:3001/portfolio').subscribe(res => {
      let result = res as ResT
      this.user = result.user

      this.rents = result.portfolio
      this.multi1 = []
      this.rents.forEach(el => {
        this.multi1.push({
          name: el.symbol,
          value: el.totalValue
        })
      })

      this.state = 1

      this.total = this.rents.reduce((accumulator, object) => {
        return accumulator + object.totalValue;
      }, 0);
    })

  }

  sell(symbol: number) {
    let smb= this.rents[symbol].symbol
    this.http.get(`https://finnhub.io/api/v1/quote?symbol=${smb}&token=ci9ivrhr01qtqvvf2q70ci9ivrhr01qtqvvf2q7g`).subscribe( res => {
      let rez = res as ResT1

      let data = {
        // @ts-ignore
        numberOfStocks: this.numberOfStocks[symbol],
        price: rez.c,
        symbol: smb,
        name: null,
        buy: false
      }
      this.http.post('http://localhost:3001/sell', data).subscribe(res12 => {
        let pre = res12 as ResT2
        this.toast.info(pre.message)
        this.reloadCurrentRoute()
      })
    })
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  tip(symbol: string) {
    this.http.get(`https://finnhub.io/api/v1/stock/recommendation?symbol=${symbol}&token=ci9ivrhr01qtqvvf2q70ci9ivrhr01qtqvvf2q7g`).subscribe(res => {
      let f = res as [Root]

      let arr: any[]= []
      f.forEach(el => {
        arr.push({
          name: el.period,
          series: [
            {
              name: "strongSell",
              value: el.strongSell
            },
            {
              name: "sell",
              value: el.sell
            },
            {
              name: "hold",
              value: el.hold
            },
            {
              name: "buy",
              value: el.buy
            },
            {
              name: "strongBuy",
              value: el.strongBuy
            }
          ]
        })

      })
      this.multi = arr
      this.state1 = 1
    })
  }
}
