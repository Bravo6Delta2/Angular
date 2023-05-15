import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {sha256} from "js-sha256";

interface ResT1 {
  message: string
  token: string
}

interface ResT2 {
  message: string
}

interface Car {
  _id: string
  manufacturer: string
  model: string
  plateNumber: string
  year: number
}
interface ResT3 {
  message: string
  data: [Car]
}

class FormCarr {
  constructor (
  public plateNumber: string,
  public model: string,
  public manufacturer: string,
  public year: number,
  public color: string,
  public price: number,
  public type: string,
  public images: File) {}
}

interface ResT4 {
  message: string
  data: [number]
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  state = 0
  password = ""
  state1 = 0
  // @ts-ignore
  cars : [Car] = []
  // @ts-ignore
  form = new FormCarr("", "", "", 0, "", 0, "", null)

  state2 = 0
  multi: any[];
  view: [number, number] = [700, 300];
  legend: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Month';
  yAxisLabel: string = 'Earned';
  timeline: boolean = true;



  constructor(private http: HttpClient, private toast: ToastrService) {
    this.multi = []
  }

  process() {
    let objc = {
      password: sha256(this.password)
    }
    this.http.post('http://localhost:3001/adminLogin', objc, {responseType: "json"}).subscribe(res => {
      let resault = res as ResT1
      if (resault.message == "Logged in" && resault.token != undefined) {
        localStorage.setItem("token", resault.token)
        this.state = 1
      } else {
        this.toast.error(resault.message)
      }
    })
  }

  list() {
    this.http.get('http://localhost:3001/admin/cars').subscribe(res => {
      let result = res as ResT3
      this.cars = result.data
      this.state1 = 1
    })
  }
  edit() {
    this.state1 = 0
  }

  addCar() {
    let formData = new FormData();
    type ObjectKey = keyof typeof this.form;
    for ( var key in this.form ) {
      // @ts-ignore
      formData.append(key, this.form[key as ObjectKey]);
    }

    this.http.post("http://localhost:3001/car",formData).subscribe(res => {
      let result = res as ResT2
      this.toast.info(result.message)
    })
  }

  onFileSelected(event: Event) {
    let fileList = (event.target as HTMLInputElement).files
    if (fileList){
      this.form.images = fileList[0]
    }
  }

  show(_id: string) {
    this.http.get("http://localhost:3001/admin/earned/"+_id).subscribe(res => {
      let result = res as ResT4


      // @ts-ignore
      this.multi = [
          {
            name: _id,
            series: [
              {name: "January", "value": result.data[0]}, // @ts-ignore
              {name: "February", "value": result.data[1]}, // @ts-ignore
              {name: "March", "value": result.data[2]}, // @ts-ignore
              {name: "April", "value": result.data[3]}, // @ts-ignore
              {name: "May", "value": result.data[4]}, // @ts-ignore
              {name: "Jun", "value": result.data[5]}, // @ts-ignore
              {name: "July", "value": result.data[6]}, // @ts-ignore
              {name: "Avgust", "value": result.data[7]}, // @ts-ignore
              {name: "September", "value": result.data[8]}, // @ts-ignore
              {name: "October", "value": result.data[9]}, // @ts-ignore
              {name: "November", "value": result.data[10]}, // @ts-ignore
              {name: "December", "value": result.data[11]}
            ]
          }
        ]

      this.state2 = 1
    })
  }

}
