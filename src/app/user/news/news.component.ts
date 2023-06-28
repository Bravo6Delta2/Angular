import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

interface ResT {
  category: string
  datetime: number
  headline: string
  id: number
  image: string
  related: string
  source: string
  summary: string
  url: string
}

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})

export class NewsComponent implements OnInit {

  state = 0
  // @ts-ignore
  data: [ResT] = []
  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.http.get("https://finnhub.io/api/v1/news?category=general&minId=10&token=ci9ivrhr01qtqvvf2q70ci9ivrhr01qtqvvf2q7g").subscribe(res => {
      this.state = 1
      this.data = res as [ResT]
      console.log(this.data)
    })
  }

  protected readonly JSON = JSON;
}
