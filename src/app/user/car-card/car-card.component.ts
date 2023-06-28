import {Component, Input} from '@angular/core';
interface Car {
  description: string
  displaySymbol: string
  symbol: string
  type: string
}

@Component({
  selector: 'app-car-card',
  templateUrl: './car-card.component.html',
  styleUrls: ['./car-card.component.css']
})
export class CarCardComponent {
  @Input() data!: Car;
  constructor() { }

  protected readonly JSON = JSON;
}
