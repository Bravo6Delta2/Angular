import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  start: String | null = null

  constructor(private router: Router, private toast: ToastrService) {
  }

  search() {
    if (this.start == null) {
      this.toast.error("You must enter start date")
      return
    }

    this.router.navigate(['/cars'],{ state: this.start })

  }
}
