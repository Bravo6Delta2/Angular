import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
interface Car {
  _id: string
   plateNumber: string
  model: string
  manufacturer: string
  year: number
  color: string
  price: number
  type: string
  images: [string]
}

interface DateM {
  start: Date
  end: Date
}

interface ResT {
  message: string
  data: Car
  dates: [DateM]
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
  id = "";
  private sub: any;
  state = 0
  car: Car | null = null
  dates: [DateM] | null = null
  picture = 0
  public minDate: Date = new Date ()
  public maxDate: Date = new Date ("08/27/2024")
  public value: Date = new Date ()

  start: Date | null = null
  end: Date | null = null

  constructor(private route: ActivatedRoute, private http: HttpClient, private toast: ToastrService) {
    let t = localStorage.getItem('start')
    let d = localStorage.getItem('end')

    if (t != null && d != null) {
      this.start = new Date(t)
      this.end = new Date(d)
    }
  }
  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id']
      this.http.get('http://localhost:3001/car/'+this.id).subscribe( res => {
        let result = res as ResT
        this.state = 1
        this.car = result.data
        this.dates = result.dates
        for (let img of this.car!.images) {
          console.log(img)
        }

      })
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  prev() {
    if (this.picture > 0) {
      this.picture -= 1
    }
  }

  next() {
    if (this.picture < this.car!.images.length-1) {
      this.picture += 1
    }
  }

  rent() {
    if (this.start == null || this.end == null) {
      this.toast.error("Both dates must be entered")
      return
    }
    let data = {
      carId: this.car!._id,
      startDate: this.start,
      endDate: this.end
    }
    this.http.post("http://localhost:3001/rent",data).subscribe( res => {
      let result = res as ResT1
      this.toast.info(result.message)
    })

  }
}
