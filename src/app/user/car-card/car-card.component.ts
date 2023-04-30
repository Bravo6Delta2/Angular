import {Component, Input} from '@angular/core';
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

@Component({
  selector: 'app-car-card',
  templateUrl: './car-card.component.html',
  styleUrls: ['./car-card.component.css']
})
export class CarCardComponent {
  @Input() data!: Car;
  constructor() { }

}
